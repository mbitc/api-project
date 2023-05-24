import { getServerData } from "./fetch-module.js";

const searchQuery = new URLSearchParams(location.search);
const query = searchQuery.get('query');
const searchBy = searchQuery.get('search');

console.log(query)
console.log(searchBy)

const dataForm = `${searchBy}?q=${query}`;
const apiData = await getServerData(dataForm);

console.log(apiData)