import { TypeOrmModuleOptions } from '@nestjs/typeorm';

// 1. Importa tus clases de entidad manualmente
import { User } from '../user/entities/user.entity';
import { Movie } from '../movie/entities/movie.entity';
import { Review } from '../review/entities/review.entity';

export const typeOrmConfig: TypeOrmModuleOptions = {
    type: 'sqlite',
    database: 'db/database.sqlite',
    entities: [User, Movie, Review],

    synchronize: true,
};
