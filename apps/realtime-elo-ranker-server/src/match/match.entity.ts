import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity()
export class Match {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  winnerId: string;

  @Column()
  loserId: string;

  @Column()
  isDraw: boolean;

  @CreateDateColumn()
  playedAt: Date;
}
