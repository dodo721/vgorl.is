
$(() => {
    $("p.rand,h1.rand,h2.rand,h3.rand,h4.rand,h5.rand").each((i, el) => {
        const text = $(el).html();
        $(el).attr("title", text);
        const words = text.split(' ');
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
