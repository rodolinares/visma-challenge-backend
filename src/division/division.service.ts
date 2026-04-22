import { Injectable, NotFoundException, ConflictException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { Division } from './division.entity'
import { CreateDivisionDto } from './dto/create-division.dto'
import { UpdateDivisionDto } from './dto/update-division.dto'

@Injectable()
export class DivisionService {
  constructor(
    @InjectRepository(Division)
    private readonly divisionRepo: Repository<Division>
  ) {}

  async create(dto: CreateDivisionDto): Promise<Division> {
    const existing = await this.divisionRepo.findOneBy({ name: dto.name })
    if (existing) {
      throw new ConflictException(`Division "${dto.name}" already exists`)
    }

    const division = this.divisionRepo.create({
      name: dto.name,
      level: dto.level,
      collaboratorCount: dto.collaboratorCount,
      ambassadorName: dto.ambassadorName ?? null
    })

    if (dto.parentId) {
      const parent = await this.divisionRepo.findOneBy({ id: dto.parentId })
      if (!parent) {
        throw new NotFoundException(`Parent division ${dto.parentId} not found`)
      }
      division.parent = parent
    }

    return this.divisionRepo.save(division)
  }

  async findAll(): Promise<Division[]> {
    return this.divisionRepo.find({
      relations: ['parent', 'subdivisions']
    })
  }

  async findOne(id: number): Promise<Division> {
    const division = await this.divisionRepo.findOne({
      where: { id },
      relations: ['parent', 'subdivisions']
    })
    if (!division) {
      throw new NotFoundException(`Division ${id} not found`)
    }
    return division
  }

  async update(id: number, dto: UpdateDivisionDto): Promise<Division> {
    const division = await this.findOne(id)

    if (dto.name && dto.name !== division.name) {
      const existing = await this.divisionRepo.findOneBy({ name: dto.name })
      if (existing) {
        throw new ConflictException(`Division "${dto.name}" already exists`)
      }
    }

    if (dto.parentId !== undefined) {
      if (dto.parentId === id) {
        throw new ConflictException('A division cannot be its own parent')
      }
      const parent = await this.divisionRepo.findOneBy({ id: dto.parentId })
      if (!parent) {
        throw new NotFoundException(`Parent division ${dto.parentId} not found`)
      }
      division.parent = parent
    }

    Object.assign(division, {
      name: dto.name ?? division.name,
      level: dto.level ?? division.level,
      collaboratorCount: dto.collaboratorCount ?? division.collaboratorCount,
      ambassadorName: dto.ambassadorName ?? division.ambassadorName
    })

    return this.divisionRepo.save(division)
  }

  async remove(id: number): Promise<void> {
    const division = await this.findOne(id)
    await this.divisionRepo.remove(division)
  }

  async findSubdivisions(id: number): Promise<Division[]> {
    await this.findOne(id) // valida que el padre exista
    return this.divisionRepo.find({
      where: { parent: { id } },
      relations: ['parent']
    })
  }
}
