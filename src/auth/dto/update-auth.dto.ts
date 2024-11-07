import { IsEmail, IsString, MaxLength, MinLength } from 'class-validator';

export class LoginUserDto {
  @MinLength(1, { message: 'El email es requerido' })
  @IsString({ message: 'Email invalido' })
  @IsEmail()
  email: string;

  @IsString({ message: 'La contraseña es requerida' })
  @MinLength(7, { message: 'Se requiere mas de 7 caracteres' })
  @MaxLength(20, { message: 'Se requiere menos de 20 caracteres' })
  password: string;
}
