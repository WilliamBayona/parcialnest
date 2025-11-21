import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { EventoEntity } from 'src/evento/evento.entity/evento.entity';

@Entity()
export class PonenteEntity {
    @PrimaryGeneratedColumn('increment', { type: 'bigint' })
    id: string;

    @Column()
    cedula: number; 

    @Column()
    nombre: string; 

    @Column()
    email: string; 

    @Column()
    tipoPonente: string; 

    @Column()
    especialidad: string; 
  
    @OneToMany(() => EventoEntity, evento => evento.ponente)
    eventos: EventoEntity[];  


}