import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  Index,
} from 'typeorm';
import { User } from 'src/modules/user/entities/user.entity';
@Entity()
@Index(['followerId', 'followeeId'], { unique: true }) // Ensure that a user can only follow another user once
/**
 * Represents a follow relationship between two users.
 */
export class Follow {
  @PrimaryGeneratedColumn()
  id: number; // Unique identifier for each follow relationship

  @Column()
  followerId: string;

  @Column()
  followeeId: string;

  @Column()
  timestamp: Date;

  // Relationships with User entity (foreign keys)
  @ManyToOne(() => User, (user) => user.follows) // A follower is a User
  @JoinColumn({ name: 'followerId' })
  follower: User;

  @ManyToOne(() => User, (user) => user.followers) // A followee is a User
  @JoinColumn({ name: 'followeeId' })
  followee: User;
}
