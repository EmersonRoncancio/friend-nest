import {
  IsEmail,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class RegisterUserDto {
  @IsString({ message: 'El username es requerido' })
  @MinLength(1, { message: 'Se requiere mas de un caracter' })
  username: string;

  @IsEmail({}, { message: 'Correo invalido' })
  email: string;

  @IsString({ message: 'La contraseña es requerida' })
  @MinLength(7, { message: 'Se requiere mas de 7 caracteres' })
  @MaxLength(20, { message: 'Se requiere menos de 20 caracteres' })
  password: string;

  @IsString({ message: 'El nombre es requerido' })
  fullName: string;

  @IsOptional()
  @IsString()
  imageProfile: string;
}
