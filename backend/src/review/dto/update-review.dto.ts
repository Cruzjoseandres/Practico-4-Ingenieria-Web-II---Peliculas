import { IsInt, IsOptional, IsString } from 'class-validator';

export class UpdateReviewDto {
    @IsString({ message: 'El comentario debe ser un texto' })
    @IsOptional({ message: 'El comentario es opcional' })
    comment: string;
    @IsOptional({ message: 'La calificacion es opcional' })
    @IsInt({ message: 'La calificacion debe ser un numero entero' })
    rating: number;
}
