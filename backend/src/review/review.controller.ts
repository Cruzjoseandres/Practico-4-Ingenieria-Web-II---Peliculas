import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    UseGuards,
    UseInterceptors,
    UploadedFile,
    Put,
} from '@nestjs/common';
import { ReviewService } from './review.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreateMovieDto } from '../movie/dto/create-movie.dto';
import { GetUser } from '../auth/decorators/current-user.decorator';

@Controller('review')
export class ReviewController {
    constructor(private readonly reviewService: ReviewService) {}

    @UseGuards(JwtAuthGuard)
    @Post('/movie/:idPelicula')
    create(
        @Body() createReviewDto: CreateReviewDto,
        @Param('idPelicula') idPelicula: number,
        @GetUser() user: any
    ) {
        return this.reviewService.addReviewForMovie(createReviewDto, idPelicula, user);
    }

    @Post()
    @UseGuards(JwtAuthGuard)
    @UseInterceptors(FileInterceptor('image'))
    async createReview(
        @Body() createReviewDto: CreateReviewDto,
        @Body() createMovieDto: CreateMovieDto,
        @UploadedFile() file: Express.Multer.File,
        @GetUser() user: any
    ) {
        return await this.reviewService.createReview(createReviewDto, createMovieDto, file, user);
    }

    @Get()
    findAll() {
        return this.reviewService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.reviewService.findOne(+id);
    }

    @UseGuards(JwtAuthGuard)
    @Put(':id')
    update(@Param('id') id: number, @Body() updateReviewDto: UpdateReviewDto) {
        return this.reviewService.update(id, updateReviewDto);
    }

    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.reviewService.remove(+id);
    }

    @Get('/user/:userId')
    @UseGuards(JwtAuthGuard)
    async findReviewsByUserId(@Param('userId') userId: number) {
        return await this.reviewService.findReviewsByUserId(userId);
    }
}
