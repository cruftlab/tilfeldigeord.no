module.exports = function (config) {
    // Layouts
    config.addLayoutAlias('base', 'base.njk');

    // Copy CSS
    config.addPassthroughCopy("src/static");

    return {
        dir: {
            input: 'src',
            output: 'dist',
            includes: 'includes',
            layouts: 'layouts',
            data: 'data'
        },
        templateFormats: ['njk', 'md'],
        htmlTemplateEngine: 'njk',
        markdownTemplateEngine: 'njk',
        passthroughFileCopy: true
    }
};
