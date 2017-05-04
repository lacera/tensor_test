import {getData} from './getData';
import {buildList} from './buildList';
import {setFloatingHeader} from './setFloatingHeader';
import {insertListToDOM} from './insertListToDOM';
import {createBadListStub} from './createBadListStub';

import $ from 'jquery';

require('./css/main.ul.css');
require('./css/enclosed.ul.css');
require('./css/app.characters.list.css');

$(document).ready(function() {
    var charactersListMainComponentsInDOM = $('.app-characters-list'),
        appCharacterLists = [];

    charactersListMainComponentsInDOM.each(function(index, element) {
        var url = $(element).data('src') || null;

        getData(url)
            .catch(function(e) {
                console.log(e);
                createBadListStub(element);
            })
            .then(function(result) {
                if (!(result instanceof Array)) return;

                var groupingBy = $(element).data('grouping-template'),
                    tempArr = buildList(result, groupingBy),
                    thisAppChLst;

                appCharacterLists.push({
                    mainAppDiv: $(element),
                    secondDiv: tempArr[0],
                    mainUl: tempArr[1],
                    list: tempArr[2]
                });

                thisAppChLst = appCharacterLists[appCharacterLists.length - 1];
                insertListToDOM(thisAppChLst);
                setFloatingHeader(thisAppChLst);
            });
    });
    console.log(appCharacterLists);
});