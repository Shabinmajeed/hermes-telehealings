import { IsString, IsOptional, IsArray, IsDateString } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class OnboardDto {
  @ApiProperty({ example: 'John Doe' })
  @IsString()
  name!: string;

  @ApiProperty({ example: '2026-06-05T12:00:00Z' })
  @IsDateString()
  termsAcceptedAt!: string;

  @ApiPropertyOptional({ example: ['anxiety', 'depression'], type: [String] })
  @IsArray()
  @IsOptional()
  topics?: string[] = [];
}
