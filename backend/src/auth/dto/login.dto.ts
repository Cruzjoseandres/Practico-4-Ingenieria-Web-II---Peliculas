import { IsNotEmpty, IsString } from 'class-validator';

export class LoginDto {
    @IsNotEmpty({ message : 'El nombre de usuario es obligatorio' })
    @IsString({ message : 'El nombre de usuario debe ser un texto' })
    username: string;
    @IsNotEmpty({ message : 'La contraseña es obligatoria' })
    @IsString({ message : 'La contraseña debe ser un texto' })
    password: string;
}
