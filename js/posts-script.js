import { getServerData } from './fetch-module.js'
import { mainNavMenu } from './script.js'


async function getPostsWithCommentsAndUser() {
    const dataForm = 'posts?_expand=user&_embed=comments';
    const posts = await getServerData(dataForm);
    doViewPort(posts)
};

function doViewPort(posts) {
    const containerElement = document.querySelector('.container');
    const UlElement = document.createElement('ul');
    containerElement.append(UlElement)
    posts.forEach(post => {
        const liElement = document.createElement('li');
        const aPostElelemnt = document.createElement('a');
        const aAuthorElelemnt = document.createElement('a');
        aPostElelemnt.textContent = `${post.title} (${post.comments.length})`;
        aPostElelemnt.href = './post.html';
        aAuthorElelemnt.textContent = post.user.name;
        aAuthorElelemnt.href = './user.html';
        liElement.append(aPostElelemnt, ' ', aAuthorElelemnt)
        UlElement.append(liElement)
    })
}

getPostsWithCommentsAndUser()