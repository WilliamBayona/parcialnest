import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';

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
    //MuseumArtworkModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
