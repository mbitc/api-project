export function doStrFirstCapitalize(str) {
    const capitalized = str[0].toUpperCase() + str.slice(1);
    return capitalized;
}

export function doStrFirstLowerCase(str) {
    const lowerCased = str[0].toLowerCase() + str.slice(1);
    return lowerCased;
}

export function doStrCutLastSymbol (str) {
    const strArry = str.split('')
    strArry.splice(-1, 1)
    return strArry.join('');
}