(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){

require('./marquee');
require('./random-font-size.js')

console.log("JS loaded");
},{"./marquee":2,"./random-font-size.js":3}],2:[function(require,module,exports){

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

},{}],3:[function(require,module,exports){

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

},{}]},{},[1]);
