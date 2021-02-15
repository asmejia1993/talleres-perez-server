import { Car } from '../../car/entities/car.entity';
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, PrimaryColumn, ManyToOne, JoinColumn } from 'typeorm';

@Entity({name: 'diagnostic_analysis', schema: 'taller_perez_db'})
export class CarDiagnostic {

    @PrimaryGeneratedColumn()
    @PrimaryColumn({name: 'idAnalysis', type: 'bigint'})
    id: number;

    @Column({length: 45, type: 'varchar'})
    errorCode: string;

    @Column({length: 200, type: 'varchar', nullable: true})
    description: string;

    @Column({length: 35, type: 'varchar'})
    status: string;

    @CreateDateColumn({type: 'timestamp'})
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @ManyToOne(() => Car, car => car.diagnostics, 
    { eager: false, cascade: true, onDelete: 'CASCADE' },)
    @JoinColumn({ name: 'carId' })
    car: Car;

}

