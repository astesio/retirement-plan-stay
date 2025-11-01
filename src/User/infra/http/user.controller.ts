import { Body, Controller, Get, HttpCode, Param, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateUserUseCase } from '../../use-cases/create-user.usecase';
import { CreateUserRequestDto } from '../../dto/create-user-request.dto';
import { CreateUserResponseDto } from '../../dto/user-response.dto';
import { FindAllUsersUseCase } from '../../use-cases/find-all-users.usecase';
import { FindUserById } from '../../use-cases/find-user-by-id.usecase';

@ApiTags('Users')
@Controller('v1/users')
export class UserController {
  constructor(
    private readonly createUserUseCase: CreateUserUseCase,
    private readonly findAllUsersUseCase: FindAllUsersUseCase,
    private readonly findUserByIdUseCase: FindUserById,
  ) {}

  @Post()
  @HttpCode(201)
  async createUser(
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

  @Get()
  @HttpCode(200)
  async findAllUsers(): Promise<CreateUserResponseDto[]> {
    const users = await this.findAllUsersUseCase.execute();
    return users;
  }

  @Get(':id')
  async findUserById(@Param('id') id: string) {
    const result = await this.findUserByIdUseCase.execute({ userId: id });

    if (result.isLeft()) {
      throw result.value;
    }

    const user = result.value;
    return user;
  }
}
