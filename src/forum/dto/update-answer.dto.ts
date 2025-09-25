import { IsString, IsOptional } from 'class-validator';

export class UpdateAnswerDto {
  @IsOptional()
  @IsString()
  content?: string;
}
