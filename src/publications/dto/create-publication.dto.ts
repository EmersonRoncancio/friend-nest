import { IsString, MaxLength } from 'class-validator';

export class CreatePublicationDto {
  @MaxLength(120, { message: 'El titulo no puede ser mayor a 120 caracteres' })
  @IsString({ message: 'El titulo es requerido' })
  contentDescription: string;
}
