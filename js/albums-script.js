import { getServerData } from './fetch-module.js'
import { mainNavMenu } from './nav-module.js'
import { doStrFirstCapitalize} from './function-module.js'

async function getAlbumsWithPhotosAndUser() {
    const dataForm = 'albums?_expand=user&_embed=photos';
    const albums = await getServerData(dataForm);
    doViewPort(albums)
}

function doViewPort(albums) {
    const containerElement = document.querySelector('.container');
    const UlElement = document.createElement('ul');
    UlElement.classList.add('list', 'album-list');
    containerElement.append(UlElement)
    albums.forEach(album => {
        const liElement = document.createElement('li');
        const divElement = document.createElement('div');
        divElement.classList.add('album-content')
        const aAlbumElement = document.createElement('a');
        const aAuthorElement = document.createElement('a');
        const aImgElement = document.createElement('a');
        const photoElement = document.createElement('img');
        const randomIndex = Math.floor(Math.random() * album.photos.length)
        photoElement.src = album.photos[randomIndex].thumbnailUrl;
        photoElement.alt = album.photos[randomIndex].title;
        aAlbumElement.textContent = `${doStrFirstCapitalize(album.title)} (${album.photos.length})`;
        aAlbumElement.href = './album.html?album_id=' + album.id;
        aAuthorElement.textContent = album.user.name;
        aAuthorElement.href = `./user.html?user_id=${album.user.id}`;
        aImgElement.href = './album.html?album_id=' + album.id;
        liElement.append(divElement)
        aImgElement.append(photoElement)
        divElement.append(aAlbumElement, ' ', aAuthorElement, aImgElement)
        UlElement.append(liElement)
    })
}

getAlbumsWithPhotosAndUser()
mainNavMenu()