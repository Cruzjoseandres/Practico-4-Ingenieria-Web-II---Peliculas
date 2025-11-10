import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Review } from '../../review/entities/review.entity';

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    username: string;

    @Column()
    password: string;

    @Column()
    fullName: string;

    // Relación: Un usuario tiene muchas reseñas
    @OneToMany(() => Review, (review) => review.user)
    reviews: Review[];
}
