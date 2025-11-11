import { Injectable } from '@nestjs/common';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Review } from './entities/review.entity';
import { Repository } from 'typeorm';
import { MovieService } from 'src/movie/movie.service';

@Injectable()
export class ReviewService {
    constructor(
        @InjectRepository(Review)
        private readonly reviewRepository: Repository<Review>,
        private movieService: MovieService,
    ) {}

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
