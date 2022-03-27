#!/usr/bin/env node

import { getArgs } from "./helpers/args.js";
import {printError, printHelp, printSuccess} from "./services/log.service.js";
import {saveKeyValue} from "./services/storage.service.js";

const saveToken = async (token) => {
    try {
        await saveKeyValue('token', token);
        printSuccess('Token saved');
    } catch (e) {
        printError(`Error on token save: ${e.message}`);
    }
}

const initCLI = () => {
    const args = getArgs(process.argv);
    if (args.t) {
        return saveToken(args.t);
    }
    if (args.h) {
        printHelp();
    }
}

initCLI();