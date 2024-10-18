import {
  IsDate,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Category } from '../types/category.type';

@Entity({ name: 'books' })
export class Book {
  @PrimaryGeneratedColumn()
  id: number;

  @IsNotEmpty()
  @IsString()
  @Column({ type: 'varchar', length: 100 })
  title: string;

  @IsNotEmpty()
  @IsString()
  @Column({ type: 'varchar', length: 50 })
  author: string;

  @IsNotEmpty()
  @IsString()
  @Column({ type: 'varchar', length: 100 })
  publisher: string;

  @IsNotEmpty()
  @IsString()
  @Column({ type: 'text' })
  description: string;

  @IsNotEmpty()
  @IsEnum(Category)
  @Column({ type: 'enum', enum: Category })
  category: Category;

  @IsNotEmpty()
  @IsInt()
  @Column({ type: 'int' })
  pageCount: number;

  @IsNotEmpty()
  @IsInt()
  @Column({ type: 'int' })
  price: number;

  @IsOptional()
  @IsNumber()
  @Column({ type: 'decimal', precision: 2, scale: 1 })
  rating: number;

  @IsNotEmpty()
  @IsInt()
  @Column({ type: 'int' })
  stockQuantity: number;

  @IsNotEmpty()
  @IsDate()
  @Column({ type: 'date' })
  publicationDate: Date;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
