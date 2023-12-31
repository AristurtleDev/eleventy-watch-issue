'use strict';

/** @param {import("@11ty/eleventy").UserConfig} eleventyConfig */
function eleventy(eleventyConfig) {

    //  Adding this passthrough that specifies images only causes the
    //  watch-serve to skip building markdown files that are in directories that
    //  match with the passthrough, even though the pass through is image
    //  specific in the glob and does not include .md in the glob
    eleventyConfig.addPassthroughCopy('content/articles/**/*.{png, jpg, jpeg}');

    //  Configure server to specifically files in the content directory.
    //  The content directory is already set as the "input" directory so it
    //  should be watched by default, but being explicitly specific here.
    eleventyConfig.setServerOptions({
        watch: ['content/**/*']
    });

    return {
        templateFormats: ['md', 'njk', 'html'],
        markdownTemplateEngine: 'njk',
        htmlTemplateEngine: 'njk',
        "dir": {
            //  content directory set explicity as the input directory here
            "input": "content",
            "includes": "../_includes",
            "data": "../_data",
            "output": "_site"
        }
    }
}

module.exports = eleventy;