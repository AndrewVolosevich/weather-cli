import chalk from "chalk";
import dedent from "dedent-js";

export * as chalk from 'chalk';

export const printError = (error) => {
    console.log(`${chalk.bgRedBright(' ERROR ')}  ${error}`)
}

export const printSuccess = (message) => {
    console.log(`${chalk.bgGreenBright(' SUCCESS ')}  ${message}`)
}

export const printHelp = () => {
    console.log(
        dedent`${chalk.bgYellowBright(' HELP ')}
        without parameters - print weather
        -s [CITY] for setting city
        -h for printing help
        -t [API_KEY] for token save 
        `
    )
}

export const printWeather = (res, icon) => {
    console.log(
        dedent`${chalk.bgMagentaBright(`Weather`)} in city ${res.name}
        ${icon}  ${res?.weather[0]?.description}
        temperature ${res.main?.temp} feels like ${res.main?.feels_like}
        humidity ${res.main?.humidity}
        clouds ${res?.clouds?.all}
        wind speed ${res?.wind?.speed}
        `
    )
}