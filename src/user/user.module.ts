import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserApiController } from './user.api.controller';
import { MailModule } from 'src/mail/mail.module';
import { JwtModule } from '@nestjs/jwt';
import { UserController } from './user.controller';

@Module({
  imports: [
    JwtModule.register({
      secret: 'abc',
      signOptions: { noTimestamp: true },
    }),
    MailModule,
  ],
  controllers: [UserApiController, UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
