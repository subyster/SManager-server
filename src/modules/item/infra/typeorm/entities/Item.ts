import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Expose } from 'class-transformer';

import User from '@modules/user/infra/typeorm/entities/User';
import Category from './Category';

@Entity('items')
class Item {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  user_id: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column()
  category_name: string;

  @ManyToOne(() => Category)
  @JoinColumn({ name: 'category_name' })
  category: Category;

  @Column()
  name: string;

  @Column()
  price: number;

  @Column()
  size: string;

  @Column()
  avatar: string;

  @Column()
  status: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @Expose({ name: 'avatar_url' })
  getAvatarUrl(): string | null {
    if (!this.avatar) {
      return null;
    }

    return `http://192.168.0.17:3333/files/${this.avatar}`;
  }
}

export default Item;
