import { getServerData } from "./fetch-module.js";

async function getUser() {
    const dataForm = 'users/1';
    const user = await getServerData(dataForm);
    doViewPort(user)
    console.log(user)
}

function doViewPort(user) {
    const containerElement = document.querySelector('.container');
    const ulElement = document.createElement('ul');
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
    const addressUlElement = document.createElement('ul');
    const addressLinkElement = document.createElement('a');
    const {city, geo, street, suite, zipcode} = user.address;
    // addressLinkElement.href = ``;
    // addressLinkElement.target = '_blank';
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
    const companyNameLiElement = document.createElement('li');
    companyNameLiElement.textContent = user.company.name;
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
    companyUlElement.append(companyNameLiElement, bsUlElement, catchPhraseUlElement)
    ulElement.append(nameLiElement, nickNameLiElement, emailLiElement, phoneLiElement, webLiElement)
    containerElement.append(ulElement, addressLinkElement, companyUlElement)
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