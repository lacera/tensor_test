import $ from 'jquery';
import * as createElement from './createListElements';

export function setFloatingHeader(appEl) {
    var mainDiv = appEl.secondDiv,
        mainUl = appEl.mainUl,
        enclosedUlHdr = mainUl.find('.enclosed-ul__header'),
        floatingHdrModifClass = 'enclosed-ul__header_floating',
        nextHeader = null,
        bordersHeight = 4,
        sV = { // scroll values
            start: false,
            modif: 0,
            lastY: null,
            mnDivTop: mainDiv.offset().top,
            mnUlTop: mainUl.offset().top,
            mnDivHght: mainDiv.innerHeight(),
            mnUlHght: mainUl.innerHeight()
        },
        floatingHeader = createElement.FloatingHeader();

    mainDiv.prepend(floatingHeader);

    // добавляем скроллирование при помощи mouse events
    mainDiv.mousedown(function() {
        sV.start = true;
        sV.lastY = null;
    });

    mainDiv.mousemove(function(e) {
        e.preventDefault();

        if (sV.start) {
            // вычисляем модификатор скролла (вверх или вниз пытаемся крутить список)
            if (sV.lastY === null) {
                sV.lastY = e.pageY;
            }
            sV.modif = sV.lastY - e.pageY;
            sV.lastY = e.pageY;

            // прокрутка вниз и проверка окончания списка
            if (sV.modif < 0 && ((sV.mnUlTop - sV.modif) >= (sV.mnDivTop + sV.mnDivHght - sV.mnUlHght))) {
                mainUl.offset({top: (sV.mnUlTop -= sV.modif)});
            } else if ((sV.mnUlTop - sV.modif) < (sV.mnDivTop + sV.mnDivHght - sV.mnUlHght)) {
                mainUl.offset({top: sV.mnUlTop = (sV.mnDivTop + sV.mnDivHght - sV.mnUlHght)});
            }

            // прокрутка вверх и проверка начала списка
            if (sV.modif > 0 && ((sV.mnUlTop - sV.modif) <= sV.mnDivTop)) {
                mainUl.offset({top: (sV.mnUlTop -= sV.modif)});
            } else if ((sV.mnUlTop - sV.modif) > sV.mnDivTop) {
                mainUl.offset({top: sV.mnUlTop = sV.mnDivTop});
            }

            // назначение модификатора уплывшим наверх заголовкам
            enclosedUlHdr.each(function(index, el) {
                if ($(el).offset().top < sV.mnDivTop) {
                    $(el).addClass(floatingHdrModifClass);
                    floatingHeader.text($(el).text());
                } else {
                    $(el).removeClass(floatingHdrModifClass);
                }
            });

            // логика плавания плавающего прозрачного заголовка
            nextHeader = mainUl.find('.' + floatingHdrModifClass + ':last').parent().next().children('.enclosed-ul__header');
            if (nextHeader.offset() && ((nextHeader.offset().top - nextHeader.height() - bordersHeight) <= sV.mnDivTop)) {
                floatingHeader.offset({ top: (nextHeader.offset().top - nextHeader.height() - bordersHeight) });
            } else {
                floatingHeader.offset(mainDiv.offset());
            }
        }
    });

    $('body').mouseup(function() {
        sV.start = false;
        sV.lastY = null;
    });
}