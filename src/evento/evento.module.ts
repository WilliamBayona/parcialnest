import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventoService } from './evento.service';
import { EventoEntity } from './evento.entity/evento.entity';
import { PonenteEntity } from '../ponente/ponente.entity/ponente.entity';
import { EventoController } from './evento.controller';

@Module({
  imports: [TypeOrmModule.forFeature([EventoEntity, PonenteEntity])],
  controllers: [EventoController],
  providers: [EventoService],
  exports: [EventoService],
})
export class EventoModule {}
