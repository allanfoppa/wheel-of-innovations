import { format } from 'winston';

export const loggerFormat = () => format.printf(({ timestamp, label, level, message }) => {
  const logType = message.type === 'request' ? 'REQUEST' : 'RESPONSE';
  delete message.type;
  return `${timestamp} [${label}] ${level} [${logType}]: ${JSON.stringify(message)}`;
});
