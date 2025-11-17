import { IsNotEmpty, IsString } from 'class-validator';

export class RegisterDto {
    @IsString({ message: 'El nombre de usuario debe ser un texto' })
    @IsNotEmpty({ message: 'El nombre de usuario es obligatorio' })
    username: string;
    @IsString({ message: 'La contraseña debe ser un texto' })
    @IsNotEmpty({ message: 'La contraseña es obligatoria' })
    password: string;
    @IsString({ message: 'El nombre completo debe ser un texto' })
    @IsNotEmpty({ message: 'El nombre completo es obligatorio' })
    fullName: string;
}
