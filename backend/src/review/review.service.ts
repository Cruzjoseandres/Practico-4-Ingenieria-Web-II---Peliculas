import { Injectable } from '@nestjs/common';
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

    async addReviewForMovie(createReviewDto: CreateReviewDto, movieId: number) {
        const review = this.reviewRepository.create(createReviewDto);
        const movie = await this.movieService.findOne(movieId);

        if (!movie) {
            throw new Error('Movie not found');
        }
        review.movie = movie;
        return await this.reviewRepository.save(review);
    }

    findAll() {
        return this.reviewRepository.find();
    }

    findOne(id: number) {
        return this.reviewRepository.findOneBy({ id });
    }

    update(id: number, updateReviewDto: UpdateReviewDto) {
        return this.reviewRepository.update(id, updateReviewDto);
    }

    remove(id: number) {
        return this.reviewRepository.delete(id);
    }
}
