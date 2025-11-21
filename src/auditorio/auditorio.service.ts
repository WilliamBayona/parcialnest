/* auditorio.service.ts */
import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AuditorioEntity } from './auditorio.entity/auditorio.entity';

@Injectable()
export class AuditorioService {
  constructor(
    @InjectRepository(AuditorioEntity)
    private readonly auditorioRepository: Repository<AuditorioEntity>,
  ) {}

  // Crear Auditorio
  async create(auditorio: AuditorioEntity): Promise<AuditorioEntity> {
    // La capacidad debe ser mayor a cero 
    if (auditorio.capacidad <= 0) {
      throw new BadRequestException('La capacidad del auditorio debe ser mayor a cero');
    }

    return await this.auditorioRepository.save(auditorio);
  }

}