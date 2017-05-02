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
        var url = $(element).data('src');

        getDataCharacters(url)
            .catch(function(e) {
                console.log(e);
                // здесь вывод в DOM сообщения, что данные не получены
                $(element).addClass('bad-data_style');
                $(element).text('Данные для списка не получены. Проверьте, правильно ли указан путь к данным, и попробуйте еще раз');
            })
            .then(function(result) {
                var groupingBy = $(element).data('grouping-template');

                console.time('строительство списка');
                $(element).append(createCharactersList(result, groupingBy));
                setFloatingHeader(element);
                console.timeEnd('строительство списка');
            });
    })
});