![General Assembly Logo](http://i.imgur.com/ke8USTq.png)

# Client-Side Templating with Handlebars

## Objectives

By the end of this lesson, students should be able to:

- Create and use Handlebars templates.
- Integrate Handlebars into a Rails API.

## Prerequisites

- JavaScript
- jQuery
- JSON
- AJAX

## 'Templatizing' Our Views

In our treatment of Rails so far, we've mostly focused on the "M" and "C" of MVC; instead of passing back fully rendered HTML (which we'd get if we used Rails Views), we have handed off responsibility of displaying our data to the front-end. This has usually been implemented by taking our data, iterating through it, and appending HTML to an existing element for each line of data we have.

Suppose that we just queried our back-end, a song API, and received some data in the form of a JSON string.
```JSON
[{"title":"Smells Like Teen Spirit","album":"Nevermind","artist":"Nirvana"},
{"title":"San Diego Serenade","album":"Heart of Saturday Night","artist":"Tom Waits"},
{"title":"Johnny B. Goode","album":"Chuck Berry Is on Top","artist":"Chuck Berry"},
{"title":"Come Together","album":"Abbey Road","artist":"The Beatles"},
{"title":"Hey Jude","album":"Revolution (B-side)","artist":"The Beatles"},
{"title":"San Diego Serenade","album":"Heart of Saturday Night","artist":"Tom Waits"}]
```

Our front-end app might then parse that JSON and give us an array of JavaScript objects, which we can then iterate through.

```javascript
data.forEach(function(song){
  // Do some action.
});
```

If we wanted to produce an `<li>` for each of these movies, and add them to a `<ul>` with the id `songs`, we could do it like this:

```javascript
data.forEach(function(song){
  $("#songs").append("<li><h4>" + song.title + "</h4> By " + song.artist + ", from the album '<em>" + song.album + "</em>'</li>");
});
```

Alternatively, we could specify some string to represent all of the HTML we want to add, and then add it to the `<ul>` in one fell swoop.

```javascript
var newHTML = "";
data.forEach(function(song){
  newHTML += "<li><h4>" + song.title + "</h4> By " + song.artist + ", from the album '<em>" + song.album + "</em>'</li>";
});
$("#songs").html(newHTML);
```

This approach has some advantages over the first - for instance, we don't need to worry about clearing the contents of `$("#songs")` each time.
We could even use `map` and `reduce`.

```javascript
var newHTML = data.map(function(song){
   return "<li><h4>" + song.title + "</h4> By " + song.artist + ", from the album '<em>" + song.album + "</em>'</li>";
}).reduce(function(a,b){return a+b;});
$("#songs").html(newHTML);
```

This last approach is particularly interesting because of separation of concerns - it completely divorces the process of generating each HTML snippet from both the process of combining the snippets _and_ the process of adding the HTML to the page. If we'd wanted to re-use this snippet in another context, it'd be pretty easy to do so; we'd just need to give the function a name and invoke it in both places.

```javascript
var songTemplate = function(song) {
  return "<li><h4>" + song.title + "</h4> By " + song.artist + ", from the album '<em>" + song.album + "</em>'</li>";
};
var myHTML = data.filter(function(song){return song.artist === "The Beatles"}).map(songTemplate).reduce(function(a,b){return a+b;});
$("#beatles-songs").html(myHTML);
...
myHTML = data.filter(function(song){return song.artist === "Tom Waits"}).map(songTemplate).reduce(function(a,b){return a+b;});
$("#tom-waits-songs").html(myHTML);
```

### Your Turn :: 'Templatizing' Our Views

Fork and clone this repo, and then open up the `front-end` directory; there, you'll find an HTML file (`index.html`) and a JS file (`movies.js`).

As in the example above, create a `movieTemplate` function and use it to generate HTML inside the `<ul>` with id `movies`. The format of each `<li>` should be like this: "'Sahara', directed by Zoltan Korda and released in 1943."

## Handlebars Basics

Handlebars is a JavaScript module that allows us to easily set up complex templates. When used on the client side, it works pretty similarly to the example above.

1. Create a template inside a script tag on your HTML page

  ```html
  <script id="song-index" type="text/x-handlebars-template">
    {{#each songs}}
      <li>
        <h4>{{title}}</h4>
        By {{artist}}, from the album '<em>{{album}}</em>'
      </li>
      {{!-- This looks a lot like normal HTML, so it's really easy to write and spot-check. --}}
    {{/each}}
  </script>
  ```

  > `<#each>` is a special 'block helper' built into Handlebars, intended specifically for iterating over collections. More on this in the next section.

2. Create a templating function by running `Handlebars.compile` inside our JavaScript code.

  ```javascript
    var songsIndexTemplate = Handlebars.compile($('#song-index').html());
  ```

  Handlebars's `compile` method reads in all the content found inside our script from step 1 and parses it, returning a templating function.

  > Note: Don't forget the `.html`!

3. Call the templating function with an **object** as a parameter. _**The key in the object must match the top-level input to the template.**_

  ```javascript
    var newHTML = songsIndexTemplate({songs: data});
  ```

  > This step can also easily be combined with step 4.

4. Set some element's HTML to the result of calling our templating function

  ```javascript
    $("#songs").html(newHtml);
  ```

### Your Turn :: Handlebars Basics

Redo the previous exercise; this time using Handlebars!

## Handlebars Helpers

That `<#each>` from the previous exercise was really handy, right? It's one of a few built-in 'helpers' that come with Handlebars. Here's another one: `if`.

#### `if`/`else if`/`else`, `unless`
Say we want to selectively render one thing or another from our template, based on whether or not something exists.

```html
<script id="song-index" type="text/x-handlebars-template">
  {{#each songs}}
    <li>
      <h4>{{title}}</h4>
      {{#if artist}}
        By {{artist}}, from the album '<em>{{album}}</em>'
      {{else}}
        Artist unknown.
      {{/if}}
    </li>
    {{!-- This looks a lot like normal HTML, so it's really easy to write and spot-check. --}}
  {{/each}}
</script>
```

Unfortunately, we can't do much more than test for existence out of the box - for anything else, we'd need to write our own custom helpers.

#### Custom Helpers
To write a custom helper, use `Handlebars.registerHelper`.

```javascript
Handlebars.registerHelper('ifvalue', function (conditional, options){
  if (options.hash.value === conditional) {
    return options.fn(this)
  } else {
    return options.inverse(this);
  }
});
```
> `options.fn` and `options.inverse` are built-in methods on the Handlebars options hash. `options.fn` tells the helper to act like a normal Handlebars compiled template, rendering the context of its argument (in this case, the original context). `options.inverse` does the opposite and then some; not only does the helper not render the context of its argument (again, the original context), it DOES render an optional `else` context if one is given.

Here's how this custom helper might get used in our template.

```html
<script id="song-index" type="text/x-handlebars-template">
  {{#each songs}}
    <li>
      <h4>{{title}}</h4>
      {{#if artist}}
        By {{artist}}, from the album '<em>{{album}}</em>'
      {{else}}
        Artist unknown.
      {{/if}}
      {{#ifvalue artist value="The Beatles"}} Fun Fact: The Beatles were at one point named 'The Silver Beetles'. </ {{/ifvalue}}
    </li>
    {{!-- This looks a lot like normal HTML, so it's really easy to write and spot-check. --}}
  {{/each}}
</script>
```
> `ifvalue` in particular is a 'block helper', because it has a start and an end.

Here's another custom helper, `allCaps`.

```html
<script id="song-index" type="text/x-handlebars-template">
  {{#each songs}}
    <li>
      <h4>{{allCaps title}}</h4>
      {{#if artist}}
        By {{artist}}, from the album '<em>{{album}}</em>'
      {{else}}
        Artist unknown.
      {{/if}}
      {{#ifvalue artist value="The Beatles"}} {{bold}}Fun Fact{{/bold}}: The Beatles were at one point named 'The Silver Beetles'. </ {{/ifvalue}}
    </li>
    {{!-- This looks a lot like normal HTML, so it's really easy to write and spot-check. --}}
  {{/each}}
</script>
```

```javascript
Handlebars.registerHelper('allCaps', function (text){
  return text.toUpperCase();
});
```

### Your Turn :: Handlebars Helpers

Take your solution to the previous exercise and implement a custom helper of your own design. Experiment!

## Additional References
- [Handlebars documentation](http://handlebarsjs.com)
