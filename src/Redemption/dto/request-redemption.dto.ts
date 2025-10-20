/* eslint-disable @typescript-eslint/no-unsafe-call */
import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';

export class RequestRedemptionDto {
  @IsNotEmpty()
  @IsString()
  @IsUUID('4')
  userId: string;

  @IsNumber()
  @IsOptional()
  value?: number;
}
