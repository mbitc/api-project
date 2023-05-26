import { getServerData } from './fetch-module.js'
import { doStrFirstCapitalize} from './function-module.js'

async function getAlbumWithPhotosAndUser() {
    const albumId = new URLSearchParams(location.search).get('album_id');
    const dataForm = `albums/${albumId}?_expand=user&_embed=photos`;
    const serverData = await getServerData(dataForm);
    const album = serverData.data;
    doViewPort(album)
}

function doViewPort(album) {
    const containerElement = document.querySelector('.container');
    const contentElelement = document.createElement('div');
    contentElelement.innerHTML = `<h2>${doStrFirstCapitalize(album.title)}</h2>
                                    <h3>${album.user.name}</h3>`;
    containerElement.append(contentElelement)
    
    const galleryElelement = document.querySelector('#gallery');
    galleryElelement.classList.add('pswp-gallery')
    album.photos.forEach(photo => {
        const linkPhotoElement = document.createElement('a');
        linkPhotoElement.dataset.pswpWidth = '600'
        linkPhotoElement.dataset.pswpHeight = '600'
        linkPhotoElement.href = photo.url;
        linkPhotoElement.target = '_blank';
        const imgPhotoElement = document.createElement('img');
        imgPhotoElement.src = photo.thumbnailUrl;
        imgPhotoElement.alt = photo.title;
        linkPhotoElement.append(imgPhotoElement)
        galleryElelement.append(linkPhotoElement)
    })
}

getAlbumWithPhotosAndUser()