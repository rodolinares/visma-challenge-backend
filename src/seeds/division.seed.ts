import { AppDataSource } from '../data-source'
import { Division } from '../division/division.entity'

async function seed() {
  await AppDataSource.initialize()
  const repo = AppDataSource.getRepository(Division)

  await repo.query('SET FOREIGN_KEY_CHECKS = 0')
  await repo.clear()
  await repo.query('SET FOREIGN_KEY_CHECKS = 1')

  const getRandomInt = (min: number, max: number) =>
    Math.floor(Math.random() * (max - min + 1)) + min

  const roots = await repo.save([
    repo.create({
      name: 'Dirección General',
      level: 1,
      collaboratorCount: getRandomInt(5, 10),
      ambassadorName: 'Elena Garro',
      parent: null
    }),
    repo.create({
      name: 'Operaciones',
      level: 1,
      collaboratorCount: getRandomInt(50, 100),
      ambassadorName: 'Ricardo Rocha',
      parent: null
    }),
    repo.create({
      name: 'Talento Humano',
      level: 1,
      collaboratorCount: getRandomInt(10, 20),
      ambassadorName: 'Marta Sosa',
      parent: null
    }),
    repo.create({
      name: 'Tecnología',
      level: 1,
      collaboratorCount: getRandomInt(40, 80),
      ambassadorName: 'Carlos Mendoza',
      parent: null
    }),
    repo.create({
      name: 'Finanzas',
      level: 1,
      collaboratorCount: getRandomInt(15, 30),
      ambassadorName: 'Sofía Reyes',
      parent: null
    }),
    repo.create({
      name: 'Ventas',
      level: 1,
      collaboratorCount: getRandomInt(30, 60),
      ambassadorName: null,
      parent: null
    })
  ])

  const [dirGen, ops, hr, tech, fin, ventas] = roots

  const subDivsL2 = await repo.save([
    repo.create({
      name: 'Infraestructura',
      level: 2,
      collaboratorCount: getRandomInt(10, 20),
      ambassadorName: 'Ivan Petrov',
      parent: tech
    }),
    repo.create({
      name: 'Desarrollo Software',
      level: 2,
      collaboratorCount: getRandomInt(25, 40),
      ambassadorName: 'Ana Torres',
      parent: tech
    }),
    repo.create({
      name: 'Ciberseguridad',
      level: 2,
      collaboratorCount: getRandomInt(5, 12),
      ambassadorName: null,
      parent: tech
    }),
    repo.create({
      name: 'Logística',
      level: 2,
      collaboratorCount: getRandomInt(20, 40),
      ambassadorName: 'Luis Paredes',
      parent: ops
    }),
    repo.create({
      name: 'Mantenimiento',
      level: 2,
      collaboratorCount: getRandomInt(15, 25),
      ambassadorName: null,
      parent: ops
    }),
    repo.create({
      name: 'Contabilidad',
      level: 2,
      collaboratorCount: getRandomInt(5, 15),
      ambassadorName: 'Laura Méndez',
      parent: fin
    }),
    repo.create({
      name: 'Tesorería',
      level: 2,
      collaboratorCount: getRandomInt(3, 8),
      ambassadorName: null,
      parent: fin
    }),
    repo.create({
      name: 'Ventas Locales',
      level: 2,
      collaboratorCount: getRandomInt(15, 25),
      ambassadorName: 'Jorge Cano',
      parent: ventas
    }),
    repo.create({
      name: 'Exportaciones',
      level: 2,
      collaboratorCount: getRandomInt(10, 20),
      ambassadorName: null,
      parent: ventas
    })
  ])

  const [infra, dev, cyber, log, mant, cont, tes, vntLoc, exp] = subDivsL2

  await repo.save([
    repo.create({
      name: 'Frontend',
      level: 3,
      collaboratorCount: getRandomInt(10, 15),
      ambassadorName: 'Lucía Fernández',
      parent: dev
    }),
    repo.create({
      name: 'Backend',
      level: 3,
      collaboratorCount: getRandomInt(10, 15),
      ambassadorName: 'Miguel Ramos',
      parent: dev
    }),
    repo.create({
      name: 'Mobile',
      level: 3,
      collaboratorCount: getRandomInt(5, 10),
      ambassadorName: null,
      parent: dev
    }),
    repo.create({
      name: 'Almacén Central',
      level: 3,
      collaboratorCount: getRandomInt(10, 20),
      ambassadorName: 'Pedro Gómez',
      parent: log
    }),
    repo.create({
      name: 'Distribución Last-Mile',
      level: 3,
      collaboratorCount: getRandomInt(8, 15),
      ambassadorName: null,
      parent: log
    })
  ])

  console.log('Seeding complete.')
  await AppDataSource.destroy()
}

seed().catch(err => {
  console.error('There was a problem in the seeding process:', err)
  process.exit(1)
})
