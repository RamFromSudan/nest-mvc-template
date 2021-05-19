import { Test, TestingModule } from '@nestjs/testing';
import { UserApiController } from './user.api.controller';
import { UserService } from './user.service';

describe('UserController', () => {
  let controller: UserApiController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserApiController],
      providers: [UserService],
    }).compile();

    controller = module.get<UserApiController>(UserApiController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
