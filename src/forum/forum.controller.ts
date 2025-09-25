import { Controller, Get, Post, Body, ValidationPipe, UseGuards, Patch, Param, Delete, HttpCode } from '@nestjs/common';
import { ForumService } from './forum.service';
import { CreateQuestionDto } from './dto/create-question.dto';
import { CreateAnswerDto } from './dto/create-answer.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';
import { UpdateAnswerDto } from './dto/update-answer.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard'; 

@Controller('forum')
export class ForumController {
  constructor(private readonly forumService: ForumService) {}

  @UseGuards(JwtAuthGuard) // Protect this route
  @Post('questions')
  createQuestion(@Body(new ValidationPipe()) createQuestionDto: CreateQuestionDto) {
    return this.forumService.createQuestion(createQuestionDto);
  }

  @UseGuards(JwtAuthGuard) // Protect this route
  @Post('answers')
  createAnswer(@Body(new ValidationPipe()) createAnswerDto: CreateAnswerDto) {
    return this.forumService.createAnswer(createAnswerDto);
  }
  
  @UseGuards(JwtAuthGuard) // Protect this route
  @Get('export')
  async exportData() {
      return this.forumService.exportToExcel();
  }

  @Get() // This route remains public
  findAll() {
    return this.forumService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Patch('questions/:id')
  updateQuestion(
      @Param('id') id: string,
      @Body() updateQuestionDto: UpdateQuestionDto,
  ) {
      return this.forumService.updateQuestion(id, updateQuestionDto);
  }
  
  @UseGuards(JwtAuthGuard)
  @Patch('answers/:id')
  updateAnswer(
      @Param('id') id: string,
      @Body() updateAnswerDto: UpdateAnswerDto,
  ) {
      return this.forumService.updateAnswer(id, updateAnswerDto);
  }
  
  @UseGuards(JwtAuthGuard)
  @Delete('questions/:id')
  @HttpCode(204) // Standard practice to return 204 No Content on delete
  deleteQuestion(@Param('id') id: string) {
      return this.forumService.deleteQuestion(id);
  }
  
  @UseGuards(JwtAuthGuard)
  @Delete('answers/:id')
  @HttpCode(204)
  deleteAnswer(@Param('id') id: string) {
      return this.forumService.deleteAnswer(id);
  }  
}
