export const parseCategoryList = (list) => {
    const splitList = list.split(',');
    splitList.forEach((item, i) => {
        splitList[i] = item.trim();
    });
    return splitList;
};
