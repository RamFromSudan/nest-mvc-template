import MutationDate from 'src/common/date.schema';
import { User } from 'src/user/entities/user.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Message } from './message.entity';

@Entity()
export class Chat {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (u) => u.chats)
  user: Promise<User>;

  @OneToMany(() => Message, (a) => a.chat)
  messages: Promise<Message[]>;

  @Column(() => MutationDate)
  date: MutationDate;
}
