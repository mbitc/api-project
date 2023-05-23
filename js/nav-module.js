async function mainNavMenu() {
    const res = await fetch('./menu.json');
    const menuData = await res.json();
    const navElement = document.querySelector('#menu');
    const menuElelemnt = document.createElement('ul');
    menuElelemnt.classList.add('menu-list');
    navElement.append(menuElelemnt)
    for (const page in menuData) {
        const url = menuData[page];
        const pageElement = document.createElement('li');
        const linkElement = document.createElement('a');
        linkElement.textContent = page;
        linkElement.href = url;
        pageElement.append(linkElement)
        menuElelemnt.append(pageElement)
        const path = window.location;
        const pathName = path.pathname.slice(1);
        if (url.includes(pathName) && pathName !== '') {
            linkElement.classList.add('active')
        } else if (url === './index.html' && pathName === '') {
            linkElement.classList.add('active')
        }
    }
};

export {mainNavMenu};
