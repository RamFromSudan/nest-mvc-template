import { Chat } from 'src/chat/entities/chat.entity';
import MutationDate from 'src/common/date.schema';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  username: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ nullable: true })
  exampleSync: string;

  @OneToMany(() => Chat, (chat) => chat.user)
  chats: Promise<Chat>;

  @Column({ type: 'timestamp with time zone', nullable: true })
  dateVerified: Date;

  @Column(() => MutationDate)
  date: MutationDate;
}
