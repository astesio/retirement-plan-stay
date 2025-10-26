import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateUserResponseDto {
  @ApiProperty({
    description: 'ID único do usuário no sistema.',
    example: 'a1b2c3d4-e5f6-4789-abcd-ef0123456789',
  })
  id: string;

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
