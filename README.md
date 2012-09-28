PixelDiff
=========

A jQuery plugin for overlaying design comps over a website's content for pixel perfect layout development.

## Usage:

To load the library in Wordpress:

    wp_enqueue_script("pixeldiff", $script_path . 'pixeldiff.js', array('jquery'), '', true);

To load comps for a given page:

    $.pixelDiff(comps, blacklist);

## Parameters:
    comps: an array of image paths to be loaded on page load.
    blacklist: an array of urls or domains to ignore when deciding to load images
              (reduces bandwidth on production, and prevents accidental display of comps by users)

## Example syntax:

    $.pixelDiff(['path_to_comp_file.png', 'path_to_comp_with_popup.png'], ['production.com', 'staging.com']);

## Current Features:

* Automatic size determination of comp overlay
* Overlay or Underlay options for greater flexibility
* Adjustable opacity of overlay.
* Adjustable positioning of compositions via arrow keys

## Future Features:

* Storable settings for each composition that restore on page refresh
* Adjustable settings on initial comp load for non standard layouts
* Javascript trigger for displaying comps on ajax events

## Keyboard Commands:

Keyboard commands require Ctrl, Alt & Shift keys to be pressed at the same time, then a key from the following list.
I had to use all of them in order to prevent keycode collisions with builtin functionality in various browsers.

* Arrow Keys - moves comp in respective direction (up, down, left, right) by 1px
* b - sends comp to back of z-index
* f - sends comp to front of z-index
* h - hides comp
* s - shows comp
* + - increases opacity by 5 percent
* - - descreases opacity by 5 percent
* 0..9 - shows registered comp by numerical index

## Licensing:

Copyright (c) 2011 Marcus Pope - http://www.marcuspope.com/

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
"Software"), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.