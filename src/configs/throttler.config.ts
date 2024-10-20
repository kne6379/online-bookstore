import {
  THROTTLER_LIMIT,
  THROTTLER_TTL,
} from 'src/common/constants/throttler.constant';

export const throttlerModuleOptions = {
  ttl: THROTTLER_TTL,
  limit: THROTTLER_LIMIT,
};
