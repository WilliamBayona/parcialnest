import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PonenteEntity } from './ponente.entity/ponente.entity';

@Injectable()
export class PonenteService {
  constructor(
    @InjectRepository(PonenteEntity)
    private readonly ponenteRepository: Repository<PonenteEntity>,
  ) {}

  //Crear Ponente
  async create(ponente: PonenteEntity): Promise<PonenteEntity> {
    // Si es Interno el email debe terminar en .edu
    if (ponente.tipoPonente === 'Interno') {
      if (!ponente.email.endsWith('.edu')) {
        throw new BadRequestException('El email del ponente interno debe terminar en .edu');
      }
    } 
    //  Si es Invitado el email debe ser válido
    else if (ponente.tipoPonente === 'Invitado') {
      // Verificar que tenga @ y al menos un punto después del arroba para el dominio del sitio
      if (!ponente.email.includes('@') || !ponente.email.split('@')[1]?.includes('.')) {
        throw new BadRequestException('El email del ponente invitado debe ser válido (contener @ y dominio)');
      }
    }

    return await this.ponenteRepository.save(ponente);
  }

  // Buscar Ponente por ID
  async findPonenteById(id: string): Promise<PonenteEntity> {
    const ponente = await this.ponenteRepository.findOne({ 
      where: { id }, 
      relations: ['eventos'] 
    });

    if (!ponente) {
      throw new NotFoundException('El ponente con el id dado no fue encontrado');
    }

    return ponente;
  }

  // Eliminar Ponente con validación de asociación
  async delete(id: string): Promise<void> {
    const ponente = await this.findPonenteById(id);

    // No se puede eliminar si tiene eventos asociados
    if (ponente.eventos && ponente.eventos.length > 0) {
      throw new BadRequestException('No se puede eliminar el ponente porque tiene eventos asociados');
    }

    await this.ponenteRepository.remove(ponente);
  }
}