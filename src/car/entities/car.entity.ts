import { Customer } from '../../customer/entities/customer.entity';
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, PrimaryColumn, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { CarDiagnostic } from '../../diagnostic/entities/diagnostic.entity';

@Entity({name: 'car', schema: 'taller_perez_db'})
export class Car {

    @PrimaryGeneratedColumn()
    @PrimaryColumn({name: 'idCar', type: 'bigint'})
    id: number;

    @Column({length: 45, type: 'varchar'})
    model: string;

    @Column({length: 45, type: 'varchar'})
    brand: string;

    @Column({type: 'int'})
    year: number;

    @Column({length: 45, type: 'varchar'})
    engine: string;

    @CreateDateColumn({type: 'timestamp'})
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @ManyToOne(() => Customer, cus => cus.cars, 
    { eager: false, cascade: true, onDelete: 'CASCADE' },)
    @JoinColumn({ name: 'customerId' })
    cus: Customer;

    @OneToMany(() => CarDiagnostic, diag => diag.car)
    diagnostics: CarDiagnostic[];
}

