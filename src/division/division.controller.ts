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

import { DivisionService } from './division.service'
import { CreateDivisionDto } from './dto/create-division.dto'
import { UpdateDivisionDto } from './dto/update-division.dto'

@Controller('division')
export class DivisionController {
  constructor(private readonly divisionService: DivisionService) {}

  @Post()
  create(@Body() dto: CreateDivisionDto) {
    return this.divisionService.create(dto)
  }

  @Get()
  findAll() {
    return this.divisionService.findAll()
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.divisionService.findOne(id)
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateDivisionDto) {
    return this.divisionService.update(id, dto)
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.divisionService.remove(id)
  }

  @Get(':id/subdivisions')
  findSubdivisions(@Param('id', ParseIntPipe) id: number) {
    return this.divisionService.findSubdivisions(id)
  }
}
