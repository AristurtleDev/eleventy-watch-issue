# Eleventy Watch Issue
This is a minimal example repository to show an issue I'm experiencing using 11ty. Note that this issue may be from my own misunderstanding of configurations and not neccessarly a bug with 11ty.

## The Issue
When running 11ty using the `--serve` flag, it should, to my understanding, watch for changes to any content within the configured `"input"` directory.  When a change is detected in one of those files, it should trigger a rebuild and re-serve the file live to the browser.

However, in this particular setup, this is not working as I would expect it.

In the [.eleventy.js](.eleventy.js) configuration file, I have the following configurations applied

```js
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
```

This configuration tells it to pass through copy image files from the `/content/articles/` directory that way we can keep images relative to the documentation file they are for instead of a single massive image dump directory somewhere.

Next, this configuration explicity tells it to watch the `/content/**/*` glob for changes, which should watch all files and directories/subdirectories recursively within the `content` directory.


Now if you run the site using

```sh
npm run dev
```

Then make a change to the [/content/articles/tools/index.md](/content/articles/tools/index.md) file, you will see the following message in the terminal

```sh
[11ty] File changed: content\articles\tools\index.md (skips build)
```

it skips the build?  However if you make a change to the [/content/articles/index.md](/content/articles/index.md) file, it performs the watch and serve correctly

```sh
[11ty] Writing _site/articles/index.html from ./content/articles/index.md (njk)
[11ty] Copied 1 file / Wrote 3 files in 0.02 seconds (v2.0.1)
```

**Note: If I remove the passthrough configuration, then everything works as expected, except now the image files are not copied over which means there are broken image links**

## The Question
So I guess the question for this issue is why does having this passthrough copy configuration cause it to skip building the markdown file in question?