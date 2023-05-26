import { getServerData } from './fetch-module.js';

export async function getServerDataAndPagin(dataForm, pageId) {
    let pageStart = 0;
    let pageLimit = 15;

    if (pageId) {
        pageStart += (pageLimit * (pageId - 1))
    }
    
    dataForm += `&_start=${pageStart}&_limit=${pageLimit}`;
    const serverData = await getServerData(dataForm);
    const items = serverData[0];
    const itemsCounts = serverData[1];

    const pagePerItems = itemsCounts / pageLimit;
    const floorPagePerItems = Math.floor(pagePerItems);
    let numOfPages;

    if (pagePerItems > floorPagePerItems) {
        numOfPages = floorPagePerItems + 1;
    } else {
        numOfPages = floorPagePerItems;
    }

    const pagesArray = [];
    let i = 1;

    do {
        pagesArray.push(i)
        i++
    } while (i - 1 < numOfPages)

    return [items, pagesArray]
}

export function paginElementFn(pagesArray, userId, pageId) {
    const paginElement = document.createElement('div');
    paginElement.classList.add('pagin-list')
    pagesArray.forEach(page => {
        const linkPageElement = document.createElement('a');
        linkPageElement.classList.add('style');
        if (page == pageId || (!pageId && page == 1)) {
            linkPageElement.classList.add('active');
        } else {
            if (userId) {
                linkPageElement.href = `./posts.html?user_id=${userId}&page_id=${page}`;
            } else {
                linkPageElement.href = `./posts.html?page_id=${page}`;
            }
        }
        linkPageElement.textContent = ` ${page} `
        paginElement.append(linkPageElement)
    })
    if (pagesArray.length > 1) {
        return paginElement;
    }
}