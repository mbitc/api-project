import { getServerData } from './fetch-module.js';
import { doStrFirstCapitalize, doStrCutLastSymbol } from './function-module.js'

let searchBy;
const navElement = document.querySelector('#menu');
const linkBackElement = document.createElement('a');
const containerElement = document.querySelector('.container');

function getSearchQuery() {
    const searchQuery = new URLSearchParams(location.search);
    const query = searchQuery.get('query');
    searchBy = searchQuery.get('search');

    searchFn(query, searchBy)
}

async function searchFn(query, searchBy) {
    const dataForm = `${searchBy}?q=${query}`;
    const serverData = await getServerData(dataForm);
    const apiData = serverData[0];
    searchNav(searchBy)
    doViewPort(apiData, searchBy)
}

function searchNav(searchBy) {
    linkBackElement.href = `./${searchBy}.html`;
    linkBackElement.textContent = `Back to ${doStrFirstCapitalize(searchBy)}`;
    linkBackElement.classList.add('style');
    navElement.prepend(linkBackElement)
}

function localSearch(searchBy) {
    const searchFormElement = document.querySelector('#search-form');
    searchFormElement.addEventListener('submit', event => {
        event.preventDefault();

        const query = event.target.query.value;
        searchFn(query, searchBy)
    })
}

function doViewPort(apiData, searchBy) {
    containerElement.innerHTML = '';
    const ulElement = document.createElement('ul');
    ulElement.classList.add('list')
    containerElement.append(ulElement)
    const pathElement = doStrCutLastSymbol(searchBy);
    if (apiData.length > 0) {
        apiData.forEach(element => {
            const linkElement = document.createElement('a');
            const liElement = document.createElement('li');
            linkElement.href = `./${pathElement}.html?${pathElement}_id=${element.id}`;
            if (element.title) {
                linkElement.textContent = element.title;
            } else {
                linkElement.textContent = element.name;
            }
            liElement.append(linkElement)
            ulElement.append(liElement)
            console.log(element)
        })
    } else {
        const noSearchResualtElement = document.createElement('h2');
        noSearchResualtElement.textContent = 'No Search Resualt...'
        containerElement.append(noSearchResualtElement)
    }
}

getSearchQuery()
localSearch(searchBy)



