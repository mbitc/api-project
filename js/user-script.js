import { getServerData } from "./fetch-module.js";

async function getUser() {
    const userId = new URLSearchParams(location.search).get('user_id');
    const dataForm = `users/${userId}/?_embed=posts&_embed=albums`;
    const user = await getServerData(dataForm);
    doViewPort(user)
}

function doViewPort(user) {
    const containerElement = document.querySelector('.container');
    const ulElement = document.createElement('ul');
    ulElement.classList.add('list');
    const nameLiElement = document.createElement('li');
    nameLiElement.textContent = user.name;
    const nickNameLiElement = document.createElement('li');
    nickNameLiElement.textContent = user.username;
    const emailLiElement = document.createElement('li');
    const  emailLinkLiElement = document.createElement('a');
    emailLinkLiElement.href = `mailto:${user.email}`;
    emailLinkLiElement.textContent = user.email;
    emailLiElement.append(emailLinkLiElement)
    const phoneLiElement = document.createElement('li');
    const  phoneLinkLiElement = document.createElement('a');
    phoneLinkLiElement.href = `tel:${user.phone}`;
    phoneLinkLiElement.textContent = user.phone;
    phoneLiElement.append(phoneLinkLiElement)
    const webLiElement = document.createElement('li');
    const  webLinkLiElement = document.createElement('a');
    webLinkLiElement.href = `http://${user.website}`;
    webLinkLiElement.target = '_blank';
    webLinkLiElement.textContent = user.website;
    ulElement.append(nameLiElement, nickNameLiElement, emailLiElement, phoneLiElement, webLiElement)
    const addressUlElement = document.createElement('ul');
    addressUlElement.classList.add('list');
    const addressLinkElement = document.createElement('a');
    addressLinkElement.classList.add('style');
    const {city, geo, street, suite, zipcode} = user.address;
    addressLinkElement.href = `https://www.google.com/maps/search/?api=1&query=${geo.lat},${geo.lng}`;
    addressLinkElement.target = '_blank';
    const suiteLiElement = document.createElement('li');
    suiteLiElement.textContent = suite;
    const streetLiElement = document.createElement('li');
    streetLiElement.textContent = street;
    const zipLiElement = document.createElement('li');
    zipLiElement.textContent = zipcode;
    const cityLiElement = document.createElement('li');
    cityLiElement.textContent = city;
    addressLinkElement.append(addressUlElement)
    addressUlElement.append(suiteLiElement, streetLiElement, zipLiElement, cityLiElement)
    webLiElement.append(webLinkLiElement)
    const companyUlElement = document.createElement('ul');
    companyUlElement.classList.add('list');
    const companyNameLiElement = document.createElement('li');
    companyNameLiElement.textContent = user.company.name;
    companyUlElement.append(companyNameLiElement)
    const bs = user.company.bs.split(' ');
    const bsUlElement = document.createElement('ul');
    bs.forEach(bstype => {
        const bstypeLiElement = document.createElement('li');
        bstypeLiElement.textContent = bstype;
        bsUlElement.append(bstypeLiElement)
    })
    const catchPhrase = user.company.catchPhrase.split(' ');
    const catchPhraseUlElement = document.createElement('ul');
    catchPhrase.forEach(catchPhraseType => {
        const catchPhraseTypeLiElement = document.createElement('li');
        catchPhraseTypeLiElement.textContent = catchPhraseType;
        catchPhraseUlElement.append(catchPhraseTypeLiElement)
    })
    const posts = user.posts;
    const postsUlElement = document.createElement('ul');
    postsUlElement.classList.add('list');
    posts.forEach(post => {
        const postLiElement = document.createElement('li');
        const postLinkElement = document.createElement('a');
        postLiElement.append(postLinkElement)
        postLinkElement.textContent = post.title;
        postLinkElement.href = `./post.html?post_id=${post.id}`;
        postsUlElement.append(postLiElement)
    })
    const albums = user.albums;
    const albumsUlElement = document.createElement('ul');
    albumsUlElement.classList.add('list');
    albums.forEach(album => {
        const albumLiElement = document.createElement('li');
        const albumLinkElement = document.createElement('a');
        albumLiElement.append(albumLinkElement)
        albumLinkElement.textContent = album.title;
        albumLinkElement.href = './album.html?album_id=' + album.id;
        albumsUlElement.append(albumLiElement)
    })
    containerElement.append(ulElement, addressLinkElement, companyUlElement, bsUlElement, catchPhraseUlElement, postsUlElement, albumsUlElement)
    const addressTitleH3Element = document.createElement('h3');
    addressTitleH3Element.textContent = 'Address';
    addressLinkElement.before(addressTitleH3Element)
    const companyTitleH3Element = document.createElement('h3');
    companyTitleH3Element.textContent = 'Company';
    companyUlElement.before(companyTitleH3Element)
    const bsTitleH4Element = document.createElement('h4');
    bsTitleH4Element.textContent = 'Business Style';
    bsUlElement.before(bsTitleH4Element)
    const catchPhraseTitleH4Element = document.createElement('h4');
    catchPhraseTitleH4Element.textContent = 'Catch Phrase';
    catchPhraseUlElement.before(catchPhraseTitleH4Element)
}

getUser()