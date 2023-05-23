import { getServerData } from './fetch-module.js'
import { mainNavMenu } from './nav-module.js'


async function getPostsWithCommentsAndUser() {
    const dataForm = 'posts?_expand=user&_embed=comments';
    const posts = await getServerData(dataForm);
    doViewPort(posts)
};

function doViewPort(posts) {
    const containerElement = document.querySelector('.container');
    const UlElement = document.createElement('ul');
    UlElement.classList.add('posts-list');
    containerElement.append(UlElement)
    posts.forEach(post => {
        const liElement = document.createElement('li');
        const aPostElelemnt = document.createElement('a');
        const aAuthorElelemnt = document.createElement('a');
        aPostElelemnt.textContent = `${post.title} (${post.comments.length})`;
        aPostElelemnt.href = `./post.html?post_id=${post.id}`;
        aAuthorElelemnt.textContent = post.user.name;
        aAuthorElelemnt.href = `./user.html?user_id=${post.user.id}`;
        liElement.append(aPostElelemnt, ' ', aAuthorElelemnt)
        UlElement.append(liElement)
    })
}

getPostsWithCommentsAndUser()
mainNavMenu()