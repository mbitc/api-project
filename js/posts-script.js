import { getServerDataAndPagin, paginElementFn } from './pagin-module.js'
import { mainNavMenu } from './nav-module.js'
import { doStrFirstCapitalize } from './function-module.js'


async function getPostsWithCommentsAndUser() {
    const urldata = new URLSearchParams(location.search);
    const userId = urldata.get('user_id');
    const pageId = urldata.get('page_id');

    let dataForm = 'posts?_expand=user&_embed=comments';
    if (userId) {
        dataForm = `posts?_expand=user&_embed=comments&userId=${userId}`
    }
    const dataFromSDAP = await getServerDataAndPagin(dataForm, pageId);
    const posts = dataFromSDAP.items;
    const pagesArray = dataFromSDAP.pagesArray;
    doViewPort(posts, pagesArray, userId, pageId)
}

function doViewPort(posts, pagesArray, userId, pageId) {
    const containerElement = document.querySelector('.container');
    const UlElement = document.createElement('ul');
    UlElement.classList.add('list');
    containerElement.append(UlElement)
    posts.forEach(post => {
        const liElement = document.createElement('li');
        const aPostElelemnt = document.createElement('a');
        const aAuthorElelemnt = document.createElement('a');
        aPostElelemnt.textContent = `${doStrFirstCapitalize(post.title)} (${post.comments.length})`;
        aPostElelemnt.href = `./post.html?post_id=${post.id}`;
        aAuthorElelemnt.textContent = post.user.name;
        aAuthorElelemnt.href = `./user.html?user_id=${post.user.id}`;
        liElement.append(aPostElelemnt, ' ', aAuthorElelemnt)
        UlElement.append(liElement)
    })

    const paginElement = paginElementFn(pagesArray, userId, pageId);
    if (paginElement) {
        containerElement.append(paginElement)
    }
}

getPostsWithCommentsAndUser()
mainNavMenu()