import { Module } from '@nestjs/common';
import { MovieService } from './movie.service';
import { MovieController } from './movie.controller';
import { Movie } from './entities/movie.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { randomBytes } from 'crypto';

@Module({
    imports: [
        TypeOrmModule.forFeature([Movie]),
        MulterModule.register({
            storage: diskStorage({
                destination: './uploads/movies',
                filename: (req, file, cb) => {
                    const hash = randomBytes(16).toString('hex'); // ← 'hex' entre comillas
                    const ext = extname(file.originalname);
                    cb(null, `${hash}${ext}`);
                },
            }),
            limits: { fileSize: 5 * 1024 * 1024 },
        }),
    ],
    controllers: [MovieController],
    providers: [MovieService],
    exports: [MovieService],
})
export class MovieModule {}
