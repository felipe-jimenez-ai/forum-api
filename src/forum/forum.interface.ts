export interface Answer {
  id: string;
  content: string;
  questionId: string;
}

export interface Question {
  id: string;
  title: string;
  content: string;
  answers: Answer[];
}
