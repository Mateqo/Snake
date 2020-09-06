jQuery(function ($) {
    // zresetuj scrolla
    $.scrollTo(0);

    // przy kliknięciu scrolluj do body czas trwania 500ms
    $('#scrollup').click(function () { $.scrollTo($('body'), 500); });
}
);