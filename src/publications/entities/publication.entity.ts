import { Prop, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';

export class Publication extends Document {
  @Prop({
    type: Types.ObjectId,
    ref: 'User',
    required: true,
  })
  author: Types.ObjectId[];

  @Prop({
    required: true,
  })
  contentDescription: string;

  @Prop({
    type: [String],
  })
  media: string[];

  @Prop({
    default: Date.now,
  })
  createAt: Date;

  //   @Prop({
  //     type: Types.ObjectId,
  //   })
  //   coments: Types.ObjectId[];
}

export const PublicationSchema = SchemaFactory.createForClass(Publication);
