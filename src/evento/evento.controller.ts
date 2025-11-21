import { Controller, Get, Post, Put, Delete, Body, Param, ParseIntPipe } from '@nestjs/common';
import { EventoService } from './evento.service';
import { EventoEntity } from './evento.entity/evento.entity';

@Controller('eventos')
export class EventoController {
  constructor(private readonly eventoService: EventoService) {}

  // Crear Evento
  @Post()
  async create(@Body() evento: EventoEntity) {
    return await this.eventoService.create(evento);
  }

  // Buscar Evento por ID
  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: string) {
    return await this.eventoService.findEventoById(id);
  }

  // Aprobar Evento
  @Put(':id/aprobar')
  async aprobar(@Param('id', ParseIntPipe) id: string) {
    return await this.eventoService.aprobarEvento(id);
  }

  // Eliminar Evento
  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: string) {
    return await this.eventoService.delete(id);
  }
}