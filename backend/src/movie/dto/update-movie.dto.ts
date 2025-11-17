import { IsOptional, IsString } from 'class-validator';

export class UpdateMovieDto {
    @IsString({ message: 'El titulo debe ser un texto' })
    @IsOptional({ message: 'El titulo es opcional' })
    title: string;

    @IsString({ message: 'La descripcion debe ser un texto' })
    @IsOptional({ message: 'La descripcion es opcional' })
    description: string;
}
