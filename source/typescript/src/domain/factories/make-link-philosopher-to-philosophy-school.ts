import { KnexPhilosopherRepository } from '../../infra/database/knex/knex-philosopher-repository'
import { KnexPhilosopherSchoolRepository } from 'src/infra/database/knex/knex-philosopher-school-repository'
import { KnexPhilosophySchoolRepository } from 'src/infra/database/knex/knex-philosophy-school-repository'

import { LinkPhilosopherToPhilosophySchoolUseCase } from '../use-cases/link-philosopher-to-philosophy-school'

export function makeLinkPhilosopherToPhilosophySchoolUseCase() {
  const philosopherRepository = new KnexPhilosopherRepository()
  const philosopherSchoolRepository = new KnexPhilosopherSchoolRepository()
  const philosophySchoolRepository = new KnexPhilosophySchoolRepository()

  const linkPhilosopherToPhilosophySchool =
    new LinkPhilosopherToPhilosophySchoolUseCase(
      philosopherRepository,
      philosophySchoolRepository,
      philosopherSchoolRepository,
    )

  return linkPhilosopherToPhilosophySchool
}
