async function getServerData(dataForm) {
    const res = await fetch(`https://jsonplaceholder.typicode.com/${dataForm}`);
    const data = await res.json();
    return data;
}

async function getAlbumsWithPhotosAndUser() {
    const dataForm = 'albums?_expand=user&_embed=photos';
    const albums = await getServerData(dataForm);
    return albums;
};

(async function() {
    const containerElement = document.querySelector('.container');
    const UlElement = document.createElement('ul');
    containerElement.append(UlElement)
    const albumsArr = await getAlbumsWithPhotosAndUser();
    albumsArr.forEach(album => {
        const liElement = document.createElement('li');
        const aAlbumElelemnt = document.createElement('a');
        const aAuthorElelemnt = document.createElement('a');
        const photoElement = document.createElement('img');
        photoElement.src = album.photos[0].url;
        aAlbumElelemnt.textContent = `${album.title} (${album.photos.length})`;
        aAlbumElelemnt.href = './album.html';
        aAuthorElelemnt.textContent = album.user.name;
        aAuthorElelemnt.href = './user.html';
        liElement.append(aAlbumElelemnt, ' ', aAuthorElelemnt, photoElement)
        UlElement.append(liElement)
    })
})()