import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Question } from './question.entity';

@Entity()
export class Answer {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  content: string;
  
  @ManyToOne(() => Question, question => question.answers, { onDelete: 'CASCADE' })
  question: Question;
}
