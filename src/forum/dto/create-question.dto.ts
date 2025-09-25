import { IsString, MinLength } from 'class-validator';

// DTO (Data Transfer Object) is a design pattern in software engineering that is used to transfer data between different layers of an application.

export class CreateQuestionDto {
  @IsString()
  @MinLength(10)
  title: string;

  @IsString()
  content: string;
}