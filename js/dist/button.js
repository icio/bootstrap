/*!
  * Bootstrap button.js v4.4.1 (https://getbootstrap.com/)
  * Copyright 2011-2020 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
  * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
  */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('jquery')) :
  typeof define === 'function' && define.amd ? define(['jquery'], factory) :
  (global = global || self, global.Button = factory(global.jQuery));
}(this, (function ($) { 'use strict';

  $ = $ && Object.prototype.hasOwnProperty.call($, 'default') ? $['default'] : $;

  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
  }

  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */

  var NAME = 'button';
  var VERSION = '4.4.1';
  var DATA_KEY = 'bs.button';
  var EVENT_KEY = "." + DATA_KEY;
  var DATA_API_KEY = '.data-api';
  var JQUERY_NO_CONFLICT = $.fn[NAME];
  var ClassName = {
    ACTIVE: 'active',
    BUTTON: 'btn',
    FOCUS: 'focus'
  };
  var Selector = {
    DATA_TOGGLE_CARROT: '[data-toggle^="button"]',
    DATA_TOGGLES: '[data-toggle="buttons"]',
    DATA_TOGGLE: '[data-toggle="button"]',
    DATA_TOGGLES_BUTTONS: '[data-toggle="buttons"] .btn',
    DATA_TOGGLES_INPUTS: '[data-toggle="buttons"] input:not([type="hidden"])',
    DATA_TOGGLE_BUTTONS: '[data-toggle="button"], [data-toggle="buttons"] .btn',
    INPUT: 'input:not([type="hidden"])',
    ACTIVE: '.active',
    BUTTON: '.btn'
  };
  var Event = {
    CHANGE_DATA_API: "change" + EVENT_KEY + DATA_API_KEY,
    CLICK_DATA_API: "click" + EVENT_KEY + DATA_API_KEY,
    FOCUS_BLUR_DATA_API: "focus" + EVENT_KEY + DATA_API_KEY + " " + ("blur" + EVENT_KEY + DATA_API_KEY),
    LOAD_PAGESHOW_DATA_API: "load" + EVENT_KEY + DATA_API_KEY + " " + ("pageshow" + EVENT_KEY + DATA_API_KEY)
  };
  /**
   * ------------------------------------------------------------------------
   * Class Definition
   * ------------------------------------------------------------------------
   */

  var Button = /*#__PURE__*/function () {
    function Button(element) {
      this._element = element;
    } // Getters


    var _proto = Button.prototype;

    // Public
    _proto.toggle = function toggle() {
      if (Button._disabled(this._element)) {
        return;
      }

      var c = !Button._checked(this._element);

      var input = this._element.querySelector(Selector.INPUT);

      if (input) {
        input.checked = c;
        $(input).trigger('change');
      } else {
        this._element.setAttribute('aria-pressed', c);

        Button._update(this._element);
      }
    };

    _proto.dispose = function dispose() {
      $.removeData(this._element, DATA_KEY);
      this._element = null;
    } // Static
    ;

    Button._update = function _update(e) {
      e.classList.toggle(ClassName.ACTIVE, Button._checked(e));
    };

    Button._checked = function _checked(e) {
      var input = e.querySelector(Selector.INPUT);

      if (input) {
        return input.checked;
      }

      return e.getAttribute('aria-pressed') === 'true';
    };

    Button._disabled = function _disabled(e) {
      if (e.hasAttribute('disabled') || e.classList.contains('disabled')) {
        return true;
      }

      var input = e.querySelector(Selector.INPUT);
      return input && (input.hasAttribute('disabled') || input.classList.contains('disabled'));
    };

    Button._jQueryInterface = function _jQueryInterface(config) {
      return this.each(function () {
        var data = $(this).data(DATA_KEY);

        if (!data) {
          data = new Button(this);
          $(this).data(DATA_KEY, data);
        }

        if (config === 'toggle') {
          data[config]();
        }
      });
    };

    _createClass(Button, null, [{
      key: "VERSION",
      get: function get() {
        return VERSION;
      }
    }]);

    return Button;
  }();
  /**
   * ------------------------------------------------------------------------
   * Data Api implementation
   * ------------------------------------------------------------------------
   */


  $(document).on(Event.CHANGE_DATA_API, Selector.DATA_TOGGLES_INPUTS, function (event) {
    // Update all related inputs on change.
    var t = $(this);

    if (event.target.type === 'radio') {
      t = t.add(document.getElementsByName(event.target.name));
    }

    t.closest(Selector.BUTTON).each(function () {
      Button._update(this);
    });
  }).on(Event.CLICK_DATA_API, Selector.DATA_TOGGLE_CARROT, function (event) {
    // Find the containing .btn.
    var btn = $(event.target);

    if (!btn.hasClass(ClassName.BUTTON)) {
      btn = btn.closest(Selector.BUTTON);
    }

    if (!btn.length) {
      return;
    } // Don't allow disabled buttons to be toggled.


    if (Button._disabled(btn[0])) {
      event.preventDefault(); // work around Firefox bug #1540995

      return;
    } // label.btn > input will trigger a change event for the same click so we
    // don't repeat the toggle here.


    if (event.target.tagName === 'INPUT' || btn.length && btn[0].tagName === 'LABEL') {
      return;
    } // Toggle the btn.


    Button._jQueryInterface.call(btn, 'toggle'); // div.btn may not accept focus, so we give it to its input.


    btn.find(Selector.INPUT).trigger('focus');
  }).on(Event.FOCUS_BLUR_DATA_API, Selector.DATA_TOGGLE_CARROT, function (event) {
    // Add/remove class "focus" on focus[in]/focusout events.
    $(event.target).closest(Selector.BUTTON).toggleClass(ClassName.FOCUS, /^focus(in)?$/.test(event.type));
  });
  $(window).on(Event.LOAD_PAGESHOW_DATA_API, function () {
    // Ensure correct active class is set to match the controls' actual values/states.
    $(Selector.DATA_TOGGLE_BUTTONS).each(function () {
      Button._update(this);
    });
  });
  /**
   * ------------------------------------------------------------------------
   * jQuery
   * ------------------------------------------------------------------------
   */

  $.fn[NAME] = Button._jQueryInterface;
  $.fn[NAME].Constructor = Button;

  $.fn[NAME].noConflict = function () {
    $.fn[NAME] = JQUERY_NO_CONFLICT;
    return Button._jQueryInterface;
  };

  return Button;

})));
//# sourceMappingURL=button.js.map
