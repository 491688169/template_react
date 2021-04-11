/*
 * @Author: Kim
 * @Date: 2021-04-07 15:16:41
 * @LastEditTime: 2021-04-07 18:21:12
 * @LastEditors: Kim
 * @Description:
 * @FilePath: /template_react/env.js
 */
const { env, host, port } = require("./bin");
const { version } = require("./package.json");

const BACKEND_ADDRESS = {
    T1: "https://t1.learnta.cn",
    T2: "https://t2.learnta.cn",
    T3: "https://t3.learnta.cn",
    STAGING: "https://learnta.cn",
    PROD: "https://learnta.cn",
};

const conf = {
    VERSION: version,
    MODE: process.env.NODE_ENV,
    ENV: env,
    BACKEND: getOpt(BACKEND_ADDRESS, env),
    HOST: host,
    PORT: port,
    PRODUCT: "demo",
};

if (conf.DEV) {
    conf.FRONTEND = `http://${host}:${port}/`;
}

outputConf(conf);

module.exports = conf;

function getOpt(obj, key, defaultValue) {
    return obj[key.toUpperCase()] || obj[key.toLowerCase()] || defaultValue;
}

function outputConf(config) {
    const KEYS = Object.keys(config);
    const MAX_LENGTH = Math.max(...KEYS.map((k) => k.length)) + 2;
    /* eslint-disable no-console */
    console.log("\r\n\x1b[36m==================== 环境变量 ======================\x1b[0m");
    Object.keys(config).forEach((k) => {
        const color = config[k] === true ? "\x1b[35m" : "";
        const len = k.length;
        const prefix = len < MAX_LENGTH ? " ".repeat(MAX_LENGTH - k.length) : "";
        console.log("%s%s: %j\x1b[0m", color, prefix + k, config[k]);
    });
    console.log("\x1b[36m===================================================\x1b[0m\r\n");
    /* eslint-disable no-console */
}
