import {
    Controller,
    Get,
    Post,
    Body,
    // Patch,
    Param,
    Delete,
    UseGuards,
    UseInterceptors,
    UploadedFile,
} from '@nestjs/common';
import { MovieService } from './movie.service';
import { CreateMovieDto } from './dto/create-movie.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { multerConfig } from './multer.config';

@Controller('movie')
export class MovieController {
    constructor(private readonly movieService: MovieService) {}

    @UseGuards(JwtAuthGuard)
    @Post()
    @UseInterceptors(FileInterceptor('image', multerConfig))
    async create(
        @Body() createMovieDto: CreateMovieDto,
        @UploadedFile() file: Express.Multer.File
    ) {
        console.log('Received file:', file);
        return await this.movieService.createPelicula(createMovieDto, file);
    }

    @Get()
    async findAll() {
        return await this.movieService.findAll();
    }

    @Get(':id') // 🌍 Público
    findOne(@Param('id') id: string) {
        return this.movieService.findOne(+id);
    }

    // @UseGuards(JwtAuthGuard) // 🔒 Protegido
    // @Patch(':id')
    // update(@Param('id') id: string, @Body() updateMovieDto: UpdateMovieDto) {
    //     return this.movieService.update(+id, updateMovieDto);
    // }

    @UseGuards(JwtAuthGuard) // 🔒 Protegido
    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.movieService.remove(+id);
    }
}
