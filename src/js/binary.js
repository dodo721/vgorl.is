
$(() => {

    const randBinary = (og) => {
        let binary = "";
        for (let i = 0; i < og.length; i++) {
            binary += "" + Math.round(Math.random());
        }
        return binary;
    }

    let elData = {};

    const binaryCycle = (el) => {
        $(el).html(randBinary(elData[el].ogText));
    }

    $('p.binary,span.binary').on("mouseenter", e => {
        const ogText = $(e.target).html();
        const intervalId = setInterval(() => binaryCycle(e.target), 100);
        elData[e.target] = {ogText, intervalId};
        binaryCycle(e.target);
    }).on("mouseleave", e => {
        clearInterval(elData[e.target].intervalId);
        elData[e.target].intervalId = -1;
        $(e.target).html(elData[e.target].ogText);
    }).each((i, el) => {
        $(el).attr("title", $(el).html());
    });
});
