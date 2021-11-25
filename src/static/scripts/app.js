// Shuffle an array
// Stolen from https://stackoverflow.com/a/6274381
// ...instead of having i.e. lodash dependency
Array.prototype.shuffle = function () {
    // Create local copy of array
    var items = this.slice()
    for (let i = items.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [items[i], items[j]] = [items[j], items[i]];
    }
    return items;
}

// Capitalize first letter
// Stolen from https://stackoverflow.com/a/3291856
String.prototype.capitalize = function () {
    return this
        .charAt(0)
        .toUpperCase()
    + this.slice(1);
}

// Get n random words from array
Array.prototype.random = function (n) {
    return this
        .shuffle()
        .slice(0, n);
}

// Combine words as string
// TODO: Use "combined form"
Array.prototype.combineAsString = function () {
    return this
        .join("")
        .capitalize()
}
