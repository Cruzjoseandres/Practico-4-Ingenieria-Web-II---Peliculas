import {
    IsString,
    IsNotEmpty,
    IsNumber,
    MinLength,
    MaxLength,
    Min,
    Max,
    IsInt,
} from 'class-validator';

export class CreateReviewDto {
    @IsString({ message: 'El comentario debe ser un texto' })
    @IsNotEmpty({ message: 'El comentario es obligatorio' })
    @MinLength(5, { message: 'El comentario debe tener al menos 5 caracteres' })
    @MaxLength(500, {
        message: 'El comentario no debe exceder los 500 caracteres',
    })
    comment: string;

    @IsNumber({}, { message: 'La calificación debe ser un número' })
    @IsInt({ message: 'La calificación debe ser un número entero' })
    @Min(1, { message: 'La calificación mínima es 1' })
    @Max(5, { message: 'La calificación máxima es 5' })
    @IsNotEmpty({ message: 'La calificación es obligatoria' })
    rating: number;

    @IsNumber({}, { message: 'El ID de la película debe ser un número' })
    @IsNotEmpty({ message: 'El ID de la película es obligatorio' })
    movieId: number;
}
