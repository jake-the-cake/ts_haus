export const formatTitle = (text) => {
    const splitText = text.split(' ');
    splitText.forEach((word, i) => {
        splitText[i] = `${word[0].toUpperCase()}${word.slice(1).toLowerCase()}`;
    });
    return splitText.join(' ');
};
