import $ from 'jquery';
import {innerHTMLCharacter} from './innerHTMLCharacter';

function MainDiv() {
    return $('<div/>', { class: 'main-div' })
}

function MainUl() {
    return $('<ul/>', { class: 'main-ul' })
}

function MainLi(headerText) {
    return $('<li/>', { class: 'main-li' })
            .append($('<div/>', {
                class: 'enclosed-ul__header',
                text: headerText
            }))
            .append($('<ul/>', { class: 'enclosed-ul' }))
}

function EnclosedLi(method, dataEl) {
    return $('<li/>', {
                class: 'enclosed-li',
                html:  innerHTMLCharacter(method, dataEl)
            })
}

function FloatingHeader() {
    return $('<div/>', { class: 'main-ul__floating-header' })
}

export {
    MainDiv,
    MainUl,
    MainLi,
    EnclosedLi,
    FloatingHeader
}