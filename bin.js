/*
 * @Author: Kim
 * @Date: 2021-04-07 11:19:44
 * @LastEditTime: 2021-04-09 10:43:18
 * @LastEditors: Kim
 * @Description:
 * @FilePath: /template_react/bin.js
 */
const { execSync } = require("child_process");
const os = require("os");

const program = require("commander");
const package = require("./package.json");

program
    .version(package.version)
    .usage("./bin [options] <command>")
    .option("--ip", "以ip启动项目")
    .option("-e, --env <env>", "启动环境", "t1")
    .option("-m, --mode <mode>", "打包模式", "production")
    .option("-p, --port <port>", "启动端口号", 8002);

program.command("dev").description("开发模式").action(devCmd);
program.command("build").description("打包模式").action(buildCmd);
program.command("dll").description("打包dll文件").action(dllCmd);

program.parse(process.argv);

const options = program.opts();

const host = options.ip ? getIpAddress() : "localhost";
const env = options.env;
const port = options.port;

function devCmd() {
    process.env.NODE_ENV = "dev";
    execSync("npm run dev", { stdio: "inherit" });
}

function buildCmd() {
    process.env.NODE_ENV = "prod";
    execSync("npm run build", { stdio: "inherit" });
}

function dllCmd() {
    process.env.NODE_ENV = program.mode;
    execSync("npm run build:dll", { stdio: "inherit" });
}

function getIpAddress() {
    let ipAddress = "localhost";
    const interfaces = os.networkInterfaces();
    Object.keys(interfaces).forEach((devName) => {
        const deviceInfo = interfaces[devName];
        for (let i = 0; i < deviceInfo.length; i += 1) {
            const alias = deviceInfo[i];
            if (alias.family === "IPv4" && alias.address !== "127.0.0.1" && !alias.internal) {
                ipAddress = alias.address;
            }
        }
    });
    console.log("ipAddress", ipAddress);
    return ipAddress;
}

module.exports = {
    host,
    env,
    port,
};
