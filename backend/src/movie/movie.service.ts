import { Injectable } from '@nestjs/common';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { Movie } from './entities/movie.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class MovieService {
    constructor(
        @InjectRepository(Movie)
        private readonly movieRepository: Repository<Movie>,
    ) {}

    create(createMovieDto: CreateMovieDto) {
        const movie = this.movieRepository.create(createMovieDto);
        return this.movieRepository.save(movie);
    }

    findAll() {
        return this.movieRepository.find();
    }

    findOne(id: number) {
        return this.movieRepository.findOneBy({ id });
    }

    update(id: number, updateMovieDto: UpdateMovieDto) {
        return this.movieRepository.update(id, updateMovieDto);
    }

    remove(id: number) {
        return this.movieRepository.delete(id);
    }
}
