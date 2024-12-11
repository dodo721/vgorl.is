const htmlsplit = require('./htmlsplit');

$(() => {
    $(".randsiz").each((i, el) => {
        const text = $(el).html().trim();
        $(el).attr("title", text);
        const words = htmlsplit(text);
        console.log("RANDSIZ SPLIT", words);
        $(el).html("");
        words.forEach(word => {
            const span = document.createElement("span");
            $(span).html(word);
            const rand1 = Math.floor(Math.random() * 11);
            const rand2 = Math.floor(Math.random() * 11);
            span.classList.add("font-size-" + rand1);
            span.classList.add("font-size-hover-" + rand2);
            $(el).append(span);
        });
    });
});
