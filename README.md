# htpad

It seems like most of the handwritten note software out there is either over-complicated, slow, not cross-platform, holds your notes hostage in strange formats, or all of the above. So, this is my answer to taking and sharing notes within a web browser.

# Installation

Download [blank.html](https://github.com/akissinger/htpad/releases/download/1.0/blank.html). Open it in a browser. You are done.

# Usage

All of the data is stored within the HTML file, and the entire htpad 'program' is in the form of Javascript files included from the web via [jsDelivr](https://www.jsdelivr.com). Hence, you can use htpad on any computer with a reasonable browser (tested on Chrome and Firefox) and an internet connection.

When you open `blank.html`, you will see a collection of tool icons in the upper-left corner. From left-to-right, these are: 'Save As', 'Export', 'Pen', and 'Eraser'. 'Export' is similar, except it produces a read-only note that doesn't require internet access.

At any point, clicking the 'Save As' icon will instruct your browser to 'download' an exact copy of the note as it stands. For all intents and purposes, this behaves exactly as you would expect the 'Save As' command to work in a normal problem, except you may need to point your browser to the new file.

A normal 'Save' function is not really an option, since it would involve writing something straight to your computer, which is a big no-no for plain old HTML files. To save, simply click 'Save As' and overwrite the current file.

I suggest keeping `blank.html`, well, blank. To create a new note, open `blank.html` and click 'Save As' and give the note a name, e.g. `ideas_3apr.html`. Navigate to the new note in your browser, and for all future saves, overwrite the current note. Of course, you can use htpad however you like. :)



# Customisation and upgrading

Customising is easy. Just open your note in a text editor and change stuff. Things that are safe to change:

 * colors of lines, menu, background, etc. in the stylesheet
 * the title of the page
 * the width and height of the SVG file. This is especially handy if you need more space.
 * adding some new HTML to the page, as long as it doesn't clobber any of the ID's of existing elements.

Pro tip: use the 'Developer Tools' in your browser to change stuff on the fly. This will get saved with you do a 'Save As'.

You may wish to occasionally get a new version of `blank.html` to get new features or bugfixes. You can 'upgrade' old notes by pasting the (rather large) contents of the &lt;svg&gt; tag from an old note into the new template. I may automate this process at some point.


