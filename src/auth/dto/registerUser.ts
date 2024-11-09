import { IsEmail, IsString, MaxLength, MinLength } from 'class-validator';

export class RegisterUserDto {
  @MinLength(1, { message: 'Se requiere mas de un caracter' })
  @IsString({ message: 'El username es requerido' })
  username: string;

  @IsEmail({}, { message: 'Correo invalido' })
  @IsString({ message: 'El correo es requerido' })
  email: string;

  @MinLength(7, { message: 'Se requiere mas de 7 caracteres' })
  @MaxLength(20, { message: 'Se requiere menos de 20 caracteres' })
  @IsString({ message: 'La contraseña es requerida' })
  password: string;

  @IsString({ message: 'El nombre es requerido' })
  fullName: string;
}
