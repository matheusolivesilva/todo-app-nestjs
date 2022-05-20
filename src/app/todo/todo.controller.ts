import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseUUIDPipe, Post, Put, Query } from '@nestjs/common';
import {ApiOperation, ApiResponse, ApiTags} from '@nestjs/swagger';
import {CreateTodoDto} from './dto/create-todo.dto';
import {UpdateTodoDto} from './dto/update-todo.dto';
import {BadRequestSwagger} from './helpers/swagger/bad-request.swagger';
import {NotFoundSwagger} from './helpers/swagger/not-found.swagger';
import {CreateTodoSwagger} from './swagger/create-todo.swagger';
import {IndexTodoSwagger} from './swagger/index-todo.swagger';
import {ShowTodoSwagger} from './swagger/show-todo.swagger';
import {UpdateTodoSwagger} from './swagger/update-todo.swagger';
import {TodoService} from './todo.service';

@Controller('api/v1/todos')
@ApiTags('todos')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Get()
  @ApiOperation({ summary: 'List all tasks' })
  @ApiResponse({ 
    status: 200, 
    description: 'List of tasks successfully returned', 
    type: IndexTodoSwagger,
    isArray: true,
  })
  async index() {
    return await this.todoService.findAll();
  }

  @Post()
  @ApiOperation({ summary: 'Create a new task' })
  @ApiResponse({ status: 201, description: 'New task successfully created', type: CreateTodoSwagger })
  @ApiResponse({ status: 400, description: 'Invalid parameters', type: BadRequestSwagger })
  async create(@Body() body: CreateTodoDto) {
    return await this.todoService.create(body);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Show data from a task' })
  @ApiResponse({ status: 200, description: 'Data of a task successfully returned', type: ShowTodoSwagger })
  @ApiResponse({ status: 404, description: 'Task not found', type: NotFoundSwagger })
  async show(@Param('id', new ParseUUIDPipe()) id: string) {
    return await this.todoService.findOneOrFail(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update data of a task' })
  @ApiResponse({ status: 200, description: 'Task successfully created', type: UpdateTodoSwagger })
  @ApiResponse({ status: 400, description: 'Invalid data', type: BadRequestSwagger })
  @ApiResponse({ status: 404, description: 'Task not found', type: NotFoundSwagger  })
  async update(@Param('id', new ParseUUIDPipe()) id: string, @Body() body: UpdateTodoDto) {
    return await this.todoService.update(id, body);
  }


  @Delete(':id')
  @ApiOperation({ summary: 'Delete a task' })
  @ApiResponse({ status: 204, description: 'Task successfully deleted' })
  @ApiResponse({ status: 404, description: 'Task not found', type: NotFoundSwagger })
  @HttpCode(HttpStatus.NO_CONTENT)
  async destroy(@Param('id', new ParseUUIDPipe()) id: string) {
    await this.todoService.deleteById(id);
  }

}
