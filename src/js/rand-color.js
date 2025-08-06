const randomColor = require('randomcolor');

$(() => {
    $(".randcol").each((i, el) => {
        $(el).css("color", randomColor({luminosity: 'light'}));
    });
});
