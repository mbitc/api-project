import { getServerData } from './fetch-module.js'
import { mainNavMenu } from './nav-module.js'

async function getUsersWithPosts() {
    const dataForm = 'users?_embed=posts';
    const users = await getServerData(dataForm);
    doViewPort(users)
}

function doViewPort(users) {
    const containerElement = document.querySelector('.container');
    const UlElement = document.createElement('ul');
    UlElement.classList.add('users-list');
    containerElement.append(UlElement)
    users.forEach(user => {
        const liElement = document.createElement('li');
        const aElelemnt = document.createElement('a');
        aElelemnt.textContent = `${user.name} (${user.posts.length})`;
        aElelemnt.href = `./user.html?user_id=${user.id}`;
        liElement.append(aElelemnt)
        UlElement.append(liElement)
    })
}

getUsersWithPosts()
mainNavMenu()