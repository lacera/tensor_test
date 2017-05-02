import $ from 'jquery';
import {groupingMethod} from './groupingMethod';

export function createCharactersList(data, groupingBy) {
    var charactersListArr = [];
    var mainDiv = $('<div/>', { class: 'main-div' });
    var mainUl = $('<ul/>', { class: 'main-ul' }).appendTo(mainDiv);

    groupingBy = groupingBy || 'firstName';

    groupingMethod(data, groupingBy);

    for (let i = 0, enclosedUlNum = 0, firstChar = data[i][groupingBy].charAt(0); i < data.length; i++) {
        if (firstChar !== data[i][groupingBy].charAt(0)) {
            firstChar = data[i][groupingBy].charAt(0);
            enclosedUlNum++;
        }

        if (!charactersListArr[enclosedUlNum]) {
            charactersListArr[enclosedUlNum] = {
                label: firstChar,
                element: $('<li/>', {
                        class:  'main-li'
                    })
                    .append('<div class="enclosed-ul__header">' + firstChar + '</div>')
                    .append('<ul class="enclosed-ul"></ul>'),
                liArray: []
            };

            $(charactersListArr[enclosedUlNum].element).appendTo(mainUl);
        }

        charactersListArr[enclosedUlNum].liArray.push({
            firstName: data[i].firstName,
            secondName: data[i].secondName,
            element: $('<li/>', {
                        class:  'enclosed-li',
                        html: 	innerHTMLCharacter(groupingBy, data[i])
                    })
        });

        $('ul', charactersListArr[enclosedUlNum].element)
            .append(charactersListArr[enclosedUlNum].liArray[charactersListArr[enclosedUlNum].liArray.length - 1].element);
    }

    console.log('сырые данные: ');
    console.log(data);
    console.log('обработанные: ');
    console.log(charactersListArr);

    return mainDiv;
}

function innerHTMLCharacter(groupingBy, obj) {
    if (groupingBy === 'secondName') {
        return obj.firstName + ' ' + '<b>' + obj.secondName + '</b>';
    }

    return '<b>' + obj.firstName + '</b> ' +  obj.secondName;
}