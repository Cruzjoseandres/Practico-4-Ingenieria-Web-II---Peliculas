import {
    Controller,
    Get,
    Post,
    Body,
    // Patch,
    Param,
    Delete,
    UseGuards,
} from '@nestjs/common';
import { MovieService } from './movie.service';
import { CreateMovieDto } from './dto/create-movie.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('movie')
export class MovieController {
    constructor(private readonly movieService: MovieService) {}

    @UseGuards(JwtAuthGuard) // 🔒 Protegido
    @Post()
    create(@Body() createMovieDto: CreateMovieDto) {
        return this.movieService.createPelicula(createMovieDto);
    }

    @Get() // 🌍 Público
    findAll() {
        return this.movieService.findAll();
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
