async function getServerData(dataForm) {
    const res = await fetch(`https://jsonplaceholder.typicode.com/${dataForm}`);
    const data = await res.json();
    return data;
}

async function getUsersWithPosts() {
    const dataForm = 'users?_embed=posts';
    const users = await getServerData(dataForm);
    return users;
};


(async function() {
    const containerElement = document.querySelector('.container');
    const UlElement = document.createElement('ul');
    containerElement.append(UlElement)
    const usersArr = await getUsersWithPosts();
    usersArr.forEach(user => {
        const liElement = document.createElement('li');
        const aElelemnt = document.createElement('a');
        aElelemnt.textContent = `${user.name} (${user.posts.length})`;
        aElelemnt.href = './user.html';
        liElement.append(aElelemnt)
        UlElement.append(liElement)
    })
})()