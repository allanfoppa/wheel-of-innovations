import { createLogger, format, transports } from 'winston';
import { loggerFormat } from './format.logget';
import { ENVIROMENTS } from 'src/common/constants/enviroments.constant';
import { LOGS_PATH } from 'src/common/constants/logs-paths.constant';

const { combine, timestamp, label } = format;

const uatLogger = () => {
  return createLogger({
    level: 'info',
    format: combine(
      format.colorize(),
      label({ label: ENVIROMENTS.UAT }),
      timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
      loggerFormat()
    ),
    transports: [
      new transports.File({ filename: LOGS_PATH.UAT, level: 'error' }),
      new transports.File({ filename: LOGS_PATH.COMBINED }),
      new transports.Console()
    ]
  });
};

export default uatLogger;
