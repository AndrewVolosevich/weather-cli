import {homedir} from 'os';
import {join} from 'path';
import {promises} from 'fs';

export const VALUE_DICTIONARY = {
    token: 'token',
    city: 'city'
}

const isExists = async (path) => {
    try {
        await promises.stat(path)
        return true
    } catch (e) {
        return false
    }
}

const filePath = join(homedir(), 'weather-data.json');

export const saveKeyValue = async (key, value) => {
    let data = {};
    if (await isExists(filePath)) {
        const file = await promises.readFile(filePath);
        data = JSON.parse(file.toString());
    }
    data[key] = value;
    await promises.writeFile(filePath, JSON.stringify(data))
}

export const getKeyValue = async (key) => {
    if (await isExists(filePath)) {
        const file = await promises.readFile(filePath);
        const data = JSON.parse(file.toString());
        return data[key];
    }
    return undefined;
}