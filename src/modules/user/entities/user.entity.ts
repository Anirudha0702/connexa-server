import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { Follow } from 'src/modules/follow/entities/follow.entity';
@Entity()
export class User {
  /**
   * Unique identifier for the user, generated as a UUID.
   */
  @PrimaryGeneratedColumn('uuid')
  userId: string;

  @Column({ nullable: false })
  firstname: string;

  @Column({ nullable: false })
  lastname: string;

  @Column({ unique: true, nullable: false })
  email: string;

  @Column()
  emailVerified: boolean;

  // Password-based Authentication
  @Column()
  password: string; // Store hashed password for email/password auth

  @Column({ nullable: true, default: null })
  refresh_token?: string; // Store the refresh token for email/password auth

  @Column({ nullable: true, default: null })
  access_token?: string; // Store the access token for email/password auth

  @Column({ nullable: true, default: null })
  expires_at?: number; // Store expiry time for access token
  @Column()
  username: string;
  // Google OAuth fields
  @Column({ nullable: true, default: null })
  googleId?: string; // Google ID if the user authenticated via Google OAuth

  @Column({ nullable: true, default: null })
  googleRefreshToken?: string; // Store Google refresh token (if applicable)
  @Column()
  dob: Date;
  @CreateDateColumn()
  _createdAt: Date;

  @UpdateDateColumn()
  _updatedAt: Date;

  @OneToMany(() => Follow, (follow) => follow.follower)
  follows: Follow[];

  @OneToMany(() => Follow, (follow) => follow.followee)
  followers: Follow[];
}
