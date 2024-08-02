import { createLogger, format, transports } from 'winston';
import { loggerFormat } from './format.logget';
import { ENVIROMENTS } from 'src/common/constants/enviroments.constant';
import { LOGS_PATH } from 'src/common/constants/logs-paths.constant';

const { combine, timestamp, label } = format;

const developmentLogger = () => {
  return createLogger({
    level: 'debug',
    format: combine(
      format.colorize(),
      label({ label: ENVIROMENTS.DEVELOPMENT }),
      timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
      loggerFormat()
    ),
    transports: [
      new transports.File({ filename: LOGS_PATH.DEBUG, level: 'debug' }),
      new transports.File({ filename: LOGS_PATH.COMBINED }),
      new transports.Console()
    ]
  });
};

export default developmentLogger;
