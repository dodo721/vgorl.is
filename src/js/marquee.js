
$(() => {
    $('.marquee').each((i, el) => {
        const innerOne = document.createElement("div");
        innerOne.classList.add("innerOne");
        const innerTwo = document.createElement("div");
        innerTwo.classList.add("innerTwo");
        $(el).append(innerOne);
        $(innerOne).after(innerTwo);
        const child = $(el).children(":first");
        $(child).appendTo(innerOne);
        $(child).clone().appendTo(innerTwo);
    });
});
