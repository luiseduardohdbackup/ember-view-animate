App.ViewAnimationMixin = Ember.Mixin.create


  _VAM_didInsertElement: (->
    if this.needsAnimateIn
      @$().hide()
      this.needsAnimateIn @$()
  ).on 'didInsertElement'


  _VAM_willDestroyElement: (->
    if this.needsAnimateOut
      $this = @$()
      clone = $this.clone()
      clone.find('script').remove()
      parent = $this.parent()
      idx = parent.children().index $this
      Ember.run.scheduleOnce 'afterRender', =>
        $(parent.children()[idx]).after clone
        this.needsAnimateOut clone, ->
          clone.remove()
  ).on 'willDestroyElement'
  
