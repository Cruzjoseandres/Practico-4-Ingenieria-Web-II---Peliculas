import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    JoinColumn,
} from 'typeorm';
import { User } from '../../user/entities/user.entity';
import { Movie } from '../../movie/entities/movie.entity';

@Entity()
export class Review {
    @PrimaryGeneratedColumn()
    id: number;

    @Column('text')
    comment: string;

    @Column('int')
    rating: number;

    // Relación: Muchas reseñas pertenecen a un usuario
    @ManyToOne(() => User, (user) => user.reviews, { eager: true })
    @JoinColumn({ name: 'userId' })
    user: User;

    // Relación: Muchas reseñas pertenecen a una película
    @ManyToOne(() => Movie, (movie) => movie.reviews, { eager: true })
    @JoinColumn({ name: 'movieId' })
    movie: Movie;
}
