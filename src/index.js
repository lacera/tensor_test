import {getDataCharacters} from './getDataCharacters';
import {createCharactersList} from './createCharactersList';
import {setFloatingHeader} from './setFloatingHeader';

import $ from 'jquery';

require('./css/main.ul.css');
require('./css/enclosed.ul.css');
require('./css/app.characters.list.css');

$(document).ready(function() {
    var chrsListsInDOM = $('.app-characters-list');
    chrsListsInDOM.each(function(index, element) {
        getDataCharacters($(element).data('src'))
            .catch(function(e) {
                console.log(e);
                // здесь вывод в DOM сообщения, что данные не получены
                $(element).text('Данные не получены. Попробуйте еще раз');
            })
            .then(function(result) {
                var groupingBy = 'firstName';

                console.time('строительство списка');
                $(element).append(createCharactersList(result, groupingBy));
                setFloatingHeader();
                console.timeEnd('строительство списка');
            });
    })
});