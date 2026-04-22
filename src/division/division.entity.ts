import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, JoinColumn } from 'typeorm'

@Entity('divisions')
export class Division {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ unique: true, length: 45 })
  name: string

  @Column({ name: 'collaborator_count' })
  collaboratorCount: number

  @Column({ name: 'level' })
  level: number

  @Column({ type: 'varchar', name: 'ambassador_name', length: 100, nullable: true })
  ambassadorName: string | null

  @ManyToOne(() => Division, division => division.subdivisions, {
    nullable: true,
    onDelete: 'SET NULL'
  })
  @JoinColumn({ name: 'parent_id' })
  parent: Division | null

  @OneToMany(() => Division, division => division.parent)
  subdivisions: Division[]
}
