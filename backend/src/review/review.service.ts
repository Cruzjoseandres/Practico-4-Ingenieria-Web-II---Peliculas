import { Injectable, Inject, forwardRef } from '@nestjs/common';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Review } from './entities/review.entity';
import { Repository } from 'typeorm';
import { MovieService } from 'src/movie/movie.service';
import { CreateMovieDto } from '../movie/dto/create-movie.dto';
import { User } from '../user/entities/user.entity';

@Injectable()
export class ReviewService {
    constructor(
        @InjectRepository(Review)
        private readonly reviewRepository: Repository<Review>,
        @Inject(forwardRef(() => MovieService))
        private movieService: MovieService
    ) {}

    async createReview(
        createReviewDto: CreateReviewDto,
        createMovieDto: CreateMovieDto,
        file: Express.Multer.File,
        userId: number
    ) {
        const movie = await this.movieService.createPelicula(createMovieDto, file);
        const review = this.reviewRepository.create({
            comment: createReviewDto.comment,
            rating: createReviewDto.rating,
            movie: movie,
            user: { id: userId } as User,
        });
        return await this.reviewRepository.save(review);
    }

    async addReviewForMovie(createReviewDto: CreateReviewDto, movieId: number, userId: number) {
        const movie = await this.movieService.findOne(movieId);
        const review = this.reviewRepository.create({
            comment: createReviewDto.comment,
            rating: createReviewDto.rating,
            user: { id: userId } as User,
            movie: movie,
        });
        review.movie = movie;
        await this.reviewRepository.save(review);
        return await this.findReviewsByMovieId(movieId);
    }

    async findAll() {
        const reviews = await this.reviewRepository.find();
        if (!reviews) {
            throw new Error('Review no encontrada');
        }

        return reviews;
    }

    async findOne(id: number) {
        const review = await this.reviewRepository.findOneBy({ id });
        if (!review) {
            throw new Error('Review no encontrada');
        }
        const user = {
            id: review.user.id,
            username: review.user.username,
        };

        const movie = await this.movieService.findOne(review.movie.id);

        const reviewObject = {
            id: review.id,
            comment: review.comment,
            rating: review.rating,
            user: user,
            movie: movie,
        };
        return reviewObject;
    }

    async update(id: number, updateReviewDto: UpdateReviewDto) {
        const review = await this.findOne(id);
        if (updateReviewDto.comment) {
            review.comment = updateReviewDto.comment;
        }
        if (updateReviewDto.rating) {
            review.rating = updateReviewDto.rating;
        }
        await this.reviewRepository.update(id, review);
        return await this.findOne(id);
    }

    async remove(id: number) {
        await this.findOne(id);
        return this.reviewRepository.delete(id);
    }
    async findReviewsByMovieId(id: number) {
        const reviews = await this.reviewRepository.find({
            where: { movie: { id } },
            relations: ['user'],
        });

        const reviewsSimplificadas: Array<{ comment: string; rating: number; user: User }> = [];

        for (const review of reviews) {
            reviewsSimplificadas.push({
                comment: review.comment,
                rating: review.rating,
                user: review.user,
            });
        }
        return reviewsSimplificadas;
    }
    async findReviewsByUserId(id: number) {
        const reviews = await this.reviewRepository.find({
            where: { user: { id } },
            relations: ['movie'],
        });

        const reviewsSimplificadas: Array<{
            id: number;
            comment: string;
            rating: number;
            movieTitle: string;
        }> = [];

        for (const review of reviews) {
            reviewsSimplificadas.push({
                id: review.id,
                comment: review.comment,
                rating: review.rating,
                movieTitle: review.movie.title,
            });
        }
        return reviewsSimplificadas;
    }
}
