import { Car } from 'src/car/entities/car.entity';
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, PrimaryColumn, OneToMany } from 'typeorm';

@Entity({name: 'customer', schema: 'taller_perez_db'})
export class Customer {

    @PrimaryGeneratedColumn()
    @PrimaryColumn({name: 'idCustomer', type: 'bigint'})
    id: number;

    @Column({length: 60})
    name: string;

    @Column({length: 45})
    identification: string;

    @Column({length: 60})
    address: string;

    @Column({length: 20})
    phone: string;

    @CreateDateColumn({type: 'timestamp'})
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @OneToMany(() => Car, car => car.cus)
    cars: Car[];

}

