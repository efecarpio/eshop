/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable no-tabs */
import pino = require("pino");

const config = {
  prettyPrint: {
    colorize: true,
    levelFirst: true,
    messageFormat: "{levelLabel} {pid} {msg}",
    translateTime: "HH:MM:ss",
    ignore: "pid,hostname",
  },
};

// eslint-disable-next-line @typescript-eslint/naming-convention
export const Logger = {
  info: (message: string) => pino(config).info({}, message),
  error: (message: string) => pino(config).error({}, message),
  warn: (message: string) => pino(config).warn({}, message),
};
