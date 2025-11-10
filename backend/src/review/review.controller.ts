import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    UseGuards,
} from '@nestjs/common';
import { ReviewService } from './review.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('review')
export class ReviewController {
    constructor(private readonly reviewService: ReviewService) {}

    @UseGuards(JwtAuthGuard) // 🔒 Protegido
    @Post()
    create(@Body() createReviewDto: CreateReviewDto) {
        return this.reviewService.create(createReviewDto);
    }

    @Get() // 🌍 Público
    findAll() {
        return this.reviewService.findAll();
    }

    @Get(':id') // 🌍 Público
    findOne(@Param('id') id: string) {
        return this.reviewService.findOne(+id);
    }

    @UseGuards(JwtAuthGuard) // 🔒 Protegido
    @Patch(':id')
    update(@Param('id') id: string, @Body() updateReviewDto: UpdateReviewDto) {
        return this.reviewService.update(+id, updateReviewDto);
    }

    @UseGuards(JwtAuthGuard) // 🔒 Protegido
    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.reviewService.remove(+id);
    }
}
