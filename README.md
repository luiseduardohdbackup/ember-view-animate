ember-view-animate
==================

Animate an ember view's insertion and removal.

This is a very safe to use mixin. It does **not** do anything dangerous like overriding any Ember.js methods, it simply hides a view for you before asking you to animate it in and for destruction, it creates a clone of the element and after it's been removed by ember, it re-inserts the stripped clone so you can animate it away however you like. The removal and clone insertion happens so fast you can't notice and it simply appears like you are animating away the original element.

### Install:

    bower install ember-view-animate --save
    
    Or you can paste the contents of `ember-view-animate`

### Usage:

Simply add the mixin to a view and you get `needsAnimateIn` and `needsAnimateOut` to override. Both methods pass in a jQuery element you can add animations to. You **must** call `finished` after your animation in `needsAnimateOut`.

Javascript:

```js
App.YourView = Ember.View.extend(App.ViewAnimationMixin, {

  needsAnimateIn: function(element) {
    // since it's a jQuery element, you could also just do element.slideDown
    $(element).slideDown(function() {
      $(this).find('textarea').focus();
    });
  },
  
  needsAnimateOut: function(element, finished) {
    $(element).slideUp(function() {
      finished();
    });
  }
  
});
```

CoffeeScript:

```coffeescript
App.YourView = Ember.View.extend App.ViewAnimationMixin,

  needsAnimateIn: (element) ->
    $(element).slideDown ->
      $(this).find('textarea').focus()
      
  needsAnimateOut: (element, finished) ->
    $(element).slideUp ->
      finished()
```
