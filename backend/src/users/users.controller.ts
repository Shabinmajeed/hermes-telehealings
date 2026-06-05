import {
  Controller, Get, Post, Patch, Delete, Body, Param, HttpCode, HttpStatus,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiParam } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { OnboardDto, UpdateUserDto, CreateProfileDto } from './dto';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // -- User endpoints --

  @Post('onboard')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Onboard a new user (soft registration, no auth)' })
  async onboard(@Body() dto: OnboardDto) {
    return this.usersService.onboard(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all users' })
  async findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get user by ID' })
  @ApiParam({ name: 'id', description: 'User UUID' })
  async findById(@Param('id') id: string) {
    return this.usersService.findById(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update user' })
  @ApiParam({ name: 'id', description: 'User UUID' })
  async update(@Param('id') id: string, @Body() dto: UpdateUserDto) {
    return this.usersService.update(id, dto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete user' })
  @ApiParam({ name: 'id', description: 'User UUID' })
  async remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }

  // -- Profile endpoints --

  @Post(':userId/profile')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create or update user profile (upsert)' })
  @ApiParam({ name: 'userId', description: 'User UUID' })
  async upsertProfile(
    @Param('userId') userId: string,
    @Body() dto: CreateProfileDto,
  ) {
    return this.usersService.upsertProfile(userId, dto);
  }

  @Get(':userId/profile')
  @ApiOperation({ summary: 'Get user profile' })
  @ApiParam({ name: 'userId', description: 'User UUID' })
  async getProfile(@Param('userId') userId: string) {
    return this.usersService.getProfile(userId);
  }
}
