async function mainNavMenu() {
    const res = await fetch('../menu.json');
    const menuData = await res.json();
    const navElement = document.querySelector('#menu');
    const menuElelemnt = document.createElement('ul');
    navElement.append(menuElelemnt)
    for (const page in menuData) {
        const pageElement = document.createElement('li');
        const linkElement = document.createElement('a');
        linkElement.textContent = page;
        linkElement.href = menuData[page];
        pageElement.append(linkElement)
        menuElelemnt.append(pageElement)
        const path = window.location;
        const pathName = path.pathname.slice(1);
        if (menuData[page].includes(pathName) && pathName !== '') {
            pageElement.classList.add('active')
        } else if (menuData[page] === './index.html' && pathName === '') {
            pageElement.classList.add('active')
        }
    }
};

mainNavMenu()

export {mainNavMenu};
