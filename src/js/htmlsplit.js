
/**
 * Splits a string by whitespace, preserving html blocks as whole parts
 */
const htmlsplit = (s) => {

    const seperatorRegex = /(<(\w+)(.*?)>(.*?)<\/\2>|\s)/gms;
    const split = [];

    const whitespaceRegex = /^\s+$/m;
    let lastSplitIdx = 0;
    while (match = seperatorRegex.exec(s)) {
        if (whitespaceRegex.test(match[0])) {
            // is whitespace
            if (lastSplitIdx === match.index) {
                lastSplitIdx = match.index;
                continue;
            }
            const section = s.substring(lastSplitIdx, match.index)
            if (whitespaceRegex.test(section)) {
                lastSplitIdx = match.index;
                continue;
            }
            split.push(section);
            lastSplitIdx = match.index;
        } else {
            // is an HTML block
            split.push(match[0]);
            lastSplitIdx = match.index;
        }
    }

    if (!lastSplitIdx || lastSplitIdx !== s.length - 1) {
        split.push(s.substring(lastSplitIdx));
    }

    return split;

}

module.exports = htmlsplit;