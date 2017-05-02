import $ from 'jquery';

export function setFloatingHeader(element) {
    console.log($(element));
    var mainDiv = $(element).children('.main-div'),
        mainUl = mainDiv.children('.main-ul'),
        enclosedLi = mainUl.find('.enclosed-ul__header'),
        nextHeader = null,
        bordersHeight = 4,
        startScroll = false,
        scrollValues = {
            y: 0,
            lastY: null
        },
        floatingHeader = $('<div/>', { class: 'main-ul__floating-header' });

    mainDiv.prepend(floatingHeader);

    mainDiv.mousedown(function(e) {
        startScroll = true;
        scrollValues.lastY = null;
    });

    mainDiv.mousemove(function(e) {
        e.preventDefault();

        if (startScroll) {
            if (scrollValues.lastY === null) {
                scrollValues.lastY = e.pageY;
            }
            scrollValues.y = scrollValues.lastY - e.pageY;
            scrollValues.lastY = e.pageY;

            if (scrollValues.y < 0 && ((mainUl.offset().top - scrollValues.y) >=
                (mainDiv.offset().top + mainDiv.innerHeight() - mainUl.innerHeight()))) {
                mainUl.offset({top: (mainUl.offset().top - scrollValues.y)});
            } else if ((mainUl.offset().top - scrollValues.y) <
                (mainDiv.offset().top + mainDiv.innerHeight() - mainUl.innerHeight())) {
                mainUl.offset({top: (mainDiv.offset().top + mainDiv.innerHeight() - mainUl.innerHeight())});
            }

            if (scrollValues.y > 0 && ((mainUl.offset().top - scrollValues.y) <= mainDiv.offset().top)) {
                mainUl.offset({top: (mainUl.offset().top - scrollValues.y)});
            } else if ((mainUl.offset().top - scrollValues.y) > mainDiv.offset().top) {
                mainUl.offset({top: mainDiv.offset().top});
            }

            enclosedLi.each(function(index, el) {
                if ($(el).offset().top < mainDiv.offset().top) {
                    $(el).addClass('enclosed-ul__header_floating');
                    floatingHeader.text($(el).text());
                } else {
                    $(el).removeClass('enclosed-ul__header_floating');
                }
            });

            nextHeader = mainUl.find('.enclosed-ul__header_floating:last').parent().next().children('.enclosed-ul__header');
            if (nextHeader.offset() && ((nextHeader.offset().top - nextHeader.height() - bordersHeight) <= mainDiv.offset().top)) {
                floatingHeader.offset({top: (nextHeader.offset().top - nextHeader.height() - bordersHeight), left: floatingHeader.offset().left});
            } else {
                floatingHeader.offset(mainDiv.offset());
            }
        }
    });

    $('body').mouseup(function(e) {
        startScroll = false;
        scrollValues.lastY = null;
    });
}