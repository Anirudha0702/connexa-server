import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Schema as mongooseSchema } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';
export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  @Prop({ required: true })
  @ApiProperty()
  email: string;

  @Prop()
  @ApiProperty()
  emailVerified: boolean;

  @Prop({ required: true })
  @ApiProperty()
  password: number;

  @Prop({ required: true })
  @ApiProperty()
  username: string;

  @Prop({ required: true })
  @ApiProperty()
  firstName: string;

  @Prop({ required: true })
  @ApiProperty()
  lastName: string;

  @Prop()
  @ApiProperty()
  photoURL: string;

  @Prop({
    type: [{ type: mongooseSchema.Types.ObjectId, ref: 'User' }],
    ref: 'User',
    default: [],
  })
  @ApiProperty()
  following: User[];

  @Prop({
    type: [{ type: mongooseSchema.Types.ObjectId, ref: 'User' }],
    ref: 'User',
    default: [],
  })
  @ApiProperty()
  followers: User[];
  //posts[]
  //likes[]
}

export const UserSchema = SchemaFactory.createForClass(User);
