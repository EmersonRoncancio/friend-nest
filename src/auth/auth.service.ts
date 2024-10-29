import { Injectable } from '@nestjs/common';
import { RegisterUserDto } from './dto/registerUser';
import { Model } from 'mongoose';
import { User } from './entities/auth.entity';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name)
    private readonly UserModel: Model<User>,
  ) {}

  create(registerDto: RegisterUserDto) {
    return registerDto;
  }
}
