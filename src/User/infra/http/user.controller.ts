import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateUserUseCase } from '../../use-cases/create-user.usecase';
import { CreateUserRequestDto } from '../../dto/create-user-request.dto';
import { CreateUserResponseDto } from '../../dto/user-response.dto';

@ApiTags('Users')
@Controller('v1/users')
export class UserController {
  constructor(private readonly createUserUseCase: CreateUserUseCase) {}

  @Post()
  @HttpCode(201)
  async create(
    @Body() request: CreateUserRequestDto,
  ): Promise<CreateUserResponseDto> {
    const result = await this.createUserUseCase.execute(request);

    if (result.isLeft()) {
      throw result.value;
    }

    const user = result.value;

    return {
      id: user.id,
      name: user.name,
      document: user.document,
    };
  }
}
