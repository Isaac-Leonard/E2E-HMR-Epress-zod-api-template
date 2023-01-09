import { createLogger, transports, format } from "winston";
import { production } from "./env";

export const logger = createLogger({
  level: "debug",
  format: format.json(),
  transports: [
    new transports.File({ filename: "errors.log", level: "error" }),
    new transports.File({ filename: "combind.log" }),
  ],
});

if (!production) {
  logger.add(new transports.Console({ format: format.simple() }));
}
