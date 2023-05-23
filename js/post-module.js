import { getServerData } from "./fetch-module.js";

async function getPost() {
    const postId = location.search.slice(1);
    const dataForm = `posts/${postId}/?_expand=user&_embed=comments`;
    const post = await getServerData(dataForm);
    doViewPort(post)
}

function doViewPort(post) {
    const containerElement = document.querySelector('.container');
    const postContentElement = document.createElement('div');
    containerElement.append(postContentElement)
    postContentElement.innerHTML = `<h1>${post.title}</h1>
                                    <h2><a href='./user.html?${post.user.id}'>${post.user.name}</a></h2>
                                    <p>${post.body}</p>`;
    post.comments.forEach(comment => {
        const commentElement = document.createElement('div');
        commentElement.innerHTML = `<h3>${comment.name}</h3>
                                    <p>${comment.body}</p>
                                    <a href='mailto:${comment.email}'>${comment.email}</a>`;
        postContentElement.after(commentElement)
    })
    const linkUserPosts = document.createElement('a');
    linkUserPosts.textContent = `${post.user.name} all posts`;
    linkUserPosts.href = './posts.html';
    containerElement.append(linkUserPosts)
}

getPost()