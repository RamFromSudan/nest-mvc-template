import { PartialType } from '@nestjs/swagger';
import { RegisterDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(RegisterDto) {}
