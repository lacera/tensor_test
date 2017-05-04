import $ from 'jquery';

export function createBadListStub(element) {
    $(element).addClass('bad-data_style');
    $(element).text('Данные для списка не получены. Проверьте, правильно ли указан путь к данным, и попробуйте еще раз');
}