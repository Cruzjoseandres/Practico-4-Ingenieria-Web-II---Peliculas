import { IsNotEmpty, IsString } from 'class-validator';

export class CreateMovieDto {
    @IsString({ message: 'El titulo debe ser un texto' })
    @IsNotEmpty({ message: 'El titulo es obligatorio' })
    title: string;

    @IsString({ message: 'La descripcion debe ser un texto' })
    @IsNotEmpty({ message: 'La descripcion es obligatoria' })
    description: string;
}
