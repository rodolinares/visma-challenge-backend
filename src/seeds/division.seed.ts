import { AppDataSource } from '../data-source'
import { Division } from '../division/division.entity'

async function seed() {
  await AppDataSource.initialize()
  const repo = AppDataSource.getRepository(Division)

  await repo.query('SET FOREIGN_KEY_CHECKS = 0')
  await repo.clear()
  await repo.query('SET FOREIGN_KEY_CHECKS = 1')

  const engineering = repo.create({
    name: 'Engineering',
    level: 1,
    collaboratorCount: 120,
    ambassadorName: 'Carlos Mendoza',
    parent: null
  })

  const marketing = repo.create({
    name: 'Marketing',
    level: 1,
    collaboratorCount: 45,
    ambassadorName: null,
    parent: null
  })

  await repo.save([engineering, marketing])

  const frontend = repo.create({
    name: 'Frontend',
    level: 2,
    collaboratorCount: 30,
    ambassadorName: 'Ana Torres',
    parent: engineering
  })

  const backend = repo.create({
    name: 'Backend',
    level: 2,
    collaboratorCount: 50,
    ambassadorName: null,
    parent: engineering
  })

  const digitalMarketing = repo.create({
    name: 'Digital Marketing',
    level: 2,
    collaboratorCount: 20,
    ambassadorName: 'Luis Paredes',
    parent: marketing
  })

  await repo.save([frontend, backend, digitalMarketing])

  console.log('Seeding complete')
  await AppDataSource.destroy()
}

seed().catch(err => {
  console.error('There was a problem in the seeding process:', err)
  process.exit(1)
})
