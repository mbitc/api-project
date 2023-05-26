import { getServerData } from "./fetch-module.js";
import { doStrFirstCapitalize} from './function-module.js'

async function getPost() {
    const postId = new URLSearchParams(location.search).get('post_id');
    const dataForm = `posts/${postId}/?_expand=user&_embed=comments`;
    const serverData = await getServerData(dataForm);
    const post = serverData.data;
    doViewPort(post)
}

function doViewPort(post) {
    const containerElement = document.querySelector('.container');
    const postContentElement = document.createElement('div');
    const commentsElement = document.createElement('div');
    commentsElement.classList.add('comments-list');
    containerElement.append(postContentElement, commentsElement)
    postContentElement.innerHTML = `<h1>${doStrFirstCapitalize(post.title)}</h1>
                                    <h2><a class='style' href='./user.html?user_id=${post.user.id}'>${post.user.name}</a></h2>
                                    <p>${doStrFirstCapitalize(post.body)}</p>`;
    post.comments.forEach(comment => {
        const commentElement = document.createElement('div');
        commentElement.classList.add('comment')
        commentElement.innerHTML = `<h3>${doStrFirstCapitalize(comment.name)}</h3>
                                    <p>${doStrFirstCapitalize(comment.body)}</p>
                                    <a class='style' href='mailto:${comment.email}'>${comment.email}</a>`;
        commentsElement.append(commentElement)
    })
    const linkUserPosts = document.createElement('a');
    linkUserPosts.classList.add('style', 'top-margin');
    linkUserPosts.textContent = `${post.user.name} all posts`;
    linkUserPosts.href = './posts.html?user_id=' + post.user.id;
    containerElement.append(linkUserPosts)
}

getPost()