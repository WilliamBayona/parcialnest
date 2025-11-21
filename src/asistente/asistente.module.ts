import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AsistenteService } from './asistente.service';
import { AsistenteEntity } from './asistente.entity/asistente.entity';
import { EventoEntity } from 'src/evento/evento.entity/evento.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AsistenteEntity, EventoEntity])],
  controllers: [],
  providers: [AsistenteService],
  exports: [AsistenteService],
})
export class AsistenteModule {}