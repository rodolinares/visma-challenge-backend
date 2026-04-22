import { IsString, IsInt, IsPositive, IsOptional, MaxLength, Min } from 'class-validator'

export class CreateDivisionDto {
  @IsString()
  @MaxLength(45)
  name: string

  @IsInt()
  @IsPositive()
  level: number

  @IsInt()
  @Min(0)
  collaboratorCount: number

  @IsOptional()
  @IsString()
  @MaxLength(100)
  ambassadorName?: string

  @IsOptional()
  @IsInt()
  @IsPositive()
  parentId?: number
}
