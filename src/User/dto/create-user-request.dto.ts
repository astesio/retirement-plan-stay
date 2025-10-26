import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateUserRequestDto {
  @ApiProperty({
    description: '(your name hrere) - (seu nome aqui)',
    example: 'fulano ou ciclano',
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    description: '(document)',
    example: '08712908459',
  })
  @IsNotEmpty()
  @IsString()
  document: string;
}
