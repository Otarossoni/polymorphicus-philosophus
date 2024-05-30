import { CronTask } from '../cron'
import { timer } from '../timers'

import { makeRenewDailyQuoteUseCase } from 'src/domain/factories/make-renew-random-quote'

new CronTask(async () => {
  const renewDailyQuoteUseCase = makeRenewDailyQuoteUseCase()
  renewDailyQuoteUseCase.execute()
}, timer.EVERY_DAY).start()
