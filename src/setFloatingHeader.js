import $ from 'jquery';

export function setFloatingHeader() {
    var mainDiv = $('.main-div'),
        mainUl = $('.main-ul'),
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

            $('.enclosed-ul__header').each(function(index, element) {
                if ($(element).offset().top < mainDiv.offset().top) {
                    $(element).addClass('enclosed-ul__header_floating');
                    floatingHeader.text($(element).text());
                } else {
                    $(element).removeClass('enclosed-ul__header_floating');
                }
            });

            nextHeader = $('.enclosed-ul__header_floating:last').parent().next().children('.enclosed-ul__header');
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