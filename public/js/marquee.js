
$(() => {
    $('.marquee').each((idxMarquee, elMarquee) => {
        const innerOne = document.createElement("div");
        const innerTwo = document.createElement("div");
        $(el).append(innerOne);
        $(innerOne).after(innerTwo);
        const child = $(el).children(":first");
        $(child).appendTo(innerOne);
        $(child).clone().appendTo(innerTwo);
    });
});
