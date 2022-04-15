import fs from 'fs'

const file_path = './weather.json';

const TOKEN_DICTIONARY = {
  token: 'token',
  city: 'city'
}

const saveKeyValue = async (key, value) => {
  let data = {}

  if (await ifExists(file_path)) {
    const file = await fs.promises.readFile(file_path)
    data = JSON.parse(file);
  }

  data[key] = value;

  await fs.promises.writeFile(file_path, JSON.stringify(data, null, 4), 'utf8')

}

const getKeyValue = async (key) => {
  if (await ifExists(file_path)) {
    const file = await fs.promises.readFile(file_path)
    const data = JSON.parse(file);
    return data[key];
  }
  return undefined;
}

const ifExists = async (path) => {
  try {
    await fs.promises.stat(path)
    return true
  } catch (e) {
    return false
  }
}

export { saveKeyValue, getKeyValue, TOKEN_DICTIONARY }