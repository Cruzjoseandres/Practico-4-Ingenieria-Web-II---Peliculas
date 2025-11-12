import { IsOptional, IsString } from 'class-validator';

export class UpdateMovieDto {
    @IsString()
    @IsOptional()
    title: string;

    @IsString()
    @IsOptional()
    description: string;

    @IsString()
    @IsOptional()
    imageUrl: string;
}
