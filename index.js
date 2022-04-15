#!/usr/bin/env node

import {getArgs} from './helpers/args.js'
import { getWeather } from './services/api.service.js'
import { printHelp, printSuccess, printError } from './services/log.service.js'
import { saveKeyValue, TOKEN_DICTIONARY } from './services/storage.service.js'

const saveToken = async(token) => {
  if(!token.length){
    printError('Не передан токен')
    return;
  }
  try {
    await saveKeyValue(TOKEN_DICTIONARY.token, token)
    printSuccess('Токен сохранен')
  } catch (error) {
    printError(error.message)
  }
  
}

const getForecast = async(city) => {
  try {
    await getWeather(city)
  } catch (error) {
    if(error?.respose?.status === 404){
      printError('Неверно указан город')
    }else if(error.respose.status === 400){
      printError('Неверно указан токен')
    }else{
      printError(error.message)
    }
  }
  
}

const initCLI = () => {
  const args = getArgs(process.argv)
  
  if(args.h){
    //help
    printHelp()
  }
  if(args.c){
    //city
    getForecast(args.c)
  }
  if(args.t){
    //token
    return saveToken(args.t)
  }
}

initCLI()