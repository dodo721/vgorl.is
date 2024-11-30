
$(() => {
    $("p,h1,h2,h3,h4,h5").each((i, el) => {
        const text = $(el).html();
        const words = text.split(' ');
        $(el).html("");
        words.forEach(word => {
            const span = document.createElement("span");
            span.html(word);
            const rand1 = Math.floor(Math.random() * 11);
            const rand2 = Math.floor(Math.random() * 11);
            span.classList.add("font-size-" + rand1);
            span.classList.add("font-size-hover-" + rand2);
            $(el).append(span);
        });
    });
});