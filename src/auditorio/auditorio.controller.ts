import { Controller, Get, Post, Body, Param, ParseIntPipe } from '@nestjs/common';
import { AuditorioService } from './auditorio.service';
import { AuditorioEntity } from './auditorio.entity/auditorio.entity';

@Controller('auditorios')
export class AuditorioController {
  constructor(private readonly auditorioService: AuditorioService) {}

  // Crear Auditorio
  @Post()
  async create(@Body() auditorio: AuditorioEntity) {
    return await this.auditorioService.create(auditorio);
  }

}