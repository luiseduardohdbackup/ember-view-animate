App.ViewAnimationMixin = Ember.Mixin.create({

  _VAM_didInsertElement: (function() {
    if (this.needsAnimateIn) {
      this.$().hide();
      Ember.run.scheduleOnce('afterRender', function() {
        return this.needsAnimateIn(this.$());
      });
    }
  }).on('didInsertElement'),
  
  _VAM_willDestroyElement: (function() {
    var $this, clone, idx, parent,
      _this = this;
    if (this.needsAnimateOut) {
      $this = this.$();
      clone = $this.clone();
      clone.find('script').remove();
      parent = $this.parent();
      idx = parent.children().index($this);
      Ember.run.scheduleOnce('afterRender', function() {
        $(parent.children()[idx]).after(clone);
        return _this.needsAnimateOut(clone, function() {
          return clone.remove();
        });
      });
    }
  }).on('willDestroyElement')
  
});
