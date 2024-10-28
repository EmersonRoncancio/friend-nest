import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class User extends Document {
  @Prop({
    unique: true,
    required: true,
    index: true,
  })
  username: string;

  @Prop({
    unique: true,
    required: true,
    index: true,
  })
  email: string;

  @Prop({
    required: true,
    index: true,
  })
  password: string;

  @Prop({
    required: true,
    index: true,
  })
  fullName: string;

  @Prop({
    index: true,
  })
  imageProfile: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
