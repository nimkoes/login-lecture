const { createLogger, transports, format } = require("winston");
const { combine, timestamp, label, printf, simple, colorize } = format;

const printFormat = printf(({ timestamp, label, level, message }) => {
    return `${timestamp} [${label}] ${level} : ${message}`
});

const printLogFormat = {
    file: combine(
        label({
            label: "백엔드 맛보기"
        }),
        // colorize(),
        // simple(),
        timestamp({format: "YYYY-MM-DD HH:mm:ss"}),
        printFormat
    ),
    console: combine(
        colorize(),
        simple()
    )}
;

const options = {
    file: new transports.File({
        filename: "access.log",
        dirname: './logs',
        level: "info",
        format: printLogFormat.file
    }),
    console: new transports.Console({
        level: "info",
        format: printLogFormat.console
    })
}

const logger = createLogger({transports: [options.file]});

if(process.env.NODE_ENV !== "production") {
    logger.add(options.console);
}

module.exports = logger;

/*
winston log level
    0 : error
    1 : warn
    2 : info
    3 : http
    4 : verbose
    5 : debug
    6 : silly
*/
