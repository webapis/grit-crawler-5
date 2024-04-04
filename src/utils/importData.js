import { createRequire } from 'module';
import { uploadCollection } from './uploadCollection.js'
import mapPrice from './mapPrice.js';

const require = createRequire(import.meta.url);
require("dotenv").config();


debugger
const data = require('../../data.json')
debugger

const marka = process.env.marka

const dataToUpload = removeDuplicatesAndCollectTitles(data, 'link').map(m => { return { ...m, marka } })
debugger

if (data.length > 0) {
  await uploadCollection({ fileName: `${marka}`, data: dataToUpload, gender: 'sponsor', marka })
  console.log('uploaded data length---',dataToUpload.length)
} else {
  throw 'No Items found to upload'
}




function removeDuplicatesAndCollectTitles(array, key) {
  const uniqueObjects = [];
  const duplicateTitles = {};

  array.forEach((item) => {
    const index = uniqueObjects.findIndex((obj) => obj[key] === item[key]);

    if (index === -1) {
      uniqueObjects.push(item);
    } else {
      if (!duplicateTitles[item[key]]) {
        duplicateTitles[item[key]] = [uniqueObjects[index].pageTitle];
      }

      duplicateTitles[item[key]].push(item.pageTitle);
    }
  });

  return uniqueObjects.map((item) => {
    const titles = duplicateTitles[item[key]];
    return titles ? { ...item, duplicateTitles: titles } : item;
  });
}