async function getServerData(dataForm) {
    const res = await fetch(`https://jsonplaceholder.typicode.com/${dataForm}`);
    const data = await res.json();
    return data;
}

async function getPostsWithCommentsAndUser() {
    const dataForm = 'posts?_expand=user&_embed=comments';
    const posts = await getServerData(dataForm);
    return posts;
};

(async function() {
    const containerElement = document.querySelector('.container');
    const UlElement = document.createElement('ul');
    containerElement.append(UlElement)
    const postsArr = await getPostsWithCommentsAndUser();
    postsArr.forEach(post => {
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
})()