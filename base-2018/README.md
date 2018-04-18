Bolt Base-2018 Theme
====================

Base-2018 is a clean theme for Bolt, built on top of [Bulma][bulma].
To learn more about specific Bulma components, check out the
[Bulma Documentation][bulma-docs].

Features included with Base-2018
--------------------------------

Base-2018 comes with all of the great features that are found in Bolt, the
Bulma framework, and a few things more. Simply put, if it works in Bulma,
it will work in Bulma for Bolt. The theme also includes:

 - Sass(scss) or CSS Versions
 - Optional Yarn and Gulp Support
 - And much, much more!

Requirements for Base-2018
--------------------------

You can use whatever you want – seriously. You can use Gulp, Yarn, Codekit or
nothing at all. It’s completely up to you how you decide to build your theme –
Bulma for Bolt will stay out of your workflow as much as possible.

This theme does include Sass, Javascript and Gulp files, and is optimized for a
Gulp-based workflow. To get the most out of this theme, Gulp is highly
recommended. However, if you're not using Gulp yet, you can also modify the
compiled CSS files as is.

File Structure
--------------

These are the most important files, included in this theme.

```
.
├── css/
│   ├── bulma.css                 - The compiled Bulma CSS framework
│   └── theme.css                 - Theme-specific CSS
├── js/
│   ├── app.js                    - Theme-specific Javascript
│   └── normalizeBrightness.js    - A required javascript file
├── partials/
│   ├── _aside.twig               - Partial for the sidebar. With fixed content, or widgets
│   ├── _footer.twig              - Partial for the footer below every page
│   ├── _fresh_install.twig       - Partial that's shown on fresh installs with some instructions
│   ├── _header.twig              - Partial for the header banner with the site title
│   ├── _master.twig              - Twig template, that is uses to 'extend' all pages (See 'template inheritance')
│   ├── _navbar.twig              - Partial with the navigation bar shown on top of every page
│   ├── _no_content.twig          - Partial that's shown when there is no homepage present
│   ├── _record_meta.twig         - Partial with meta-information shown at the top of a page or entry
│   ├── _recordfooter.twig        - Partial with meta-information below a page or entry
│   ├── _sub_field_blocks.twig    - Partial with blocks, used by `_sub_fields.twig`
│   ├── _sub_fields.twig          - Partial used to render contenttypes with an undertermined amount of fields
│   ├── _sub_menu.twig            - Partial with macro for rendering the drop-down menu
│   ├── _sub_menu_footer.twig     - Partial with macro for rendering the menu in the footer
│   ├── _sub_pager.twig           - Partial with the markup for the pagination ([1|2|3|…])
│   ├── _sub_recent_records.twig  - Partial for the "latest records" block
│   └── _sub_taxonomylinks.twig   - Partial with the markup for the links to taxonomies like categories and tags
├── source/
│   ├── javascript/
│   │   └── app.js                - Source app.js file
│   ├── node_modules/
│   ├── scss/
│   │   ├── _breakpointdebug.scss
│   │   ├── _settings.scss
│   │   ├── _typography.scss
│   │   ├── bulma.scss
│   │   └── theme.scss
│   ├── gulpfile.js               - Build task script for Gulp.
│   ├── package.json              - Configuration for used Node / Gulp packages.
│   └── yarn.lock
├── README.md
├── index.twig
├── listing.twig
├── not-found.twig
├── page.twig
├── record.twig
├── search.twig
└── theme.yml
```

Installation
------------

No need to install anything. This theme comes with Bolt. Don't forget to set
`theme: base-2018` in your `config.yml` file, if it doesn't show up already.

Getting Started
---------------

This theme was developed to be as "tinker friendly" as possible. Depending on
your area of expertise and experience with different front-end development
techniques, you can modify the CSS of this theme on different 'levels':

 - If you're familiar with Bulma and Gulp, you can finetune which parts of
   Bulma are included, as well as all their settings. See the
   `source/scss/bulma.scss` and `source/gulpfile.js` files.
 - If you do know a bit of SCSS, you can work in `source/scss/theme.scss` and
   `source/scss/_settings.scss` files.
 - Otherwise you can just make your changes in the compiled css at `css/theme.css`.

The templates themselves are the `.twig` files in the root of the theme folder,
as well as the additional helper files in the `partials` folder.

Modifying the HTML of the theme
-------------------------------

All HTML parts of the theme are made in Twig. If you're not familiar with Twig
yet, be sure to read the Bolt documentation on Twig, as well as the official
Twig documentation.

This theme uses a concept called 'template inheritance'. From other themes or
CMS'es, you might be familiar with seeing each page 'include' a header and a
'footer'. Instead, we have one 'master' template, which are extended by each of
the different templates. You can read more about this concept on the
[Twig site - Template Inheritance][inheritance] or here:
[Dealing With Themes And Layouts With Twig][theme-twig]

For example, take a look at one of the simpler templates, `record.twig`:

```twig
{% extends 'partials/_master.twig' %}

{% block main %}

        <h1>{{ record.title }}</h1>

        {{ block('sub_fields', 'partials/_sub_fields.twig') }}

        {{ include('partials/_recordfooter.twig', { 'record': record }) }}

{% endblock main %}
```

You'll notice the first line that states that the template 'extends' the
`_master.twig` partial. The rest of the template is the `{% block %}`, which
overrides the 'main' block in the master template. Inside the block is just an
`<h1>` element with the record title, a `sub_fields` block (defined in
`partials/_sub_fields.twig`) that will output the fields that are defined for
this ContentType, and it closes with an include of `_recordfooter.twig` to
display some meta data, like the author, date and permalink.

As you can see, we can still use 'include' for small blocks of HTML, even though
we're using template inheritance. This way we can keep our themes very
structured and organized.

### Showing all fields without defining them

Because this is a general purpose theme, we try to make it work without problems
for any defined ContentType. This means we'll need to render all available
fields in the template without knowledge of which fields are defined exactly.
To do this, we're using the `_sub_fields.twig` partial. Simply said, this
partial goes over all fields in the ContentType, and outputs them in a generic
way. It's used like this:

```twig
    {% with { 'record': record, 'common': true, 'extended': true, 'repeaters': true } %}
        {{ block('sub_fields', 'partials/_sub_fields.twig') }}
    {% endwith %}
```

The `with` tag is used to scope variables: This way they will be available
within the block, but not outside. The partial has a few "options" you can set
this way:

| Option           | Description |
|------------------|-------------|
| `record`         | The Record to use in the display. Defaults to `record` |
| `common`         | Whether or not to include common fields like 'text', 'html', 'textarea', 'image' and 'video' in the output. Defaults to `true` |
| `extended`       | Whether or not to include all other regular fields (like 'date', 'select' and others) in the output. Defaults to `false` |
| `repeaters`      | Whether or not to include repeater fields in the output. Defaults to `false` |
| `exclude`        | field names to exclude, even though they might otherwise be included |
| `skip_uses`      | By default the field that's used as the slug is skipped, under the assumption that it corresponds to the title of the page. To disable this, set `'skipuses': false` |

Note: `templatefields` are included in `common` and `extended`, where applicable.

Theme structure
---------------

In the diagram below, you'll see the wat most pages are structured. In this case,
`index.twig`. In the HTML, you will see it extends `_master.twig`, which can be found in
the `partials/` folder. Inside this file, the global structure of all pages is laid out:
The basic HTML structure, and a handful of other included partials.

```
 index.twig structure                     _topbar.twig

                                               │
                     ├─────────────────────────┴────────────────────────────────┤

                    ┌────────────────────────────────────────────┬───────────────┐
 _sub_menu.twig ──▶ │  Home link1 link2 link3                    │______ [Search]│ ◀── _search.twig
                    ├────────────────────────────────────────────┴───────────────┤
                    │••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••│
                    │•••••••••••••••••••••••(header image)•••••••••••••••••••••••│ ◀── _header.twig
                    │•••••••••••••••••••••••(name of site)•••••••••••••••••••••••│
                    │••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••│
                    │ ┌──────────────────(main content)─┐ ┌────────────(aside)─┐ │
                    │ │Lorem ipsum dolor sit amet       │ │Lorem ipsum dolor   │ │
                    │ │                                 │ │sit amet. Consec-   │ │
                    │ │Consectetur adipiscing elit. Nunc│ │tetur adipiscing.   │ │
                    │ │omni virtuti vitium contrario    │ │                    │ │
                    │ │nominehgpponitur. Non enim, si   │ │Latest X            │ │
                    │ │malum est dolor, carere eo malo  │ │ - intellegetur     │ │
                    │ │satis est ad bene vivendum. Duo  │ │ - Expectoque       │ │
                    │ │Reges: constructio interrete.    │ │ - videantur        │ │ ◀── _aside.twig
                    │ │                                 │ │                    │ │
                    │ └─────────────────────────────────┘ │Latest Y            │ │
                    │ ┌─────────────────────────────────┐ │ - intellegetur     │ │
                    │ │Lorem ipsum dolor sit amet       │ │ - Expectoque       │ │
                    │ │                                 │ │ - videantur        │ │
                    │ │Consectetur adipiscing elit. Nunc│ │                    │ │
                    │ │omni virtuti vitium contrario    │ │                    │ │
                 ┬  ├─┴─────────────────────────────────┴─┴────────────────────┴─┤
  _footer.twig ──┤  │ (C) 2016                          Home link1 link2 link3   │ ◀── _sub_menu.twig
                 ┴  └────────────────────────────────────────────────────────────┘

                   ├────────────────────────────┬─────────────────────────────────┤
                                                │

                                           _master.twig
```

Options in `theme.yml`
----------------------

This theme comes with its own configuration file, named `theme.yml`. In this
file you can set certain specific options for the theme, such as the default
images for the header, the position of the 'aside' sidebar, and the global
layout.

Finally, the last section defines the settings for which templates are used for
which types of pages. The templates you will set in this config file will
override the ones in the global app/config/config.yml, so beware!

```
# maintenance_template: maintenance_default.twig
homepage_template: index.twig
record_template: record.twig
listing_template: listing.twig
search_results_template: search.twig
notfound: notfound.twig
```

For details on which page is used when, see the next section in this document.

Working with the `.twig` files
------------------------------

You are free to do what you want, when it comes to the .twig files. Out-of-the-
box, this theme comes with a handful of templates, that correspond to
the default ContentTypes when you have a fresh install of Bolt.

Most of the templates will be pretty straightforward, especially if you're
familiar with the concept of Template Inheritance. The main templates are:

 - `index.twig`: Used as the frontpage or homepage of the site.
 - `listing.twig`: This template is used for listing overviews of all kind, like
   `/pages` for all records in the 'pages ContentType' or `category/movies` for
   all records that have the 'movies' category assigned to them. Note that
   'search' uses its own template, though.
 - `not-found.twig`: This template is used as the template that's shown when the
   visitor hits a non-existing page on the website.
 - `page.twig`: The detail page for a single record of the 'pages' ContentType.
   Automatically picked up by Bolt, if the name matches.
 - `record.twig`: The "generic" detail page for a single record page. This is
   used as the fallback, if there's no specific template set for a single record
   page.
 - `search.twig`: This page displays the search results and a search box, to
   search again.

Working with the `.scss` files
------------------------------

This theme uses Node, Yarn and Gulp to run the tasks to compile and minify the
Sass an Javascript files. If you don't have Node, Yarn and Gulp yet, install
them from [Nodejs.org](https://nodejs.org), [Yarnpkg.com](https://yarnpkg.com)
and [Gulpjs.com](https://gulpjs.com).

To install the themes dependencies, run the following in the source directory:

```
yarn install
```

Now you can simply run `yarn run gulp` to compile the javascript and sass
files. This will build the files, and it will continue to monitor changes to
the `.scss` files. If you make a change, the compiled files will be updated
immediately. When you're ready to deploy, and put the site in production, be
sure to build the files and minify them:

```
yarn run gulp build
```

This will build the files that you can deploy, or put into your versioning
system.

The build process has been tested on Yarn 1.5.1. If you do not have Yarn
installed, or need to update it, see: https://yarnpkg.com/lang/en/docs/install/

And then go through the above steps again.

If you're interested to learn more about the process, these two tutorials on
Gulp (which is what we use under the hood) might be of interest to you:

 - https://markgoodyear.com/2014/01/getting-started-with-gulp/
 - https://travismaynard.com/writing/getting-started-with-gulp

[bulma]: http://bulma.io/
[bulma-docs]: https://bulma.io/documentation/overview/start/
[inheritance]: http://twig.sensiolabs.org/doc/tags/extends.html
[theme-twig]: http://hugogiraudel.com/2013/11/12/themes-layouts-twig/
