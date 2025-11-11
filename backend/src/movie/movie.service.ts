import { Injectable } from '@nestjs/common';
import { CreateMovieDto } from './dto/create-movie.dto';
import { Movie } from './entities/movie.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class MovieService {
    constructor(
        @InjectRepository(Movie)
        private readonly movieRepository: Repository<Movie>,
    ) {}

    async createPelicula(createMovieDto: CreateMovieDto) {
        const movie = this.movieRepository.create(createMovieDto);
        return await this.movieRepository.save(movie);
    }

    async findAll() {
        return await this.movieRepository.find();
    }

    async findOne(id: number) {
        return await this.movieRepository.findOneBy({ id });
    }

    async addReviewMoviesbyId(id: number) {
        const movieReview = await this.movieRepository.findOne({
            where: { id },
            relations: ['reviews'],
        });
        return movieReview;
    }

    async remove(id: number) {
        return await this.movieRepository.delete(id);
    }

    async update(id: number, updateMovieDto: Partial<CreateMovieDto>) {
        return await this.movieRepository.update(id, updateMovieDto);
    }
}
