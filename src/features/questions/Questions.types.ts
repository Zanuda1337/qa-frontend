import { TCategory } from 'src/features/categories/Categories.types';export type TQuestion = {  id: number;  title: string;  answer: string;  category: TCategory;};export type TQuestionsResponse = TQuestion[];export type TQuestionResponse = TQuestion;export interface IEditQuestionRequest extends Omit<TQuestion, 'category'> {  categoryId: number;}export interface IAddQuestionRequest  extends Omit<TQuestion, 'id' | 'category'> {  categoryId: number;}