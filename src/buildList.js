import {GroupingMethod} from './groupingMethod';
import * as createElement from './createListElements';

export function buildList(data, groupingBy) {
    var mainDiv = createElement.MainDiv(),
        mainUl = createElement.MainUl(),
        charactersListArr = [];
    var groupingHelper = new GroupingMethod(data, groupingBy);

    groupingHelper.sorting();

    // формируем массив объектов-узлов списка
    for (let i = 0, enclosedUlNum = 0; i < data.length; i++) {
        if (groupingHelper.setHeader(data[i])) {
            enclosedUlNum++;
        }

        if (!charactersListArr[enclosedUlNum]) {
            charactersListArr[enclosedUlNum] = {
                label: groupingHelper.tempHdrLbl,
                element: createElement.MainLi(groupingHelper.tempHdrLbl),
                liArray: []
            };
        }

        charactersListArr[enclosedUlNum].liArray.push({
            firstName: data[i].firstName,
            secondName: data[i].secondName,
            element: createElement.EnclosedLi(groupingHelper.method, data[i])
        });
    }

    return [mainDiv, mainUl, charactersListArr];
}