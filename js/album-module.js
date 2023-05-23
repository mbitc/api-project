import { getServerData } from './fetch-module.js'
import PhotoSwipeLightbox from '../util/photoswipe-lightbox.esm.js'

async function getAlbumWithPhotosAndUser() {
    const dataForm = 'albums/1?_expand=user&_embed=photos';
    const album = await getServerData(dataForm);
    doViewPort(album)
}

function doViewPort(album) {
    const containerElement = document.querySelector('.container');
    console.log(album)
    console.log(album.title)
    console.log(album.user.name)

    
    const galleryElelement = document.createElement('div');
    galleryElelement.setAttribute('id', 'gallery')
    galleryElelement.classList.add('pswp-gallery')
    containerElement.append(galleryElelement)
    album.photos.forEach(photo => {
        const linkPhotoElement = document.createElement('a');
        linkPhotoElement.dataset.pswpWidth = '600'
        linkPhotoElement.dataset.pswpHeight = '600'
        linkPhotoElement.href = photo.url;
        linkPhotoElement.target = '_blank';
        const imgPhotoElement = document.createElement('img');
        imgPhotoElement.src = photo.thumbnailUrl;
        linkPhotoElement.append(imgPhotoElement)
        galleryElelement.append(linkPhotoElement)
        
        const lightbox = new PhotoSwipeLightbox({
            gallery: galleryElelement,
            children: linkPhotoElement,
            pswpModule: () => import('../util/photoswipe.esm.js')
          });
        
        lightbox.init();
    })
}

getAlbumWithPhotosAndUser()