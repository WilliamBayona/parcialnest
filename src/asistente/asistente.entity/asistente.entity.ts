import { Column, Entity, OneToMany, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { EventoEntity } from 'src/evento/evento.entity/evento.entity';

@Entity()
export class AsistenteEntity {
    @PrimaryGeneratedColumn('increment', { type: 'bigint' })
    id: string;

    @Column()
    nombre: string;

    @Column()
    codigoEstudiante: string; 

    @Column()
    email: string; 

    @ManyToOne(() => EventoEntity, evento => evento.asistentes)
    evento: EventoEntity ;

}