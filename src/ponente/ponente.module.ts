import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PonenteService } from './ponente.service';
import { PonenteEntity } from './ponente.entity/ponente.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PonenteEntity])],
  controllers: [],
  providers: [PonenteService],
  exports: [PonenteService],
})
export class PonenteModule {}
