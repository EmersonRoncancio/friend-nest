import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Payload } from '../interfaces/payload.interface';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '../entities/auth.entity';
import { Model } from 'mongoose';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly confiService: ConfigService,
    @InjectModel(User.name)
    private readonly userModel: Model<User>,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: confiService.get<string>('keyjwt'),
    });
  }

  async validate(payload: Payload) {
    const { userId } = payload;

    const validateUser = await this.userModel.findById(userId);
    if (!validateUser) throw new UnauthorizedException();

    return validateUser;
  }
}
