// import * as https from "https";
import {getKeyValue, VALUE_DICTIONARY} from "./storage.service.js";
import axios from "axios";
import emoji from "node-emoji";
import {printError, printWeather} from "./log.service.js";

export const getIcon = (icon) => {
    switch (icon.slice(0, -1)) {
        case '01':
            return '☀️'
        case '02':
            return emoji.get('mostly_sunny')
        case '03':
            return '☁️'
        case '04':
            return emoji.get('lightning_cloud"')
        case '09':
            return '🌧️'
        case '10':
            return '🌨️'
        case '11':
            return '🌩️ 🌩️ 🌩️'
        case '13':
            return '❄️'
        case '50':
            return '🌫️'
    }
}

export const getForecast = async () => {
    try {
        const city = await getKeyValue(VALUE_DICTIONARY.city);
        const weather = await getWeather(process.env.CITY ?? city);
        printWeather(weather, getIcon(weather.weather[0].icon))
    } catch (e) {
        if (e?.response?.status === 404) {
            printError('Incorrectly specified city');
        } else if (e?.response?.status === 401) {
            printError('Incorrectly specified token');
        } else {
            printError(e.message);
        }
    }
}

export const getWeather = async (city) => {
    const token = await getKeyValue(VALUE_DICTIONARY.token);
    if (!token) {
        throw new Error('No API token, please set API token with command -t [API_KEY]');
    }
    const {data} = await axios.get('https://api.openweathermap.org/data/2.5/weather', {
        params: {
            q: city,
            appid: token,
            units: 'metric',
            lang: 'en',
        }
    })
    console.log(data)
    return data;
    // with https
    // const url = new URL('https://api.openweathermap.org/data/2.5/weather')
    // url.searchParams.append('q', city);
    // url.searchParams.append('appid', token);
    // url.searchParams.append('units', 'metric');
    // url.searchParams.append('lang', 'en');
    // https.get(url, (res) => {
    //     let data = '';
    //     res.on('data', (chunk) => {
    //         data += chunk
    //     });
    //     res.on('end', () => {
    //         console.log(data)
    //     });
    // })
}