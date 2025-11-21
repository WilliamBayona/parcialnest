/* asistente.service.ts */
import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AsistenteEntity } from './asistente.entity/asistente.entity';
import { EventoEntity } from 'src/evento/evento.entity/evento.entity';

@Injectable()
export class AsistenteService {
  constructor(
    @InjectRepository(AsistenteEntity)
    private readonly asistenteRepository: Repository<AsistenteEntity>,
    @InjectRepository(EventoEntity)
    private readonly eventoRepository: Repository<EventoEntity>,
  ) {}

  // Registrar Asistente en un Evento 
  async create(eventoId: string, asistente: AsistenteEntity): Promise<AsistenteEntity> {
    const evento = await this.eventoRepository.findOne({
      where: { id: eventoId },
      relations: ['auditorio', 'asistentes'],
    });

    if (!evento) {
      throw new NotFoundException('El evento con el id dado no fue encontrado');
    }


    // No puede superarse la capacidad del auditorio 
    if (evento.asistentes.length >= evento.auditorio.capacidad) {
      throw new BadRequestException('No se puede registrar el asistente: el auditorio ha alcanzado su capacidad máxima');
    }

    // No puede haber dos asistentes con el mismo email en un mismo evento 
    const emailDuplicado = evento.asistentes.find(a => a.email === asistente.email);
    if (emailDuplicado) {
      throw new BadRequestException('Ya existe un asistente registrado con este email en el evento');
    }

    // Asignamos el evento al asistente y se guarda
    asistente.evento = evento;
    return await this.asistenteRepository.save(asistente);
  }

  // Buscar Asistentes por Evento 
  async findAsistentesByEvento(eventoId: string): Promise<AsistenteEntity[]> {
    const evento = await this.eventoRepository.findOne({ 
        where: { id: eventoId },
        relations: ['asistentes'] 
    });

    if (!evento) {
       throw new NotFoundException('El evento no existe :( ');
    }
    
    return evento.asistentes;
  }
}