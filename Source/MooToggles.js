(function($) {

var MooToggles = new Class({

  Implements : [Options, Events],

  options : {
    activeClassName : 'active'
  },

  initialize : function(container,options) {
    this.setOptions(options);
    this.container = document.id(container);
    this.setupEvents();
  },

  setupEvents : function() {
    this.getContainer().addEvent('click:relay(a)',function(event,target) {
      event.stop();
      if(!this.isActiveButton(target)) {
        this.onOn(target);
        this.onChange(target);
      }
      else {
        this.onOff(target);
      }
    }.bind(this));
  },

  getContainer : function() {
    return this.container;
  },

  getButton : function(index) {
    return this.getButtons()[index];
  },

  getButtons : function() {
    return this.getContainer().getElements('a');
  },

  isActiveButton : function(button) {
    return button.hasClass(this.options.activeClassName);
  },

  setAsActive : function(button) {
    this.disableAll();
    button.addClass(this.options.activeClassName);
  },

  setAsInactive : function(button) {
    button.removeClass(this.options.activeClassName);
  },

  disableAll : function() {
    this.getButtons().each(this.setAsInactive,this);
  },

  getActiveButton : function() {
    return this.getContainer().getElement('a.'+this.options.activeClassName);
  },

  onChange : function(button) {
    this.fireEvent('change',[button,this.getContainer()]);
  },

  onOff : function(button) {
    this.setAsInactive(button);
    this.fireEvent('off',[button,this.getContainer()]);
  },

  onOn : function(button) {
    this.setAsActive(button);
    this.fireEvent('on',[button,this.getContainer()]);
  }

});

})(document.id);
