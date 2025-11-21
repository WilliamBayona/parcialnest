import { PonenteEntity } from 'src/ponente/ponente.entity/ponente.entity';
import { AsistenteEntity } from 'src/asistente/asistente.entity/asistente.entity';
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { AuditorioEntity } from 'src/auditorio/auditorio.entity/auditorio.entity';

@Entity()
export class EventoEntity {
    @PrimaryGeneratedColumn('increment', { type: 'bigint' })
    id: string;

    @Column()
    titulo: string; 

    @Column()
    descripcion: string; 

    @Column()
    fecha: Date; 

    @Column()
    duracionHoras: number; 

    @Column()
    estado: string; 


    @ManyToOne(() => PonenteEntity, ponente => ponente.eventos)
    ponente: PonenteEntity;

  
    @ManyToOne(() => AuditorioEntity, auditorio => auditorio.eventos)
    auditorio: AuditorioEntity;


    @OneToMany(() => AsistenteEntity, asistente => asistente.evento)
    asistentes: AsistenteEntity[];

}