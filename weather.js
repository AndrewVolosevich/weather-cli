#!/usr/bin/env node

import { getArgs } from "./helpers/args.js";
import {printError, printHelp, printSuccess} from "./services/log.service.js";
import {saveKeyValue, VALUE_DICTIONARY} from "./services/storage.service.js";
import {getForecast, getWeather} from "./services/api.service.js";

const saveToken = async (token) => {
    if (!token.length) {
        printError(`No token`);
    }
    try {
        await saveKeyValue(VALUE_DICTIONARY.token, token);
        printSuccess('Token saved');
    } catch (e) {
        printError(`Error on token save: ${e.message}`);
    }
}

const saveCity = async (city) => {
    if (!city.length) {
        printError(`No token`);
    }
    try {
        await saveKeyValue(VALUE_DICTIONARY.city, city);
        printSuccess('City saved');
    } catch (e) {
        printError(`Error on city save: ${e.message}`);
    }
}

const initCLI = () => {
    const args = getArgs(process.argv);
    if (args?.t) {
        return saveToken(args.t);
    }
    if (args?.s) {
        return saveCity(args.s);
    }
    if (args?.h) {
        return printHelp();
    }
    return getForecast()
}

initCLI();