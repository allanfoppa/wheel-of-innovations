import developmentLogger from './development.logger';
import uatLogger from './uat.logger';
import productionLogger from './production.logger';
import { ENVIROMENTS } from 'src/common/constants/enviroments.constant';

export const logger: any = (logs: any) => {
  if (process.env.NODE_ENV === ENVIROMENTS.PRODUCTION)
    return productionLogger().warn(logs);

  if (process.env.NODE_ENV === ENVIROMENTS.UAT)
    return uatLogger().info(logs);

  if (process.env.NODE_ENV === ENVIROMENTS.DEVELOPMENT)
    return developmentLogger().debug(logs);
}
