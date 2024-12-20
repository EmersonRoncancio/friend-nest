import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({
  toJSON: {
    virtuals: true,
    versionKey: false,
    transform: (doc, ret) => {
      ret.id = ret._id;
      delete ret._id;
      delete ret.password;
    },
  },
})
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

  @Prop({
    type: [{ type: Types.ObjectId, ref: 'User' }],
  })
  friends: Types.ObjectId[];
}

export const UserSchema = SchemaFactory.createForClass(User);
