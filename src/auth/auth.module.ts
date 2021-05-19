import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UserModule } from 'src/user/user.module';
import { AuthApiController } from './auth.api.controller';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { SessionSerializer } from './session.serializer';
import { JwtStrategy } from './strategies/jwt.strategy';
import { LocalStrategy } from './strategies/local.strategy';

@Module({
  imports: [
    UserModule,
    PassportModule,
    JwtModule.register({
      secret: 'abc',
      signOptions: { expiresIn: '60s' },
    }),
  ],
  controllers: [AuthController, AuthApiController],
  providers: [AuthService, SessionSerializer, LocalStrategy, JwtStrategy],
})
export class AuthModule {}
