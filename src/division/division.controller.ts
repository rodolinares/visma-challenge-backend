import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
  ParseIntPipe,
  HttpCode,
  HttpStatus
} from '@nestjs/common'
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'

import { DivisionService } from './division.service'
import { CreateDivisionDto } from './dto/create-division.dto'
import { UpdateDivisionDto } from './dto/update-division.dto'

@ApiTags('division')
@Controller('division')
export class DivisionController {
  constructor(private readonly divisionService: DivisionService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new division' })
  @ApiResponse({ status: 201, description: 'The division has been successfully created.' })
  @ApiResponse({ status: 404, description: 'Parent division not found.' })
  @ApiResponse({ status: 409, description: 'Division with the same name already exists.' })
  create(@Body() dto: CreateDivisionDto) {
    return this.divisionService.create(dto)
  }

  @Get()
  @ApiOperation({ summary: 'Get all divisions' })
  @ApiResponse({ status: 200, description: 'List of divisions retrieved successfully.' })
  findAll() {
    return this.divisionService.findAll()
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a division by ID' })
  @ApiResponse({ status: 200, description: 'The division has been successfully retrieved.' })
  @ApiResponse({ status: 404, description: 'Division not found.' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.divisionService.findOne(id)
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a division by ID' })
  @ApiResponse({ status: 200, description: 'The division has been successfully updated.' })
  @ApiResponse({ status: 404, description: 'Division not found.' })
  @ApiResponse({
    status: 409,
    description: 'Division with the same name already exists or parent division not found.'
  })
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateDivisionDto) {
    return this.divisionService.update(id, dto)
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a division by ID' })
  @ApiResponse({ status: 204, description: 'The division has been successfully deleted.' })
  @ApiResponse({ status: 404, description: 'Division not found.' })
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.divisionService.remove(id)
  }

  @Get(':id/subdivisions')
  @ApiOperation({ summary: 'Get subdivisions of a division by ID' })
  @ApiResponse({ status: 200, description: 'List of subdivisions retrieved successfully.' })
  @ApiResponse({ status: 404, description: 'Division not found.' })
  findSubdivisions(@Param('id', ParseIntPipe) id: number) {
    return this.divisionService.findSubdivisions(id)
  }
}
