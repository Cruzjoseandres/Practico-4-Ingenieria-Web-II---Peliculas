import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Review } from '../../review/entities/review.entity';

@Entity()
export class Movie {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column('text')
    description: string;

    @Column()
    imageUrl: string;

    @OneToMany(() => Review, (review) => review.movie)
    reviews: Review[];
}
