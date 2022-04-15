import axios from 'axios'
import https from 'https'
import { getKeyValue, TOKEN_DICTIONARY } from './storage.service.js';

const getWeather = async(city) => {
  const token = await getKeyValue(TOKEN_DICTIONARY.token)
  if(!token){
    throw new Error('Не задан ключ API, задайте его, выполнив команду -t [API_KEY]')
  }

  const url = new URL('https://api.openweathermap.org/data/2.5/weather');
  url.searchParams.append('q', city);
  url.searchParams.append('appid', token);
  url.searchParams.append('lang', 'ru');
  url.searchParams.append('units', 'metric');

  https.get(url, (res) => {
    let response = '';
    res.on('data', chunk => {
      response += chunk;
    })

    res.on('end', () => {
      console.log(response)
    })

    res.on('error', error => {

    })
  })
}

export {getWeather}