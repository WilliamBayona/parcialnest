import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PonenteModule } from './ponente/ponente.module';
import { EventoModule } from './evento/evento.module';
import { AsistenteModule } from './asistente/asistente.module';
import { AuditorioModule } from './auditorio/auditorio.module';
import { PonenteEntity } from './ponente/ponente.entity/ponente.entity';
import { EventoEntity } from './evento/evento.entity/evento.entity';
import { AsistenteEntity } from './asistente/asistente.entity/asistente.entity';
import { AuditorioEntity } from './auditorio/auditorio.entity/auditorio.entity';


@Module({
  imports: [
    TypeOrmModule.forRoot({
        type: 'postgres',
        host: 'localhost',
        port: 5433,
        username: 'postgres',
        password: 'postgres',
        database: 'parcial',
        entities: [PonenteEntity, EventoEntity, AsistenteEntity, AuditorioEntity],
        dropSchema: true,
        synchronize: true
      }),
    PonenteModule,
    EventoModule,
    AsistenteModule,
    AuditorioModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
