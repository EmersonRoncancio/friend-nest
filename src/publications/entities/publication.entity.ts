import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema()
export class Publication extends Document {
  @Prop({
    type: Types.ObjectId,
    ref: 'User',
    required: true,
    index: true,
  })
  author: Types.ObjectId;

  @Prop({
    required: true,
    index: true,
  })
  contentDescription: string;

  @Prop({
    type: [String],
    index: true,
  })
  media: string[];

  @Prop({
    default: Date.now,
    index: true,
  })
  createAt: Date;

  //   @Prop({
  //     type: Types.ObjectId,
  //   })
  //   coments: Types.ObjectId[];
}

export const PublicationSchema = SchemaFactory.createForClass(Publication);
