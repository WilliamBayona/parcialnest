import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PonenteModule } from './ponente/ponente.module';
import { EventoModule } from './evento/evento.module';
import { AsistenteModule } from './asistente/asistente.module';
import { AuditorioModule } from './auditorio/auditorio.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
        type: 'postgres',
        host: 'localhost',
        port: 5433,
        username: 'postgres',
        password: 'postgres',
        database: 'parcial',
        entities: [],
        dropSchema: true,
        synchronize: true
      }),
    PonenteModule,
    EventoModule,
    AsistenteModule,
    AuditorioModule,
    //MuseumArtworkModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
