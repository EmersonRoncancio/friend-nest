import { Injectable } from '@nestjs/common';
import { RegisterUserDto } from './dto/create-auth.dto';
import { Model } from 'mongoose';
import { User } from './entities/auth.entity';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name)
    private readonly UserModel: Model<User>,
  ) {}

  create(createAuthDto: RegisterUserDto) {
    return 'This action adds a new auth';
  }
}
