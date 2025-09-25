import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Question } from './entities/question.entity';
import { Answer } from './entities/answer.entity';
import { CreateQuestionDto } from './dto/create-question.dto';
import { CreateAnswerDto } from './dto/create-answer.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';
import { UpdateAnswerDto } from './dto/update-answer.dto';
import * as ExcelJS from 'exceljs';
import * as path from 'path';

@Injectable()
export class ForumService {
  private readonly logger = new Logger(ForumService.name);
  constructor(
    @InjectRepository(Question)
    private questionsRepository: Repository<Question>,
    @InjectRepository(Answer)
    private answersRepository: Repository<Answer>,
  ) {}

  async createQuestion(createQuestionDto: CreateQuestionDto): Promise<Question> {
    const newQuestion = this.questionsRepository.create(createQuestionDto);
    return this.questionsRepository.save(newQuestion);
  }

  async createAnswer(createAnswerDto: CreateAnswerDto): Promise<Answer> {
    const question = await this.questionsRepository.findOneBy({ id: createAnswerDto.questionId });
    if (!question) {
      throw new NotFoundException(`Question with ID "${createAnswerDto.questionId}" not found`);
    }
    const newAnswer = this.answersRepository.create({
      content: createAnswerDto.content,
      question: question,
    });
    return this.answersRepository.save(newAnswer);
  }

  findAll(): Promise<Question[]> {
    return this.questionsRepository.find({ relations: ['answers'] });
  }

  async updateQuestion(id: string, updateQuestionDto: UpdateQuestionDto): Promise<Question> {
    const question = await this.questionsRepository.preload({
      id: id,
      ...updateQuestionDto,
    });
    if (!question) {
      throw new NotFoundException(`Question with ID "${id}" not found`);
    }
    return this.questionsRepository.save(question);
  }

  async updateAnswer(id: string, updateAnswerDto: UpdateAnswerDto): Promise<Answer> {
    const answer = await this.answersRepository.preload({
      id: id,
      ...updateAnswerDto,
    });
    if (!answer) {
      throw new NotFoundException(`Answer with ID "${id}" not found`);
    }
    return this.answersRepository.save(answer);
  }
  
  async deleteQuestion(id: string): Promise<void> {
    const result = await this.questionsRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Question with ID "${id}" not found`);
    }
  }

  async deleteAnswer(id: string): Promise<void> {
    const result = await this.answersRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Answer with ID "${id}" not found`);
    }
  }
  
  async exportToExcel(): Promise<string> {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Forum Data');

    worksheet.columns = [
      { header: 'Type', key: 'type', width: 15 },
      { header: 'ID', key: 'id', width: 40 },
      { header: 'Title / Content', key: 'content', width: 80 },
      // Note: The parent question ID is now accessed via the 'question' relation
      { header: 'Parent Question ID', key: 'questionId', width: 40 },
    ];

    // 1. Await the result of findAll()
    const questions = await this.findAll();
    
    this.logger.log(`[Export] Found ${questions.length} question(s) to export.`);

    questions.forEach(question => {
      worksheet.addRow({
        type: 'Question',
        id: question.id,
        content: question.title,
        questionId: '',
      });
      
      // 2. The answers are directly available on the question object
      if (question.answers) {
        question.answers.forEach(answer => {
          worksheet.addRow({
            type: 'Answer',
            id: answer.id,
            content: answer.content,
            // The question object itself is available on the answer
            questionId: question.id, 
          });
        });
      }
    });

    const exportPath = path.join(__dirname, '..', '..', 'public', 'forum_data.xlsx');
    await workbook.xlsx.writeFile(exportPath);

    return 'File successfully generated at /forum_data.xlsx';
  }
}
