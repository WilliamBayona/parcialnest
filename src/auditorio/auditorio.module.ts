import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuditorioController } from './auditorio.controller';
import { AuditorioService } from './auditorio.service';
import { AuditorioEntity } from './auditorio.entity/auditorio.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AuditorioEntity])],
  controllers: [AuditorioController],
  providers: [AuditorioService],
  exports: [AuditorioService],
})
export class AuditorioModule {}
