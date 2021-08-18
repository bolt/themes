Bolt 4 - Base-2021 theme
========================

This is the base theme that comes with the installation of Bolt 5.

Bolt CMS is an open source, adaptable platform for building and running modern
websites. Built on PHP, Symfony and more. [Read the site](https://boltcms.io)
for more info.

To check out Bolt and set up your first Bolt installation, read [Installing Bolt][installation].

---

1 Tailwind CSS
--------------

This theme is based on the framework [Tailwind CSS](https://tailwindcss.com/).
Tailwind CSS is a highly customizable, low-level CSS framework that gives you 
all of the building blocks you need to build bespoke designs without any 
opinionated styles you have to fight to override.

1.1 Development
---------------

The raw Tailwind-flavoured CSS-file lives in `css/tailwind/`. In this setup the 
CSS will be processed, purged and minified by default. You can disable purging 
by setting `purge.enabled`to `false` in `tailwind.config.js` and minification by 
commenting out all `cssnano`-related lines in `postcss.config.js`. 

Read more about the process in the [Tailwind CSS / Optimizing for Production][opt] docs.

During development you can use `yarn watch` to automatically regenerate all css 
files. When purging is enabled, this process scrapes all `.twig` files in the 
theme folder and tries to find all used selectors. In doing so, all unused 
selectors are purged and the final size of tailwind reduces from a couple of 
megabytes to some kilobytes.

2 Resources
-----------

- [Tailwind Cheat Sheet](https://nerdcave.com/tailwind-cheat-sheet)
- [Tailwind components](https://tailwindcomponents.com/)
- [Tailwind Toolbox](https://www.tailwindtoolbox.com/)
- [Awsome Tailwind CSS - Large resource of links](https://github.com/aniftyco/awesome-tailwindcss)
- [Bolt CMS documentation](https://docs.bolt.cm/4.0/getting-started/introduction)
- [Twig documentation](https://twig.symfony.com/)

3 Editing this theme
--------------------

The base-2021 theme consists of:

- Homepage (index.twig)
- Record page (record.twig)
- Listing page (listing.twig)

You can edit these files to your liking. The themes come with the development 
build of Tailwind CSS which is 2380.4kB. 
These makes the development as productive as possible, but when you are ready 
for production, make sure you 'purge' the CSS. 
See the Tailwind documentation for information about [controling the file size](https://tailwindcss.com/docs/controlling-file-size).

```
**Important note**
In the folder "tailwind css" is the base css file for generating the Tailwind CSS.
In this file are also some custom CSS rules for the record template.
```

[opt]: https://tailwindcss.com/docs/optimizing-for-production
[installation]: https://docs.bolt.cm/installation/installation
