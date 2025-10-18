/* eslint-disable @typescript-eslint/no-unsafe-call */
import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class ConsultBalanceDto {
  @IsNotEmpty()
  @IsString()
  @IsUUID('4')
  userId: string;
}
