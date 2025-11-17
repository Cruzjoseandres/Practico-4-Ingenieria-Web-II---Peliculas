import { BadRequestException, Injectable, Inject, forwardRef } from '@nestjs/common';
import { CreateMovieDto } from './dto/create-movie.dto';
import { Movie } from './entities/movie.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { ReviewService } from 'src/review/review.service';

@Injectable()
export class MovieService {
    constructor(
        @InjectRepository(Movie)
        private readonly movieRepository: Repository<Movie>,
        @Inject(forwardRef(() => ReviewService))
        private reviewService: ReviewService
    ) {}

    async createPelicula(createMovieDto: CreateMovieDto, file: Express.Multer.File) {
        if (!file) {
            throw new BadRequestException('La imagen es requerida');
        }
        console.log('antes de crear la pelicula');
        const movie = this.movieRepository.create({
            ...createMovieDto,
            imageUrl: `/uploads/${file.filename}`,
        });
        return await this.movieRepository.save(movie);
    }

    async findAll() {
        const movies = await this.movieRepository.find();
        if (movies.length === 0) {
            throw new BadRequestException('No hay peliculas disponibles');
        }
        return movies;
    }

    async findById(id: number) {
        const movie = await this.movieRepository.findOne({
            where: { id },
        });

        if (!movie) {
            throw new BadRequestException('Movie not found');
        }

        const reviews = await this.reviewService.findReviewsByMovieId(id);
        return {
            id: movie.id,
            title: movie.title,
            description: movie.description,
            imageUrl: movie.imageUrl,
            reviews,
        };
    }
    async findOne(id: number) {
        const movie = await this.movieRepository.findOneBy({ id });
        if (!movie) {
            throw new BadRequestException('Movie not found');
        }
        return movie;
    }

    async update(id: number, updateMovieDto: UpdateMovieDto) {
        await this.findOne(id);
        return await this.movieRepository.update(id, updateMovieDto);
    }

    async remove(id: number) {
        await this.findOne(id);
        return await this.movieRepository.delete(id);
    }
}
