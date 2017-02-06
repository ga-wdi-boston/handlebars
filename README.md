[![General Assembly Logo](https://camo.githubusercontent.com/1a91b05b8f4d44b5bbfb83abac2b0996d8e26c92/687474703a2f2f692e696d6775722e636f6d2f6b6538555354712e706e67)](https://generalassemb.ly/education/web-development-immersive)

# Handlebars

## Prerequisites

-   [jQuery Dom](https://github.com/ga-wdi-boston/jquery-dom)
-   [HTML- CSS](https://github.com/ga-wdi-boston/html-css)

## Objectives

By the end of this, developers should be able to:

-   Create Handlebars templates to render JSON data from an API.
-   Read Handlebars templates for understanding.
-   Create nested handlebars paths.
-   Create handlebars partials.
-   Utilize `if` and `each` helpers when creating templates.

## Preparation

1.  [Fork and clone](https://github.com/ga-wdi-boston/meta/wiki/ForkAndClone)
    this repository.
1.  Install dependencies with `npm install`.

## What is Handlebars

Just a templating engine for JS.

But a little more:

*As noted in the introduction: Handlebars.js is a compiler built with JavaScript
that takes any HTML and Handlebars expression and compiles them to a JavaScript
function. This derived JavaScript function then takes one parameter, an
object—your data—and it returns an HTML string with the object properties’
values inserted (interpolated) into the HTML. So, you end up with a string
(HTML) that has the values from the object properties inserted in the relevant
places, and you insert the string on a page.*

[Javascript is Sexy: Handlebars](http://handlebarsjs.com/)

Handlebars Docs: (http://handlebarsjs.com/)

## Before handlebars

Suppose that we just queried our back-end, a song API, and received some data
in the form of a JSON string.
```JSON
[{"title":"Smells Like Teen Spirit","album":"Nevermind","artist":"Nirvana"},
{"title":"San Diego Serenade","album":"Heart of Saturday Night","artist":"Tom Waits"},
{"title":"Johnny B. Goode","album":"Chuck Berry Is on Top","artist":"Chuck Berry"},
{"title":"Come Together","album":"Abbey Road","artist":"The Beatles"},
{"title":"Hey Jude","album":"Revolution (B-side)","artist":"The Beatles"},
{"title":"Get Behind the Mule","album":"Mule Variations","artist":"Tom Waits"}]
```

Our front-end app might then parse that JSON and give us an array of JavaScript
objects, which we can then iterate through.

```javascript
data.forEach(function(song){
  // Do some action.
});
```

If we wanted to produce an `<li>` for each of these songs, and add them to a
`<ul>` with the id `songs`, we could do it like this:

```javascript
data.forEach(function(song){
  $("#songs").append("<li><h4>" + song.title + "</h4> By " + song.artist + ", from the album '<em>" + song.album + "</em>'</li>");
});
```

Alternatively, we could specify some string to represent all of the HTML we
want to add, and then add it to the `<ul>` in one fell swoop.

```javascript
let newHTML = "";
data.forEach(function(song){
  newHTML += "<li><h4>" + song.title + "</h4> By " + song.artist + ", from the album '<em>" + song.album + "</em>'</li>";
});
$("#songs").html(newHTML);
```

This approach has some advantages over the first - for instance, we don't need
to worry about clearing the contents of `$("#songs")` each time.

## Lab: Hands on with Handlebars

Handlebars and front end templating will make a whole lot more sense once you
have a chance to look at it.  In your squads discuss and consider the
following:

-   What is happening in the `scripts/index.js` file?
-   How many times is `book-listing.handlebars` run?
-   Draw the order in which each separate file is accessed.
-   Be able to explain in plain english what is happening.
-   What happens if you move the line that defines `showBooksTemplate`?
-   Experiment with `console.log()` and `debugger` to aid in your understanding.

Make sure to note any questions you come acorss and we'll go over them as a
class.

## Discussion: What was discovered

Continuing with what was learned in the previous lab let's discuss what you
discovered trying to answer the questions.

What do you think would happen if I tried to add an event handler to something
contained in my template before it was rendered?

Let's look through the documentation and see if there is anyway we can improve
this code.

[Handlebars Helpers Documentation](http://handlebarsjs.com/builtin_helpers.html)

## Code-Along: Let's clean this up

Now given what have discoverd and discussed about Handlebars, let's reorganize
things and use an API that we have locally -
[LibraryAPI](https://github.com/ga-wdi-boston/library-api).

## Lab: Refactor, clean up and incorporate some Auth

Using documentation and your squad, work on getting up the page

-   Unless you are successfully logged in, you cannot see any books or buttons
-   Have two buttons, 'All Books' and 'Titles', and when you click one, it show's
just the information on the button
-   When each button is clicked the button should clear the content div and
replace the all_books/titles listing with the other.

## Additional Resources

-   [Handlebars Docs](http://handlebarsjs.com/)
-   [Handlebars in Ten Minutes](http://tutorialzine.com/2015/01/learn-handlebars-in-10-minutes/)
-   [Javascript is Sexy: Handlebars](http://javascriptissexy.com/handlebars-js-tutorial-learn-everything-about-handlebars-js-javascript-templating/)

## [License](LICENSE)

1.  All content is licensed under a CC­BY­NC­SA 4.0 license.
1.  All software code is licensed under GNU GPLv3. For commercial use or
    alternative licensing, please contact legal@ga.co.
