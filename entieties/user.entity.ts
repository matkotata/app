import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class User {
    @PrimaryGeneratedColumn({ name: 'user_id', type: 'int', unsigned: true })
    userId: number;

    @Column({ name:'email', type:'varchar', length:255, unique:true})
    email: string;

    @Column({ name:'password_hash', type: 'varchar', length:128 })
    passwordHash: string;

    @Column({ name:'forname', type: 'varchar', length:64 })
    forname: string;

    @Column({ name:'surname', type: 'varchar', length:64 })
    surname: string;

    @Column({ name:'phone_number', type: 'varchar', length:24 })
    phoneNumber: string;

    @Column({ name:'postal_address', type: 'text' })
    postalAdress: string;

}
