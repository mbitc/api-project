import { getServerData } from './fetch-module.js'
import { mainNavMenu } from './nav-module.js'

async function getAlbumsWithPhotosAndUser() {
    const dataForm = 'albums?_expand=user&_embed=photos';
    const albums = await getServerData(dataForm);
    doViewPort(albums)
}

function doViewPort(albums) {
    const containerElement = document.querySelector('.container');
    const UlElement = document.createElement('ul');
    containerElement.append(UlElement)
    albums.forEach(album => {
        const liElement = document.createElement('li');
        const aAlbumElelemnt = document.createElement('a');
        const aAuthorElelemnt = document.createElement('a');
        const photoElement = document.createElement('img');
        photoElement.src = album.photos[0].url;
        aAlbumElelemnt.textContent = `${album.title} (${album.photos.length})`;
        aAlbumElelemnt.href = './album.html';
        aAuthorElelemnt.textContent = album.user.name;
        aAuthorElelemnt.href = `./user.html?user_id=${album.user.id}`;
        liElement.append(aAlbumElelemnt, ' ', aAuthorElelemnt, photoElement)
        UlElement.append(liElement)
    })
}

getAlbumsWithPhotosAndUser()
mainNavMenu()