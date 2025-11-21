/* evento.service.ts */
import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PonenteEntity } from 'src/ponente/ponente.entity/ponente.entity';
import { EventoEntity } from './evento.entity/evento.entity';

@Injectable()
export class EventoService {
  constructor(
    @InjectRepository(EventoEntity)
    private readonly eventoRepository: Repository<EventoEntity>,
    @InjectRepository(PonenteEntity)
    private readonly ponenteRepository: Repository<PonenteEntity>,
  ) {}

  // Crear Evento
  async create(evento: EventoEntity): Promise<EventoEntity> {
    // La duración debe ser positiva
    if (evento.duracionHoras <= 0) {
      throw new BadRequestException('La duración del evento debe ser un número positivo');
    }

    // Si el ponente es Invitado, la descripción debe tener al menos 50 caracteres
    if (evento.ponente) {

      const ponenteEntity = await this.ponenteRepository.findOne({ where: { id: evento.ponente.id } });
      
      if (!ponenteEntity) {
        throw new NotFoundException('El ponente asignado no existe');
      }

      if (ponenteEntity.tipoPonente === 'Invitado') {
        if (!evento.descripcion || evento.descripcion.length < 50) {
          throw new BadRequestException('Para ponentes invitados, la descripción debe tener al menos 50 caracteres');
        }
      }
    }

    // Estado inicial por defecto
    if (!evento.estado) {
        evento.estado = 'Propuesto';
    }

    return await this.eventoRepository.save(evento);
  }

  // Buscar Evento por ID
  async findEventoById(id: string): Promise<EventoEntity> {
    const evento = await this.eventoRepository.findOne({
      where: { id },
      relations: ['ponente', 'auditorio', 'asistentes'],
    });

    if (!evento) {
      throw new NotFoundException('El evento con el id dado no fue encontrado');
    }

    return evento;
  }

  // Aprobar Evento
  async aprobarEvento(id: string): Promise<EventoEntity> {
    const evento = await this.eventoRepository.findOne({ 
        where: { id },
        relations: ['auditorio'] 
    });

    if (!evento) {
      throw new NotFoundException('El evento no existe');
    }

    // Solo puede aprobarse si tiene auditorio asignado 
    if (!evento.auditorio) {
      throw new BadRequestException('No se puede aprobar un evento sin un auditorio asignado');
    }

    evento.estado = 'Aprobado';
    return await this.eventoRepository.save(evento);
  }

  // Eliminar Evento
  async delete(id: string): Promise<void> {
    const evento = await this.findEventoById(id);

    // No se puede eliminar si ya está aprobado
    if (evento.estado === 'Aprobado') {
      throw new BadRequestException('No se puede eliminar un evento que ya ha sido aprobado');
    }

    await this.eventoRepository.remove(evento);
  }
}