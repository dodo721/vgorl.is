
const {promisify} = require('util');

class DataFunc {

    vars = {};
    funcs = {};

    constructor () {

    }

    setVar(name, val) {
        this.vars[name] = val;
    }

    getVar(name) {
        return this.vars[name];
    }
    
    addFunc(name, func) {
        this.funcs[name] = func;
    }

    async runFunc(name, params, el) {
        const func = this.funcs[name];
        if (!func)
            throw new Error(`Couldn't run data-func ${name}: ${name} is not a data-func`);
        let res;
        try {
            res = await func(el, params);
        } catch (e) {
            console.error(`Error running data-func ${name} for`, el);
            console.error(e);
        }
    }

    populateElement(el, param, value) {
        $.each(el.attributes, (i, attr) => {
            if (attr.value.includes(`$${param}`)) {
                $(el).attr(attr.name, attr.value.replace(`$${param}`, value));
            }
        });
    }

    cloneElement(el) {
        const newEl = $(el).clone(true);
        $(newEl).attr("data-gen", true);
        $(newEl).insertAfter(el);
        return newEl[0];
    }

    gooooo() {
        $('[data-func]').each((i, el) => {
            // get all data-funcs and their params
            const funcName = $(el).attr('data-func');
            const params = {};
            $.each(el.attributes, (j, attr) => {
                const paramRegex = /^data-param-(\w+)$/m;
                const match = attr.name.match(paramRegex);
                if (match) {
                    params[match[1]] = attr.value;
                }
            });
            // run the function
            this.runFunc(funcName, params, el);
        });
    }

}

$(() => {

    const datafunc = new DataFunc();

    /**
     * data-func="ls"
     * calls api /ls, clones element to match
     * @param dir 
     */
    datafunc.addFunc("ls", async (el, params) => {
        const url = '/api/ls/' + params.dir;
        let res;
        try {
            res = await $.ajax({
                url,
                type: 'GET',
            });
        } catch (data) {
            throw new Error (`GET request to ${url} failed with status code ${data.status}`);
        }
        let selEl = el;
        res.forEach((item, i) => {
            const prevEl = selEl;
            if (i !== res.length - 1)
                selEl = datafunc.cloneElement(selEl);
            datafunc.populateElement(prevEl, "item", item);
        });
    });

    datafunc.gooooo();

});
