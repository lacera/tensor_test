import $ from 'jquery';

export function insertListToDOM(listElsArray) {
    for (let i = 0; i < listElsArray.list.length; i++) {
        listElsArray.list[i].element.appendTo(listElsArray.mainUl);
        listElsArray.list[i].liArray.forEach(function (item) {
            $('ul', listElsArray.list[i].element).append(item.element);
        });
    }

    listElsArray.secondDiv.append(listElsArray.mainUl);
    listElsArray.mainAppDiv.append(listElsArray.secondDiv);
}