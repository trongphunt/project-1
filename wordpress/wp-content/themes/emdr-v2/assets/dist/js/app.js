/**
* app.js v3.0.0 by @fat and @mdo
* Copyright 2013 Twitter Inc.
* http://www.apache.org/licenses/LICENSE-2.0
*/
if (!jQuery) { throw new Error("Bootstrap requires jQuery") }

/* ========================================================================
 * Bootstrap: transition.js v3.0.0
 * http://twbs.github.com/bootstrap/javascript.html#transitions
 * ========================================================================
 * Copyright 2013 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ======================================================================== */


+function ($) { "use strict";

  // CSS TRANSITION SUPPORT (Shoutout: http://www.modernizr.com/)
  // ============================================================

  function transitionEnd() {
    var el = document.createElement('bootstrap')

    var transEndEventNames = {
      'WebkitTransition' : 'webkitTransitionEnd'
    , 'MozTransition'    : 'transitionend'
    , 'OTransition'      : 'oTransitionEnd otransitionend'
    , 'transition'       : 'transitionend'
    }

    for (var name in transEndEventNames) {
      if (el.style[name] !== undefined) {
        return { end: transEndEventNames[name] }
      }
    }
  }

  // http://blog.alexmaccaw.com/css-transitions
  $.fn.emulateTransitionEnd = function (duration) {
    var called = false, $el    = this
    $(this).one('webkitTransitionEnd', function () { called = true })
    var callback = function () { if (!called) $($el).trigger('webkitTransitionEnd') }
    setTimeout(callback, duration)
    return this
  }

  $(function () {
    $.support.transition = transitionEnd()
  })

}(window.jQuery);

/* ========================================================================
 * Bootstrap: button.js v3.0.0
 * http://twbs.github.com/bootstrap/javascript.html#buttons
 * ========================================================================
 * Copyright 2013 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ======================================================================== */


+function ($) { "use strict";

  // BUTTON PUBLIC CLASS DEFINITION
  // ==============================

  var Button = function (element, options) {
    this.$element = $(element)
    this.options  = $.extend({}, Button.DEFAULTS, options)
  }

  Button.DEFAULTS = {
    loadingText: 'loading...'
  }

  Button.prototype.setState = function (state) {
    var d    = 'disabled'
    var $el  = this.$element
    var val  = $el.is('input') ? 'val' : 'html'
    var data = $el.data()

    state = state + 'Text'

    if (!data.resetText) $el.data('resetText', $el[val]())

    $el[val](data[state] || this.options[state])

    // push to event loop to allow forms to submit
    setTimeout(function () {
      state == 'loadingText' ?
        $el.addClass(d).attr(d, d) :
        $el.removeClass(d).removeAttr(d);
    }, 0)
  }

  Button.prototype.toggle = function () {
    var $parent = this.$element.closest('[data-toggle="buttons"]')

    if ($parent.length) {
      var $input = this.$element.find('input').prop('checked', !this.$element.hasClass('active'))
      if ($input.prop('type') === 'radio') $parent.find('.active').removeClass('active')
    }

    this.$element.toggleClass('active')
  }


  // BUTTON PLUGIN DEFINITION
  // ========================

  var old = $.fn.button

  $.fn.button = function (option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('button')
      var options = typeof option == 'object' && option

      if (!data) $this.data('bs.button', (data = new Button(this, options)))

      if (option == 'toggle') data.toggle()
      else if (option) data.setState(option)
    })
  }

  $.fn.button.Constructor = Button


  // BUTTON NO CONFLICT
  // ==================

  $.fn.button.noConflict = function () {
    $.fn.button = old
    return this
  }


  // BUTTON DATA-API
  // ===============

  $(document).on('click.bs.button.data-api', '[data-toggle^=button]', function (e) {
    var $btn = $(e.target)
    if (!$btn.hasClass('btn')) $btn = $btn.closest('.btn')
    $btn.button('toggle')
    e.preventDefault()
  })

}(window.jQuery);

/* ========================================================================
 * Bootstrap: dropdown.js v3.0.0
 * http://twbs.github.com/bootstrap/javascript.html#dropdowns
 * ========================================================================
 * Copyright 2012 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ======================================================================== */


+function ($) { "use strict";

  // DROPDOWN CLASS DEFINITION
  // =========================

  var backdrop = '.dropdown-backdrop'
  var toggle   = '[data-toggle=dropdown]'
  var Dropdown = function (element) {
    var $el = $(element).on('click.bs.dropdown', this.toggle)
  }

  Dropdown.prototype.toggle = function (e) {
    var $this = $(this)

    if ($this.is('.disabled, :disabled')) return

    var $parent  = getParent($this)
    var isActive = $parent.hasClass('open')

    clearMenus()

    if (!isActive) {
      if ('ontouchstart' in document.documentElement) {
        // if mobile we we use a backdrop because click events don't delegate
        $('<div class="dropdown-backdrop"/>').insertAfter($(this)).on('click', clearMenus)
      }

      $parent.trigger(e = $.Event('show.bs.dropdown'))

      if (e.isDefaultPrevented()) return

      $parent
        .toggleClass('open')
        .trigger('shown.bs.dropdown')
    }

    $this.focus()

    return false
  }

  Dropdown.prototype.keydown = function (e) {
    if (!/(38|40|27)/.test(e.keyCode)) return

    var $this = $(this)

    e.preventDefault()
    e.stopPropagation()

    if ($this.is('.disabled, :disabled')) return

    var $parent  = getParent($this)
    var isActive = $parent.hasClass('open')

    if (!isActive || (isActive && e.keyCode == 27)) {
      if (e.which == 27) $parent.find(toggle).focus()
      return $this.click()
    }

    var $items = $('[role=menu] li:not(.divider):visible a', $parent)

    if (!$items.length) return

    var index = $items.index($items.filter(':focus'))

    if (e.keyCode == 38 && index > 0)                 index--                        // up
    if (e.keyCode == 40 && index < $items.length - 1) index++                        // down
    if (!~index)                                      index=0

    $items.eq(index).focus()
  }

  function clearMenus() {
    $(backdrop).remove()
    $(toggle).each(function (e) {
      var $parent = getParent($(this))
      if (!$parent.hasClass('open')) return
      $parent.trigger(e = $.Event('hide.bs.dropdown'))
      if (e.isDefaultPrevented()) return
      $parent.removeClass('open').trigger('hidden.bs.dropdown')
    })
  }

  function getParent($this) {
    var selector = $this.attr('data-target')

    if (!selector) {
      selector = $this.attr('href')
      selector = selector && /#/.test(selector) && selector.replace(/.*(?=#[^\s]*$)/, '') //strip for ie7
    }

    var $parent = selector && $(selector)

    return $parent && $parent.length ? $parent : $this.parent()
  }


  // DROPDOWN PLUGIN DEFINITION
  // ==========================

  var old = $.fn.dropdown

  $.fn.dropdown = function (option) {
    return this.each(function () {
      var $this = $(this)
      var data  = $this.data('dropdown')

      if (!data) $this.data('dropdown', (data = new Dropdown(this)))
      if (typeof option == 'string') data[option].call($this)
    })
  }

  $.fn.dropdown.Constructor = Dropdown


  // DROPDOWN NO CONFLICT
  // ====================

  $.fn.dropdown.noConflict = function () {
    $.fn.dropdown = old
    return this
  }


  // APPLY TO STANDARD DROPDOWN ELEMENTS
  // ===================================

  $(document)
    .on('click.bs.dropdown.data-api', clearMenus)
    .on('click.bs.dropdown.data-api', '.dropdown form', function (e) { e.stopPropagation() })
    .on('click.bs.dropdown.data-api'  , toggle, Dropdown.prototype.toggle)
    .on('keydown.bs.dropdown.data-api', toggle + ', [role=menu]' , Dropdown.prototype.keydown)

}(window.jQuery);

/* ========================================================================
 * Bootstrap: modal.js v3.0.0
 * http://twbs.github.com/bootstrap/javascript.html#modals
 * ========================================================================
 * Copyright 2012 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ======================================================================== */


+function ($) { "use strict";

  // MODAL CLASS DEFINITION
  // ======================

  var Modal = function (element, options) {
    this.options   = options
    this.$element  = $(element).on('click.dismiss.modal', '[data-dismiss="modal"]', $.proxy(this.hide, this))
    this.$backdrop =
    this.isShown   = null

    if (this.options.remote) this.$element.find('.modal-body').load(this.options.remote)
  }

  Modal.DEFAULTS = {
      backdrop: true
    , keyboard: true
    , show: true
  }

  Modal.prototype.toggle = function () {
    return this[!this.isShown ? 'show' : 'hide']()
  }

  Modal.prototype.show = function () {
    var that = this
    var e    = $.Event('show.bs.modal')

    this.$element.trigger(e)

    if (this.isShown || e.isDefaultPrevented()) return

    this.isShown = true

    this.escape()

    this.backdrop(function () {
      var transition = $.support.transition && that.$element.hasClass('fade')

      if (!that.$element.parent().length) {
        that.$element.appendTo(document.body) // don't move modals dom position
      }

      that.$element.show()

      if (transition) {
        that.$element[0].offsetWidth // force reflow
      }

      that.$element
        .addClass('in')
        .attr('aria-hidden', false)

      that.enforceFocus()

      transition ?
        that.$element
          .one($.support.transition.end, function () {
            that.$element.focus().trigger('shown.bs.modal')
          })
          .emulateTransitionEnd(300) :
        that.$element.focus().trigger('shown.bs.modal')
    })
  }

  Modal.prototype.hide = function (e) {
    if (e) e.preventDefault()

    e = $.Event('hide.bs.modal')

    this.$element.trigger(e)

    if (!this.isShown || e.isDefaultPrevented()) return

    this.isShown = false

    this.escape()

    $(document).off('focusin.bs.modal')

    this.$element
      .removeClass('in')
      .attr('aria-hidden', true)

    $.support.transition && this.$element.hasClass('fade') ?
      this.$element
        .one($.support.transition.end, $.proxy(this.hideModal, this))
        .emulateTransitionEnd(300) :
      this.hideModal()
  }

  Modal.prototype.enforceFocus = function () {
    $(document)
      .off('focusin.bs.modal') // guard against infinite focus loop
      .on('focusin.bs.modal', $.proxy(function (e) {
        if (this.$element[0] !== e.target && !this.$element.has(e.target).length) {
          this.$element.focus()
        }
      }, this))
  }

  Modal.prototype.escape = function () {
    if (this.isShown && this.options.keyboard) {
      this.$element.on('keyup.dismiss.bs.modal', $.proxy(function (e) {
        e.which == 27 && this.hide()
      }, this))
    } else if (!this.isShown) {
      this.$element.off('keyup.dismiss.bs.modal')
    }
  }

  Modal.prototype.hideModal = function () {
    var that = this
    this.$element.hide()
    this.backdrop(function () {
      that.removeBackdrop()
      that.$element.trigger('hidden.bs.modal')
    })
  }

  Modal.prototype.removeBackdrop = function () {
    this.$backdrop && this.$backdrop.remove()
    this.$backdrop = null
  }

  Modal.prototype.backdrop = function (callback) {
    var that    = this
    var animate = this.$element.hasClass('fade') ? 'fade' : ''

    if (this.isShown && this.options.backdrop) {
      var doAnimate = $.support.transition && animate

      this.$backdrop = $('<div class="modal-backdrop ' + animate + '" />')
        .appendTo(document.body)

      this.$element.on('click', $.proxy(function (e) {
        if (e.target !== e.currentTarget) return
        this.options.backdrop == 'static'
          ? this.$element[0].focus.call(this.$element[0])
          : this.hide.call(this)
      }, this))

      if (doAnimate) this.$backdrop[0].offsetWidth // force reflow

      this.$backdrop.addClass('in')

      if (!callback) return

      doAnimate ?
        this.$backdrop
          .one($.support.transition.end, callback)
          .emulateTransitionEnd(150) :
        callback()

    } else if (!this.isShown && this.$backdrop) {
      this.$backdrop.removeClass('in')

      $.support.transition && this.$element.hasClass('fade')?
        this.$backdrop
          .one($.support.transition.end, callback)
          .emulateTransitionEnd(150) :
        callback()

    } else if (callback) {
      callback()
    }
  }


  // MODAL PLUGIN DEFINITION
  // =======================

  var old = $.fn.modal

  $.fn.modal = function (option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.modal')
      var options = $.extend({}, Modal.DEFAULTS, $this.data(), typeof option == 'object' && option)

      if (!data) $this.data('bs.modal', (data = new Modal(this, options)))
      if (typeof option == 'string') data[option]()
      else if (options.show) data.show()
    })
  }

  $.fn.modal.Constructor = Modal


  // MODAL NO CONFLICT
  // =================

  $.fn.modal.noConflict = function () {
    $.fn.modal = old
    return this
  }


  // MODAL DATA-API
  // ==============

  $(document).on('click.bs.modal.data-api', '[data-toggle="modal"]', function (e) {
    var $this   = $(this)
    var href    = $this.attr('href')
    var $target = $($this.attr('data-target') || (href && href.replace(/.*(?=#[^\s]+$)/, ''))) //strip for ie7
    var option  = $target.data('modal') ? 'toggle' : $.extend({ remote:!/#/.test(href) && href }, $target.data(), $this.data())

    e.preventDefault()

    $target
      .modal(option)
      .one('hide', function () {
        $this.is(':visible') && $this.focus()
      })
  })

  var $body = $(document.body)
    .on('shown.bs.modal',  '.modal', function () { $body.addClass('modal-open') })
    .on('hidden.bs.modal', '.modal', function () { $body.removeClass('modal-open') })

}(window.jQuery);

/* ========================================================================
 * Bootstrap: tab.js v3.0.0
 * http://twbs.github.com/bootstrap/javascript.html#tabs
 * ========================================================================
 * Copyright 2012 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ======================================================================== */


+function ($) { "use strict";

  // TAB CLASS DEFINITION
  // ====================

  var Tab = function (element) {
    this.element = $(element)
  }

  Tab.prototype.show = function () {
    var $this    = this.element
    var $ul      = $this.closest('ul:not(.dropdown-menu)')
    var selector = $this.attr('data-target')

    if (!selector) {
      selector = $this.attr('href')
      selector = selector && selector.replace(/.*(?=#[^\s]*$)/, '') //strip for ie7
    }

    if ($this.parent('li').hasClass('active')) return

    var previous = $ul.find('.active:last a')[0]
    var e        = $.Event('show.bs.tab', {
      relatedTarget: previous
    })

    $this.trigger(e)

    if (e.isDefaultPrevented()) return

    var $target = $(selector)

    this.activate($this.parent('li'), $ul)
    this.activate($target, $target.parent(), function () {
      $this.trigger({
        type: 'shown.bs.tab'
      , relatedTarget: previous
      })
    })
  }

  Tab.prototype.activate = function (element, container, callback) {
    var $active    = container.find('> .active')
    var transition = callback
      && $.support.transition
      && $active.hasClass('fade')

    function next() {
      $active
        .removeClass('active')
        .find('> .dropdown-menu > .active')
        .removeClass('active')

      element.addClass('active')

      if (transition) {
        element[0].offsetWidth // reflow for transition
        element.addClass('in')
      } else {
        element.removeClass('fade')
      }

      if (element.parent('.dropdown-menu')) {
        element.closest('li.dropdown').addClass('active')
      }

      callback && callback()
    }

    transition ?
      $active
        .one($.support.transition.end, next)
        .emulateTransitionEnd(150) :
      next()

    $active.removeClass('in')
  }


  // TAB PLUGIN DEFINITION
  // =====================

  var old = $.fn.tab

  $.fn.tab = function ( option ) {
    return this.each(function () {
      var $this = $(this)
      var data  = $this.data('bs.tab')

      if (!data) $this.data('bs.tab', (data = new Tab(this)))
      if (typeof option == 'string') data[option]()
    })
  }

  $.fn.tab.Constructor = Tab


  // TAB NO CONFLICT
  // ===============

  $.fn.tab.noConflict = function () {
    $.fn.tab = old
    return this
  }


  // TAB DATA-API
  // ============

  $(document).on('click.bs.tab.data-api', '[data-toggle="tab"], [data-toggle="pill"]', function (e) {
    e.preventDefault()
    $(this).tab('show')
  })

}(window.jQuery);

/*
 * Snap.js
 *
 * Copyright 2013, Jacob Kelley - http://jakiestfu.com/
 * Released under the MIT Licence
 * http://opensource.org/licenses/MIT
 *
 * Github:  http://github.com/jakiestfu/Snap.js/
 * Version: 1.9.2
 */
/*jslint browser: true*/
/*global define, module, ender*/
(function(win, doc) {
    'use strict';
    var Snap = Snap || function(userOpts) {
        var settings = {
            element: null,
            dragger: null,
            disable: 'none',
            addBodyClasses: true,
            hyperextensible: true,
            resistance: 0.5,
            flickThreshold: 50,
            transitionSpeed: 0.3,
            easing: 'ease',
            maxPosition: 266,
            minPosition: -266,
            tapToClose: true,
            touchToDrag: true,
            slideIntent: 40, // degrees
            minDragDistance: 5
        },
        cache = {
            simpleStates: {
                opening: null,
                towards: null,
                hyperExtending: null,
                halfway: null,
                flick: null,
                translation: {
                    absolute: 0,
                    relative: 0,
                    sinceDirectionChange: 0,
                    percentage: 0
                }
            }
        },
        eventList = {},
        utils = {
            hasTouch: (doc.ontouchstart === null),
            eventType: function(action) {
                var eventTypes = {
                        down: (utils.hasTouch ? 'touchstart' : 'mousedown'),
                        move: (utils.hasTouch ? 'touchmove' : 'mousemove'),
                        up: (utils.hasTouch ? 'touchend' : 'mouseup'),
                        out: (utils.hasTouch ? 'touchcancel' : 'mouseout')
                    };
                return eventTypes[action];
            },
            page: function(t, e){
                return (utils.hasTouch && e.touches.length && e.touches[0]) ? e.touches[0]['page'+t] : e['page'+t];
            },
            klass: {
                has: function(el, name){
                    return (el.className).indexOf(name) !== -1;
                },
                add: function(el, name){
                    if(!utils.klass.has(el, name) && settings.addBodyClasses){
                        el.className += " "+name;
                    }
                },
                remove: function(el, name){
                    if(settings.addBodyClasses){
                        el.className = (el.className).replace(name, "").replace(/^\s+|\s+$/g, '');
                    }
                }
            },
            dispatchEvent: function(type) {
                if (typeof eventList[type] === 'function') {
                    return eventList[type].call();
                }
            },
            vendor: function(){
                var tmp = doc.createElement("div"),
                    prefixes = 'webkit Moz O ms'.split(' '),
                    i;
                for (i in prefixes) {
                    if (typeof tmp.style[prefixes[i] + 'Transition'] !== 'undefined') {
                        return prefixes[i];
                    }
                }
            },
            transitionCallback: function(){
                return (cache.vendor==='Moz' || cache.vendor==='ms') ? 'transitionend' : cache.vendor+'TransitionEnd';
            },
            canTransform: function(){
                return typeof settings.element.style[cache.vendor+'Transform'] !== 'undefined';
            },
            deepExtend: function(destination, source) {
                var property;
                for (property in source) {
                    if (source[property] && source[property].constructor && source[property].constructor === Object) {
                        destination[property] = destination[property] || {};
                        utils.deepExtend(destination[property], source[property]);
                    } else {
                        destination[property] = source[property];
                    }
                }
                return destination;
            },
            angleOfDrag: function(x, y) {
                var degrees, theta;
                // Calc Theta
                theta = Math.atan2(-(cache.startDragY - y), (cache.startDragX - x));
                if (theta < 0) {
                    theta += 2 * Math.PI;
                }
                // Calc Degrees
                degrees = Math.floor(theta * (180 / Math.PI) - 180);
                if (degrees < 0 && degrees > -180) {
                    degrees = 360 - Math.abs(degrees);
                }
                return Math.abs(degrees);
            },
            events: {
                addEvent: function addEvent(element, eventName, func) {
                    if (element.addEventListener) {
                        return element.addEventListener(eventName, func, false);
                    } else if (element.attachEvent) {
                        return element.attachEvent("on" + eventName, func);
                    }
                },
                removeEvent: function addEvent(element, eventName, func) {
                    if (element.addEventListener) {
                        return element.removeEventListener(eventName, func, false);
                    } else if (element.attachEvent) {
                        return element.detachEvent("on" + eventName, func);
                    }
                },
                prevent: function(e) {
                    if (e.preventDefault) {
                        e.preventDefault();
                    } else {
                        e.returnValue = false;
                    }
                }
            },
            parentUntil: function(el, attr) {
                var isStr = typeof attr === 'string';
                while (el.parentNode) {
                    if (isStr && el.getAttribute && el.getAttribute(attr)){
                        return el;
                    } else if(!isStr && el === attr){
                        return el;
                    }
                    el = el.parentNode;
                }
                return null;
            }
        },
        action = {
            translate: {
                get: {
                    matrix: function(index) {

                        if( !utils.canTransform() ){
                            return parseInt(settings.element.style.left, 10);
                        } else {
                            var matrix = win.getComputedStyle(settings.element)[cache.vendor+'Transform'].match(/\((.*)\)/),
                                ieOffset = 8;
                            if (matrix) {
                                matrix = matrix[1].split(',');
                                if(matrix.length===16){
                                    index+=ieOffset;
                                }
                                return parseInt(matrix[index], 10);
                            }
                            return 0;
                        }
                    }
                },
                easeCallback: function(){
                    settings.element.style[cache.vendor+'Transition'] = '';
                    cache.translation = action.translate.get.matrix(4);
                    cache.easing = false;
                    clearInterval(cache.animatingInterval);

                    if(cache.easingTo===0){
                        utils.klass.remove(doc.body, 'snapjs-right');
                        utils.klass.remove(doc.body, 'snapjs-left');
                    }

                    utils.dispatchEvent('animated');
                    utils.events.removeEvent(settings.element, utils.transitionCallback(), action.translate.easeCallback);
                },
                easeTo: function(n) {

                    if( !utils.canTransform() ){
                        cache.translation = n;
                        action.translate.x(n);
                    } else {
                        cache.easing = true;
                        cache.easingTo = n;

                        settings.element.style[cache.vendor+'Transition'] = 'all ' + settings.transitionSpeed + 's ' + settings.easing;

                        cache.animatingInterval = setInterval(function() {
                            utils.dispatchEvent('animating');
                        }, 1);
                        
                        utils.events.addEvent(settings.element, utils.transitionCallback(), action.translate.easeCallback);
                        action.translate.x(n);
                    }
                    if(n===0){
                           settings.element.style[cache.vendor+'Transform'] = '';
                       }
                },
                x: function(n) {
                    if( (settings.disable==='left' && n>0) ||
                        (settings.disable==='right' && n<0)
                    ){ return; }
                    
                    if( !settings.hyperextensible ){
                        if( n===settings.maxPosition || n>settings.maxPosition ){
                            n=settings.maxPosition;
                        } else if( n===settings.minPosition || n<settings.minPosition ){
                            n=settings.minPosition;
                        }
                    }
                    
                    n = parseInt(n, 10);
                    if(isNaN(n)){
                        n = 0;
                    }

                    if( utils.canTransform() ){
                        var theTranslate = 'translate3d(' + n + 'px, 0,0)';
                        settings.element.style[cache.vendor+'Transform'] = theTranslate;
                    } else {
                        settings.element.style.width = (win.innerWidth || doc.documentElement.clientWidth)+'px';

                        settings.element.style.left = n+'px';
                        settings.element.style.right = '';
                    }
                }
            },
            drag: {
                listen: function() {
                    cache.translation = 0;
                    cache.easing = false;
                    utils.events.addEvent(settings.element, utils.eventType('down'), action.drag.startDrag);
                    utils.events.addEvent(settings.element, utils.eventType('move'), action.drag.dragging);
                    utils.events.addEvent(settings.element, utils.eventType('up'), action.drag.endDrag);
                },
                stopListening: function() {
                    utils.events.removeEvent(settings.element, utils.eventType('down'), action.drag.startDrag);
                    utils.events.removeEvent(settings.element, utils.eventType('move'), action.drag.dragging);
                    utils.events.removeEvent(settings.element, utils.eventType('up'), action.drag.endDrag);
                },
                startDrag: function(e) {
                    // No drag on ignored elements
                    var target = e.target ? e.target : e.srcElement,
                        ignoreParent = utils.parentUntil(target, 'data-snap-ignore');
                    
                    if (ignoreParent) {
                        utils.dispatchEvent('ignore');
                        return;
                    }
                    
                    
                    if(settings.dragger){
                        var dragParent = utils.parentUntil(target, settings.dragger);
                        
                        // Only use dragger if we're in a closed state
                        if( !dragParent && 
                            (cache.translation !== settings.minPosition && 
                            cache.translation !== settings.maxPosition
                        )){
                            return;
                        }
                    }
                    
                    utils.dispatchEvent('start');
                    settings.element.style[cache.vendor+'Transition'] = '';
                    cache.isDragging = true;
                    cache.hasIntent = null;
                    cache.intentChecked = false;
                    cache.startDragX = utils.page('X', e);
                    cache.startDragY = utils.page('Y', e);
                    cache.dragWatchers = {
                        current: 0,
                        last: 0,
                        hold: 0,
                        state: ''
                    };
                    cache.simpleStates = {
                        opening: null,
                        towards: null,
                        hyperExtending: null,
                        halfway: null,
                        flick: null,
                        translation: {
                            absolute: 0,
                            relative: 0,
                            sinceDirectionChange: 0,
                            percentage: 0
                        }
                    };
                },
                dragging: function(e) {
                    if (cache.isDragging && settings.touchToDrag) {

                        var thePageX = utils.page('X', e),
                            thePageY = utils.page('Y', e),
                            translated = cache.translation,
                            absoluteTranslation = action.translate.get.matrix(4),
                            whileDragX = thePageX - cache.startDragX,
                            openingLeft = absoluteTranslation > 0,
                            translateTo = whileDragX,
                            diff;

                        // Shown no intent already
                        if((cache.intentChecked && !cache.hasIntent)){
                            return;
                        }

                        if(settings.addBodyClasses){
                            if((absoluteTranslation)>0){
                                utils.klass.add(doc.body, 'snapjs-left');
                                utils.klass.remove(doc.body, 'snapjs-right');
                            } else if((absoluteTranslation)<0){
                                utils.klass.add(doc.body, 'snapjs-right');
                                utils.klass.remove(doc.body, 'snapjs-left');
                            }
                        }

                        if (cache.hasIntent === false || cache.hasIntent === null) {
                            var deg = utils.angleOfDrag(thePageX, thePageY),
                                inRightRange = (deg >= 0 && deg <= settings.slideIntent) || (deg <= 360 && deg > (360 - settings.slideIntent)),
                                inLeftRange = (deg >= 180 && deg <= (180 + settings.slideIntent)) || (deg <= 180 && deg >= (180 - settings.slideIntent));
                            if (!inLeftRange && !inRightRange) {
                                cache.hasIntent = false;
                            } else {
                                cache.hasIntent = true;
                            }
                            cache.intentChecked = true;
                        }

                        if (
                            (settings.minDragDistance>=Math.abs(thePageX-cache.startDragX)) || // Has user met minimum drag distance?
                            (cache.hasIntent === false)
                        ) {
                            return;
                        }

                        utils.events.prevent(e);
                        utils.dispatchEvent('drag');

                        cache.dragWatchers.current = thePageX;
                        // Determine which direction we are going
                        if (cache.dragWatchers.last > thePageX) {
                            if (cache.dragWatchers.state !== 'left') {
                                cache.dragWatchers.state = 'left';
                                cache.dragWatchers.hold = thePageX;
                            }
                            cache.dragWatchers.last = thePageX;
                        } else if (cache.dragWatchers.last < thePageX) {
                            if (cache.dragWatchers.state !== 'right') {
                                cache.dragWatchers.state = 'right';
                                cache.dragWatchers.hold = thePageX;
                            }
                            cache.dragWatchers.last = thePageX;
                        }
                        if (openingLeft) {
                            // Pulling too far to the right
                            if (settings.maxPosition < absoluteTranslation) {
                                diff = (absoluteTranslation - settings.maxPosition) * settings.resistance;
                                translateTo = whileDragX - diff;
                            }
                            cache.simpleStates = {
                                opening: 'left',
                                towards: cache.dragWatchers.state,
                                hyperExtending: settings.maxPosition < absoluteTranslation,
                                halfway: absoluteTranslation > (settings.maxPosition / 2),
                                flick: Math.abs(cache.dragWatchers.current - cache.dragWatchers.hold) > settings.flickThreshold,
                                translation: {
                                    absolute: absoluteTranslation,
                                    relative: whileDragX,
                                    sinceDirectionChange: (cache.dragWatchers.current - cache.dragWatchers.hold),
                                    percentage: (absoluteTranslation/settings.maxPosition)*100
                                }
                            };
                        } else {
                            // Pulling too far to the left
                            if (settings.minPosition > absoluteTranslation) {
                                diff = (absoluteTranslation - settings.minPosition) * settings.resistance;
                                translateTo = whileDragX - diff;
                            }
                            cache.simpleStates = {
                                opening: 'right',
                                towards: cache.dragWatchers.state,
                                hyperExtending: settings.minPosition > absoluteTranslation,
                                halfway: absoluteTranslation < (settings.minPosition / 2),
                                flick: Math.abs(cache.dragWatchers.current - cache.dragWatchers.hold) > settings.flickThreshold,
                                translation: {
                                    absolute: absoluteTranslation,
                                    relative: whileDragX,
                                    sinceDirectionChange: (cache.dragWatchers.current - cache.dragWatchers.hold),
                                    percentage: (absoluteTranslation/settings.minPosition)*100
                                }
                            };
                        }
                        action.translate.x(translateTo + translated);
                    }
                },
                endDrag: function(e) {
                    if (cache.isDragging) {
                        utils.dispatchEvent('end');
                        var translated = action.translate.get.matrix(4);

                        // Tap Close
                        if (cache.dragWatchers.current === 0 && translated !== 0 && settings.tapToClose) {
                            utils.dispatchEvent('close');
                            utils.events.prevent(e);
                            action.translate.easeTo(0);
                            cache.isDragging = false;
                            cache.startDragX = 0;
                            return;
                        }

                        // Revealing Left
                        if (cache.simpleStates.opening === 'left') {
                            // Halfway, Flicking, or Too Far Out
                            if ((cache.simpleStates.halfway || cache.simpleStates.hyperExtending || cache.simpleStates.flick)) {
                                if (cache.simpleStates.flick && cache.simpleStates.towards === 'left') { // Flicking Closed
                                    action.translate.easeTo(0);
                                } else if (
                                    (cache.simpleStates.flick && cache.simpleStates.towards === 'right') || // Flicking Open OR
                                    (cache.simpleStates.halfway || cache.simpleStates.hyperExtending) // At least halfway open OR hyperextending
                                ) {
                                    action.translate.easeTo(settings.maxPosition); // Open Left
                                }
                            } else {
                                action.translate.easeTo(0); // Close Left
                            }
                            // Revealing Right
                        } else if (cache.simpleStates.opening === 'right') {
                            // Halfway, Flicking, or Too Far Out
                            if ((cache.simpleStates.halfway || cache.simpleStates.hyperExtending || cache.simpleStates.flick)) {
                                if (cache.simpleStates.flick && cache.simpleStates.towards === 'right') { // Flicking Closed
                                    action.translate.easeTo(0);
                                } else if (
                                    (cache.simpleStates.flick && cache.simpleStates.towards === 'left') || // Flicking Open OR
                                    (cache.simpleStates.halfway || cache.simpleStates.hyperExtending) // At least halfway open OR hyperextending
                                ) {
                                    action.translate.easeTo(settings.minPosition); // Open Right
                                }
                            } else {
                                action.translate.easeTo(0); // Close Right
                            }
                        }
                        cache.isDragging = false;
                        cache.startDragX = utils.page('X', e);
                    }
                }
            }
        },
        init = function(opts) {
            if (opts.element) {
                utils.deepExtend(settings, opts);
                cache.vendor = utils.vendor();
                action.drag.listen();
            }
        };
        /*
         * Public
         */
        this.open = function(side) {
            utils.dispatchEvent('open');
            utils.klass.remove(doc.body, 'snapjs-expand-left');
            utils.klass.remove(doc.body, 'snapjs-expand-right');

            if (side === 'left') {
                cache.simpleStates.opening = 'left';
                cache.simpleStates.towards = 'right';
                utils.klass.add(doc.body, 'snapjs-left');
                utils.klass.remove(doc.body, 'snapjs-right');
                action.translate.easeTo(settings.maxPosition);
            } else if (side === 'right') {
                cache.simpleStates.opening = 'right';
                cache.simpleStates.towards = 'left';
                utils.klass.remove(doc.body, 'snapjs-left');
                utils.klass.add(doc.body, 'snapjs-right');
                action.translate.easeTo(settings.minPosition);
            }
        };
        this.close = function() {
            utils.dispatchEvent('close');
            action.translate.easeTo(0);
        };
        this.expand = function(side){
            var to = win.innerWidth || doc.documentElement.clientWidth;

            if(side==='left'){
                utils.dispatchEvent('expandLeft');
                utils.klass.add(doc.body, 'snapjs-expand-left');
                utils.klass.remove(doc.body, 'snapjs-expand-right');
            } else {
                utils.dispatchEvent('expandRight');
                utils.klass.add(doc.body, 'snapjs-expand-right');
                utils.klass.remove(doc.body, 'snapjs-expand-left');
                to *= -1;
            }
            action.translate.easeTo(to);
        };

        this.on = function(evt, fn) {
            eventList[evt] = fn;
            return this;
        };
        this.off = function(evt) {
            if (eventList[evt]) {
                eventList[evt] = false;
            }
        };

        this.enable = function() {
            utils.dispatchEvent('enable');
            action.drag.listen();
        };
        this.disable = function() {
            utils.dispatchEvent('disable');
            action.drag.stopListening();
        };

        this.settings = function(opts){
            utils.deepExtend(settings, opts);
        };

        this.state = function() {
            var state,
                fromLeft = action.translate.get.matrix(4);
            if (fromLeft === settings.maxPosition) {
                state = 'left';
            } else if (fromLeft === settings.minPosition) {
                state = 'right';
            } else {
                state = 'closed';
            }
            return {
                state: state,
                info: cache.simpleStates
            };
        };
        init(userOpts);
    };
    if ((typeof module !== 'undefined') && module.exports) {
        module.exports = Snap;
    }
    if (typeof ender === 'undefined') {
        this.Snap = Snap;
    }
    if ((typeof define === "function") && define.amd) {
        define("snap", [], function() {
            return Snap;
        });
    }
}).call(this, window, document);

/*!
 * bootstrap-select v1.0
 * http://silviomoreto.github.io/bootstrap-select/
 *
 * Copyright 2013 bootstrap-select
 * Licensed under the MIT license
 */
!function($) {

    "use strict";

    var Selectpicker = function(element, options, e) {
        if (e) {
            e.stopPropagation();
            e.preventDefault();
        }
        this.$element = $(element);
        this.$newElement = null;
        this.$button = null;
        this.$menu = null;

        //Merge defaults, options and data-attributes to make our options
        this.options = $.extend({}, $.fn.selectpicker.defaults, this.$element.data(), typeof options == 'object' && options);

        //If we have no title yet, check the attribute 'title' (this is missed by jq as its not a data-attribute
        if (this.options.title == null) {
            this.options.title = this.$element.attr('title');
        }

        //Expose public methods
        this.val = Selectpicker.prototype.val;
        this.render = Selectpicker.prototype.render;
        this.refresh = Selectpicker.prototype.refresh;
        this.setStyle = Selectpicker.prototype.setStyle;
        this.selectAll = Selectpicker.prototype.selectAll;
        this.deselectAll = Selectpicker.prototype.deselectAll;
        this.init();
    };

    Selectpicker.prototype = {

        constructor: Selectpicker,

        init: function(e) {
            this.$element.hide();
            this.multiple = this.$element.prop('multiple');
            var id = this.$element.attr('id');
            this.$newElement = this.createView();
            this.$element.after(this.$newElement);
            this.$menu = this.$newElement.find('> .dropdown-menu');
            this.$button = this.$newElement.find('> button');

            if (id !== undefined) {
                var _this = this;
                this.$button.attr('data-id', id);
                $('label[for="' + id + '"]').click(function() {
                    _this.$button.focus();
                });
            }

            //If we are multiple, then add the show-tick class by default
            if (this.multiple) {
                 this.$newElement.addClass('show-tick');
            }

            this.checkDisabled();
            this.checkTabIndex();
            this.clickListener();
            this.render();
            this.liHeight();
            this.setWidth();
            this.setStyle();
            if (this.options.container) {
                this.selectPosition();
            }
        },

        createDropdown: function() {
            var drop =
                "<div class='btn-group bootstrap-select'>" +
                    "<button type='button' class='btn btn-default dropdown-toggle' data-toggle='dropdown'>" +
                        "<div class='filter-option pull-left'></div>&nbsp;" +
                        "<div class='caret'></div>" +
                    "</button>" +
                    "<div class='dropdown-menu open'>" +
                        "<ul class='dropdown-menu inner' role='menu'>" +
                        "</ul>" +
                    "</div>" +
                "</div>";

            return $(drop);
        },

        createView: function() {
            var $drop = this.createDropdown();
            var $li = this.createLi();
            $drop.find('ul').append($li);
            return $drop;
        },

        reloadLi: function() {
            //Remove all children.
            this.destroyLi();
            //Re build
            var $li = this.createLi();
            this.$newElement.find('ul').append( $li );
        },

        destroyLi: function() {
            this.$newElement.find('li').remove();
        },

        createLi: function() {
            var _this = this,
                _liA = [],
                _liHtml = '';

            this.$element.find('option').each(function(index) {
                var $this = $(this);

                //Get the class and text for the option
                var optionClass = $this.attr("class") || '';
                var inline = $this.attr("style") || '';
                var text =  $this.data('content') ? $this.data('content') : $this.html();
                var subtext = $this.data('subtext') !== undefined ? '<small class="muted">' + $this.data('subtext') + '</small>' : '';
                var icon = $this.data('icon') !== undefined ? '<i class="'+$this.data('icon')+'"></i> ' : '';
                if (icon !== '' && ($this.is(':disabled') || $this.parent().is(':disabled'))) {
                    icon = '<span>'+icon+'</span>';
                }

                if (!$this.data('content')) {
                    //Prepend any icon and append any subtext to the main text.
                    text = icon + '<span class="text">' + text + subtext + '</span>';
                }

                if (_this.options.hideDisabled && ($this.is(':disabled') || $this.parent().is(':disabled'))) {
                    _liA.push('<a style="min-height: 0; padding: 0"></a>');
                } else if ($this.parent().is('optgroup') && $this.data('divider') != true) {
                    if ($this.index() == 0) {
                        //Get the opt group label
                        var label = $this.parent().attr('label');
                        var labelSubtext = $this.parent().data('subtext') !== undefined ? '<small class="muted">'+$this.parent().data('subtext')+'</small>' : '';
                        var labelIcon = $this.parent().data('icon') ? '<i class="'+$this.parent().data('icon')+'"></i> ' : '';
                        label = labelIcon + '<span class="text">' + label + labelSubtext + '</span>';

                        if ($this[0].index != 0) {
                            _liA.push(
                                '<div class="div-contain"><div class="divider"></div></div>'+
                                '<dt>'+label+'</dt>'+
                                _this.createA(text, "opt " + optionClass, inline )
                                );
                        } else {
                            _liA.push(
                                '<dt>'+label+'</dt>'+
                                _this.createA(text, "opt " + optionClass, inline ));
                        }
                    } else {
                         _liA.push( _this.createA(text, "opt " + optionClass, inline ) );
                    }
                } else if ($this.data('divider') == true) {
                    _liA.push('<div class="div-contain"><div class="divider"></div></div>');
                } else if ($(this).data('hidden') == true) {
                    _liA.push('');
                } else {
                    _liA.push( _this.createA(text, optionClass, inline ) );
                }
            });

            $.each(_liA, function(i, item) {
                _liHtml += "<li rel=" + i + ">" + item + "</li>";
            });

            //If we are not multiple, and we dont have a selected item, and we dont have a title, select the first element so something is set in the button
            if (!this.multiple && this.$element.find('option:selected').length==0 && !_this.options.title) {
                this.$element.find('option').eq(0).prop('selected', true).attr('selected', 'selected');
            }

            return $(_liHtml);
        },

        createA: function(text, classes, inline) {
            return '<a tabindex="0" class="'+classes+'" style="'+inline+'">' +
                 text +
                 '<i class="icon-ok check-mark"></i>' +
                 '</a>';
        },

        render: function() {
            var _this = this;

            //Update the LI to match the SELECT
            this.$element.find('option').each(function(index) {
               _this.setDisabled(index, $(this).is(':disabled') || $(this).parent().is(':disabled') );
               _this.setSelected(index, $(this).is(':selected') );
            });

            var selectedItems = this.$element.find('option:selected').map(function(index,value) {
                var $this = $(this);
                var icon = $this.data('icon') && _this.options.showIcon ? '<i class="' + $this.data('icon') + '"></i> ' : '';
                var subtext;
                if (_this.options.showSubtext && $this.attr('data-subtext') && !_this.multiple) {
                    subtext = ' <small class="muted">'+$this.data('subtext') +'</small>';
                } else {
                    subtext = '';
                }
                if ($this.data('content') && _this.options.showContent) {
                    return $this.data('content');
                } else if ($this.attr('title') != undefined) {
                    return $this.attr('title');
                } else {
                    return icon + $this.html() + subtext;
                }
            }).toArray();

            //Fixes issue in IE10 occurring when no default option is selected and at least one option is disabled
            //Convert all the values into a comma delimited string
            var title = !this.multiple ? selectedItems[0] : selectedItems.join(", ");

            //If this is multi select, and the selectText type is count, the show 1 of 2 selected etc..
            if (_this.multiple && _this.options.selectedTextFormat.indexOf('count') > -1) {
                var max = _this.options.selectedTextFormat.split(">");
                var notDisabled = this.options.hideDisabled ? ':not([disabled])' : '';
                if ( (max.length>1 && selectedItems.length > max[1]) || (max.length==1 && selectedItems.length>=2)) {
                    title = _this.options.countSelectedText.replace('{0}', selectedItems.length).replace('{1}', this.$element.find('option:not([data-divider="true"]):not([data-hidden="true"])'+notDisabled).length);
                }
             }

            //If we dont have a title, then use the default, or if nothing is set at all, use the not selected text
            if (!title) {
                title = _this.options.title != undefined ? _this.options.title : _this.options.noneSelectedText;
            }

            _this.$newElement.find('.filter-option').html(title);
        },

        setStyle: function(style, status) {
            if (this.$element.attr('class')) {
                this.$newElement.addClass(this.$element.attr('class').replace(/selectpicker|mobile-device/gi, ''));
            }

            var buttonClass = style ? style : this.options.style;

            if (status == 'add') {
                this.$button.addClass(buttonClass);
            } else {
                this.$button.removeClass(this.options.style);
                this.$button.addClass(buttonClass);
            }
        },

        liHeight: function() {
            var selectClone = this.$newElement.clone();
            selectClone.appendTo('body');
            var liHeight = selectClone.addClass('open').find('.dropdown-menu li > a').outerHeight();
            selectClone.remove();
            this.$newElement.data('liHeight', liHeight);
        },

        setSize: function() {
            var _this = this,
                menu = this.$menu,
                menuInner = menu.find('.inner'),
                menuA = menuInner.find('li > a'),
                selectHeight = this.$newElement.outerHeight(),
                liHeight = this.$newElement.data('liHeight'),
                divHeight = menu.find('li .divider').outerHeight(true),
                menuPadding = parseInt(menu.css('padding-top')) +
                              parseInt(menu.css('padding-bottom')) +
                              parseInt(menu.css('border-top-width')) +
                              parseInt(menu.css('border-bottom-width')),
                notDisabled = this.options.hideDisabled ? ':not(.disabled)' : '',
                menuHeight;
            if (this.options.size == 'auto') {
                var getSize = function() {
                    var selectOffset_top = _this.$newElement.offset().top;
                    var selectOffset_top_scroll = selectOffset_top - $(window).scrollTop();
                    var windowHeight = $(window).height();
                    var menuExtras = menuPadding + parseInt(menu.css('margin-top')) + parseInt(menu.css('margin-bottom')) + 2;
                    var selectOffset_bot = windowHeight - selectOffset_top_scroll - selectHeight - menuExtras;
                    var minHeight;
                    menuHeight = selectOffset_bot;
                    if (_this.$newElement.hasClass('dropup')) {
                        menuHeight = selectOffset_top_scroll - menuExtras;
                    }
                    if ((menu.find('li').length + menu.find('dt').length) > 3) {
                        minHeight = liHeight*3 + menuExtras - 2;
                    } else {
                        minHeight = 0;
                    }
                    menu.css({'max-height' : menuHeight + 'px', 'overflow' : 'hidden', 'min-height' : minHeight + 'px'});
                    menuInner.css({'max-height' : (menuHeight - menuPadding) + 'px', 'overflow-y' : 'auto'});
            }
                getSize();
                $(window).resize(getSize);
                $(window).scroll(getSize);
            } else if (this.options.size && this.options.size != 'auto' && menu.find('li'+notDisabled).length > this.options.size) {
                var optIndex = menu.find("li"+notDisabled+" > *").filter(':not(.div-contain)').slice(0,this.options.size).last().parent().index();
                var divLength = menu.find("li").slice(0,optIndex + 1).find('.div-contain').length;
                menuHeight = liHeight*this.options.size + divLength*divHeight + menuPadding;
                menu.css({'max-height' : menuHeight + 'px', 'overflow' : 'hidden'});
                menuInner.css({'max-height' : (menuHeight - menuPadding) + 'px', 'overflow-y' : 'auto'});
            }
        },

        setWidth: function() {
            //Set width of select
            if (this.options.width == 'auto') {
                this.$menu.css('min-width','0');

                // Get correct width if element hidden
                var selectClone = this.$newElement.clone().appendTo('body');
                var ulWidth = selectClone.find('> .dropdown-menu').css('width');
                selectClone.remove();

                this.$newElement.css('width',ulWidth);
            } else if (this.options.width) {
                this.$newElement.css('width',this.options.width);
            }
        },

        selectPosition: function() {
            var _this = this,
                drop = "<div />",
                $drop = $(drop),
                pos,
                actualHeight,
                getPlacement = function($element) {
                    $drop.addClass($element.attr('class').replace(/open/gi, ''));
                    pos = $element.offset();
                    actualHeight = $element[0].offsetHeight;
                    $drop.css({'top' : pos.top + actualHeight, 'left' : pos.left, 'width' : $element[0].offsetWidth, 'position' : 'absolute'});
                };
            this.$newElement.on('click', function() {
                getPlacement($(this));
                $drop.toggleClass('open');
                $drop.append(_this.$menu);
                $drop.appendTo(_this.options.container);
                return false;
            });
            $(window).resize(function() {
                getPlacement(_this.$newElement);
            });
            $(window).scroll(function() {
                getPlacement(_this.$newElement);
            });
            $('html').on('click', function() {
                $drop.removeClass('open');
            });
        },

        mobile: function() {
            this.$element.addClass('mobile-device').appendTo(this.$newElement);
            if (this.options.container) this.$menu.hide();
        },

        refresh: function() {
            this.reloadLi();
            this.render();
            this.setWidth();
            this.setStyle();
            this.checkDisabled();
        },

        setSelected: function(index, selected) {
            this.$menu.find('li').eq(index).toggleClass('selected', selected);
        },

        setDisabled: function(index, disabled) {
            if (disabled) {
                this.$menu.find('li').eq(index).addClass('disabled').find('a').attr('href','#').attr('tabindex',-1);
            } else {
                this.$menu.find('li').eq(index).removeClass('disabled').find('a').removeAttr('href').attr('tabindex',0);
            }
        },

        isDisabled: function() {
            return this.$element.is(':disabled');
        },

        checkDisabled: function() {
            var _this = this;
            if (this.isDisabled()) {
                this.$button.addClass('disabled');
                this.$button.attr('tabindex','-1');
            } else if (this.$button.hasClass('disabled')) {
                this.$button.removeClass('disabled');
                this.$button.removeAttr('tabindex');
            }
            this.$button.click(function() {
                return !_this.isDisabled();
            });
        },

        checkTabIndex: function() {
            if (this.$element.is('[tabindex]')) {
                var tabindex = this.$element.attr("tabindex");
                this.$button.attr('tabindex', tabindex);
            }
        },

        clickListener: function() {
            var _this = this;

            $('body').on('touchstart.dropdown', '.dropdown-menu', function(e) {
                e.stopPropagation();
            });

            this.$newElement.on('click', function() {
                _this.setSize();
            });

            this.$menu.on('click', 'li a', function(e) {
                var clickedIndex = $(this).parent().index(),
                    $this = $(this).parent(),
                    prevValue = _this.$element.val();

                //Dont close on multi choice menu
                if (_this.multiple) {
                    e.stopPropagation();
                }

                e.preventDefault();

                //Dont run if we have been disabled
                if (!_this.isDisabled() && !$(this).parent().hasClass('disabled')) {
                    var $options = _this.$element.find('option');
                    var $option = $options.eq(clickedIndex);

                    //Deselect all others if not multi select box
                    if (!_this.multiple) {
                        $options.prop('selected', false);
                        $option.prop('selected', true);
                    }
                    //Else toggle the one we have chosen if we are multi select.
                    else {
                        var state = $option.prop('selected');

                        $option.prop('selected', !state);
                    }

                    _this.$button.focus();

                    // Trigger select 'change'
                    if (prevValue != _this.$element.val()) {
                        _this.$element.change();
                    }
                }
            });

            this.$menu.on('click', 'li.disabled a, li dt, li .div-contain', function(e) {
                e.preventDefault();
                e.stopPropagation();
                _this.$button.focus();
            });

            this.$element.change(this.render.bind(this));
        },

        val: function(value) {

            if (value != undefined) {
                this.$element.val( value );

                this.$element.change();
                return this.$element;
            } else {
                return this.$element.val();
            }
        },

        selectAll: function() {
            this.$element.find('option').prop('selected', true).attr('selected', 'selected');
            this.render();
        },

        deselectAll: function() {
            this.$element.find('option').prop('selected', false).removeAttr('selected');
            this.render();
        },

        keydown: function(e) {
            var $this,
                $items,
                $parent,
                index,
                next,
                first,
                last,
                prev,
                nextPrev;

            $this = $(this);

            $parent = $this.parent();

            $items = $('[role=menu] li:not(.divider):visible a', $parent);

            if (!$items.length) return;

            if (/(38|40)/.test(e.keyCode)) {

                index = $items.index($items.filter(':focus'));

                first = $items.parent(':not(.disabled)').first().index();
                last = $items.parent(':not(.disabled)').last().index();
                next = $items.eq(index).parent().nextAll(':not(.disabled)').eq(0).index();
                prev = $items.eq(index).parent().prevAll(':not(.disabled)').eq(0).index();
                nextPrev = $items.eq(next).parent().prevAll(':not(.disabled)').eq(0).index();

                if (e.keyCode == 38) {
                    if (index != nextPrev && index > prev) index = prev;
                    if (index < first) index = first;
                }

                if (e.keyCode == 40) {
                    if (index != nextPrev && index < next) index = next;
                    if (index > last) index = last;
                }

                $items.eq(index).focus();
            } else {
                var keyCodeMap = {
                    48:"0", 49:"1", 50:"2", 51:"3", 52:"4", 53:"5", 54:"6", 55:"7", 56:"8", 57:"9", 59:";",
                    65:"a", 66:"b", 67:"c", 68:"d", 69:"e", 70:"f", 71:"g", 72:"h", 73:"i", 74:"j", 75:"k", 76:"l",
                    77:"m", 78:"n", 79:"o", 80:"p", 81:"q", 82:"r", 83:"s", 84:"t", 85:"u", 86:"v", 87:"w", 88:"x", 89:"y", 90:"z",
                    96:"0", 97:"1", 98:"2", 99:"3", 100:"4", 101:"5", 102:"6", 103:"7", 104:"8", 105:"9"
                }

                var keyIndex = [];

                $items.each(function() {
                    if ($(this).parent().is(':not(.disabled)')) {
                        if ($.trim($(this).text().toLowerCase()).substring(0,1) == keyCodeMap[e.keyCode]) {
                            keyIndex.push($(this).parent().index());
                        }
                    }
                });

                var count = $(document).data('keycount');
                count++;
                $(document).data('keycount',count);

                var prevKey = $.trim($(':focus').text().toLowerCase()).substring(0,1);

                if (prevKey != keyCodeMap[e.keyCode]) {
                    count = 1;
                    $(document).data('keycount',count);
                } else if (count >= keyIndex.length) {
                    $(document).data('keycount',0);
                }

                $items.eq(keyIndex[count - 1]).focus();
            }

            if (/(13)/.test(e.keyCode)) {
                $(':focus').click();
                $parent.addClass('open');
                $(document).data('keycount',0);
            }
        },

        hide: function() {
            this.$newElement.hide();
        },

        show: function() {
            this.$newElement.show();
        },

        destroy: function() {
            this.$newElement.remove();
            this.$element.remove();
        }
    };

    $.fn.selectpicker = function(option, event) {
       //get the args of the outer function..
       var args = arguments;
       var value;
       var chain = this.each(function() {
            if ($(this).is('select')) {
                var $this = $(this),
                    data = $this.data('selectpicker'),
                    options = typeof option == 'object' && option;

                if (!data) {
                    $this.data('selectpicker', (data = new Selectpicker(this, options, event)));
                } else if (options) {
                    for(var i in options) {
                       data.options[i] = options[i];
                    }
                }

                if (typeof option == 'string') {
                    //Copy the value of option, as once we shift the arguments
                    //it also shifts the value of option.
                    var property = option;
                    if (data[property] instanceof Function) {
                        [].shift.apply(args);
                        value = data[property].apply(data, args);
                    } else {
                        value = data.options[property];
                    }
                }
            }
        });

        if (value != undefined) {
            return value;
        } else {
            return chain;
        }
    };

    $.fn.selectpicker.defaults = {
        style: null,
        size: 'auto',
        title: null,
        selectedTextFormat : 'values',
        noneSelectedText : 'Nothing selected',
        countSelectedText: '{0} of {1} selected',
        width: null,
        container: false,
        hideDisabled: false,
        showSubtext: false,
        showIcon: true,
        showContent: true
    }

    $(document)
        .data('keycount', 0)
        .on('keydown', '[data-toggle=dropdown], [role=menu]' , Selectpicker.prototype.keydown)

}(window.jQuery);

/*
 * jQuery Easing v1.3 - http://gsgd.co.uk/sandbox/jquery/easing/
 *
 * Uses the built in easing capabilities added In jQuery 1.1
 * to offer multiple easing options
 *
 * TERMS OF USE - jQuery Easing
 * 
 * Open source under the BSD License. 
 * 
 * Copyright © 2008 George McGinley Smith
 * All rights reserved.
 * 
 * Redistribution and use in source and binary forms, with or without modification, 
 * are permitted provided that the following conditions are met:
 * 
 * Redistributions of source code must retain the above copyright notice, this list of 
 * conditions and the following disclaimer.
 * Redistributions in binary form must reproduce the above copyright notice, this list 
 * of conditions and the following disclaimer in the documentation and/or other materials 
 * provided with the distribution.
 * 
 * Neither the name of the author nor the names of contributors may be used to endorse 
 * or promote products derived from this software without specific prior written permission.
 * 
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY 
 * EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE
 *  COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL,
 *  EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE
 *  GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED 
 * AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
 *  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED 
 * OF THE POSSIBILITY OF SUCH DAMAGE. 
 *
*/

// t: current time, b: begInnIng value, c: change In value, d: duration
jQuery.easing['jswing'] = jQuery.easing['swing'];

jQuery.extend( jQuery.easing,
{
  def: 'easeOutQuad',
  swing: function (x, t, b, c, d) {
    //alert(jQuery.easing.default);
    return jQuery.easing[jQuery.easing.def](x, t, b, c, d);
  },
  easeInQuad: function (x, t, b, c, d) {
    return c*(t/=d)*t + b;
  },
  easeOutQuad: function (x, t, b, c, d) {
    return -c *(t/=d)*(t-2) + b;
  },
  easeInOutQuad: function (x, t, b, c, d) {
    if ((t/=d/2) < 1) return c/2*t*t + b;
    return -c/2 * ((--t)*(t-2) - 1) + b;
  },
  easeInCubic: function (x, t, b, c, d) {
    return c*(t/=d)*t*t + b;
  },
  easeOutCubic: function (x, t, b, c, d) {
    return c*((t=t/d-1)*t*t + 1) + b;
  },
  easeInOutCubic: function (x, t, b, c, d) {
    if ((t/=d/2) < 1) return c/2*t*t*t + b;
    return c/2*((t-=2)*t*t + 2) + b;
  },
  easeInQuart: function (x, t, b, c, d) {
    return c*(t/=d)*t*t*t + b;
  },
  easeOutQuart: function (x, t, b, c, d) {
    return -c * ((t=t/d-1)*t*t*t - 1) + b;
  },
  easeInOutQuart: function (x, t, b, c, d) {
    if ((t/=d/2) < 1) return c/2*t*t*t*t + b;
    return -c/2 * ((t-=2)*t*t*t - 2) + b;
  },
  easeInQuint: function (x, t, b, c, d) {
    return c*(t/=d)*t*t*t*t + b;
  },
  easeOutQuint: function (x, t, b, c, d) {
    return c*((t=t/d-1)*t*t*t*t + 1) + b;
  },
  easeInOutQuint: function (x, t, b, c, d) {
    if ((t/=d/2) < 1) return c/2*t*t*t*t*t + b;
    return c/2*((t-=2)*t*t*t*t + 2) + b;
  },
  easeInSine: function (x, t, b, c, d) {
    return -c * Math.cos(t/d * (Math.PI/2)) + c + b;
  },
  easeOutSine: function (x, t, b, c, d) {
    return c * Math.sin(t/d * (Math.PI/2)) + b;
  },
  easeInOutSine: function (x, t, b, c, d) {
    return -c/2 * (Math.cos(Math.PI*t/d) - 1) + b;
  },
  easeInExpo: function (x, t, b, c, d) {
    return (t==0) ? b : c * Math.pow(2, 10 * (t/d - 1)) + b;
  },
  easeOutExpo: function (x, t, b, c, d) {
    return (t==d) ? b+c : c * (-Math.pow(2, -10 * t/d) + 1) + b;
  },
  easeInOutExpo: function (x, t, b, c, d) {
    if (t==0) return b;
    if (t==d) return b+c;
    if ((t/=d/2) < 1) return c/2 * Math.pow(2, 10 * (t - 1)) + b;
    return c/2 * (-Math.pow(2, -10 * --t) + 2) + b;
  },
  easeInCirc: function (x, t, b, c, d) {
    return -c * (Math.sqrt(1 - (t/=d)*t) - 1) + b;
  },
  easeOutCirc: function (x, t, b, c, d) {
    return c * Math.sqrt(1 - (t=t/d-1)*t) + b;
  },
  easeInOutCirc: function (x, t, b, c, d) {
    if ((t/=d/2) < 1) return -c/2 * (Math.sqrt(1 - t*t) - 1) + b;
    return c/2 * (Math.sqrt(1 - (t-=2)*t) + 1) + b;
  },
  easeInElastic: function (x, t, b, c, d) {
    var s=1.70158;var p=0;var a=c;
    if (t==0) return b;  if ((t/=d)==1) return b+c;  if (!p) p=d*.3;
    if (a < Math.abs(c)) { a=c; var s=p/4; }
    else var s = p/(2*Math.PI) * Math.asin (c/a);
    return -(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
  },
  easeOutElastic: function (x, t, b, c, d) {
    var s=1.70158;var p=0;var a=c;
    if (t==0) return b;  if ((t/=d)==1) return b+c;  if (!p) p=d*.3;
    if (a < Math.abs(c)) { a=c; var s=p/4; }
    else var s = p/(2*Math.PI) * Math.asin (c/a);
    return a*Math.pow(2,-10*t) * Math.sin( (t*d-s)*(2*Math.PI)/p ) + c + b;
  },
  easeInOutElastic: function (x, t, b, c, d) {
    var s=1.70158;var p=0;var a=c;
    if (t==0) return b;  if ((t/=d/2)==2) return b+c;  if (!p) p=d*(.3*1.5);
    if (a < Math.abs(c)) { a=c; var s=p/4; }
    else var s = p/(2*Math.PI) * Math.asin (c/a);
    if (t < 1) return -.5*(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
    return a*Math.pow(2,-10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )*.5 + c + b;
  },
  easeInBack: function (x, t, b, c, d, s) {
    if (s == undefined) s = 1.70158;
    return c*(t/=d)*t*((s+1)*t - s) + b;
  },
  easeOutBack: function (x, t, b, c, d, s) {
    if (s == undefined) s = 1.70158;
    return c*((t=t/d-1)*t*((s+1)*t + s) + 1) + b;
  },
  easeInOutBack: function (x, t, b, c, d, s) {
    if (s == undefined) s = 1.70158; 
    if ((t/=d/2) < 1) return c/2*(t*t*(((s*=(1.525))+1)*t - s)) + b;
    return c/2*((t-=2)*t*(((s*=(1.525))+1)*t + s) + 2) + b;
  },
  easeInBounce: function (x, t, b, c, d) {
    return c - jQuery.easing.easeOutBounce (x, d-t, 0, c, d) + b;
  },
  easeOutBounce: function (x, t, b, c, d) {
    if ((t/=d) < (1/2.75)) {
      return c*(7.5625*t*t) + b;
    } else if (t < (2/2.75)) {
      return c*(7.5625*(t-=(1.5/2.75))*t + .75) + b;
    } else if (t < (2.5/2.75)) {
      return c*(7.5625*(t-=(2.25/2.75))*t + .9375) + b;
    } else {
      return c*(7.5625*(t-=(2.625/2.75))*t + .984375) + b;
    }
  },
  easeInOutBounce: function (x, t, b, c, d) {
    if (t < d/2) return jQuery.easing.easeInBounce (x, t*2, 0, c, d) * .5 + b;
    return jQuery.easing.easeOutBounce (x, t*2-d, 0, c, d) * .5 + c*.5 + b;
  }
});

/*
 *
 * TERMS OF USE - EASING EQUATIONS
 * 
 * Open source under the BSD License. 
 * 
 * Copyright © 2001 Robert Penner
 * All rights reserved.
 * 
 * Redistribution and use in source and binary forms, with or without modification, 
 * are permitted provided that the following conditions are met:
 * 
 * Redistributions of source code must retain the above copyright notice, this list of 
 * conditions and the following disclaimer.
 * Redistributions in binary form must reproduce the above copyright notice, this list 
 * of conditions and the following disclaimer in the documentation and/or other materials 
 * provided with the distribution.
 * 
 * Neither the name of the author nor the names of contributors may be used to endorse 
 * or promote products derived from this software without specific prior written permission.
 * 
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY 
 * EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE
 *  COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL,
 *  EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE
 *  GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED 
 * AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
 *  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED 
 * OF THE POSSIBILITY OF SUCH DAMAGE. 
 *
 */
/*

A jQuery edit in place plugin

Version 2.3.0

Authors:
	Dave Hauenstein
	Martin Häcker <spamfaenger [at] gmx [dot] de>

Project home:
	http://code.google.com/p/jquery-in-place-editor/

Patches with tests welcomed! For guidance see the tests  </spec/unit/>. To submit, attach them to the bug tracker.

License:
This source file is subject to the BSD license bundled with this package.
Available online: {@link http://www.opensource.org/licenses/bsd-license.php}
If you did not receive a copy of the license, and are unable to obtain it, 
learn to use a search engine.

*/

(function($){

$.fn.editInPlace = function(options) {
	
	var settings = $.extend({}, $.fn.editInPlace.defaults, options);
	assertMandatorySettingsArePresent(settings);
	preloadImage(settings.saving_image);
	
	return this.each(function() {
		var dom = $(this);
		// This won't work with live queries as there is no specific element to attach this
		// one way to deal with this could be to store a reference to self and then compare that in click?
		if (dom.data('editInPlace'))
			return; // already an editor here
		dom.data('editInPlace', true);
		
		new InlineEditor(settings, dom).init();
	});
};

/// Switch these through the dictionary argument to $(aSelector).editInPlace(overideOptions)
/// Required Options: Either url or callback, so the editor knows what to do with the edited values.
$.fn.editInPlace.defaults = {
	url:				"", // string: POST URL to send edited content
	bg_over:			"#ffc", // string: background color of hover of unactivated editor
	bg_out:				"transparent", // string: background color on restore from hover
	hover_class:		"",  // string: class added to root element during hover. Will override bg_over and bg_out
	show_buttons:		false, // boolean: will show the buttons: cancel or save; will automatically cancel out the onBlur functionality
	save_button:		'<button class="inplace_save">Save</button>', // string: image button tag to use as “Save” button
	cancel_button:		'<button class="inplace_cancel">Cancel</button>', // string: image button tag to use as “Cancel” button
	params:				"", // string: example: first_name=dave&last_name=hauenstein extra paramters sent via the post request to the server
	field_type:			"text", // string: "text", "textarea", or "select";  The type of form field that will appear on instantiation
	default_text:		"(Click here to add text)", // string: text to show up if the element that has this functionality is empty
	use_html:			false, // boolean, set to true if the editor should use jQuery.fn.html() to extract the value to show from the dom node
	textarea_rows:		10, // integer: set rows attribute of textarea, if field_type is set to textarea. Use CSS if possible though
	textarea_cols:		25, // integer: set cols attribute of textarea, if field_type is set to textarea. Use CSS if possible though
	select_text:		"Choose new value", // string: default text to show up in select box
	select_options:		"", // string or array: Used if field_type is set to 'select'. Can be comma delimited list of options 'textandValue,text:value', Array of options ['textAndValue', 'text:value'] or array of arrays ['textAndValue', ['text', 'value']]. The last form is especially usefull if your labels or values contain colons)
	text_size:			null, // integer: set cols attribute of text input, if field_type is set to text. Use CSS if possible though
	
	// Specifying callback_skip_dom_reset will disable all saving_* options
	saving_text:		undefined, // string: text to be used when server is saving information. Example "Saving..."
	saving_image:		"", // string: uses saving text specify an image location instead of text while server is saving
	saving_animation_color: 'transparent', // hex color string, will be the color the pulsing animation during the save pulses to. Note: Only works if jquery-ui is loaded
	
	value_required:		false, // boolean: if set to true, the element will not be saved unless a value is entered
	element_id:			"element_id", // string: name of parameter holding the id or the editable
	update_value:		"update_value", // string: name of parameter holding the updated/edited value
	original_value:		'original_value', // string: name of parameter holding the updated/edited value
	original_html:		"original_html", // string: name of parameter holding original_html value of the editable /* DEPRECATED in 2.2.0 */ use original_value instead.
	save_if_nothing_changed:	false,  // boolean: submit to function or server even if the user did not change anything
	on_blur:			"save", // string: "save" or null; what to do on blur; will be overridden if show_buttons is true
	cancel:				"", // string: if not empty, a jquery selector for elements that will not cause the editor to open even though they are clicked. E.g. if you have extra buttons inside editable fields
	
	// All callbacks will have this set to the DOM node of the editor that triggered the callback
	
	callback:			null, // function: function to be called when editing is complete; cancels ajax submission to the url param. Prototype: function(idOfEditor, enteredText, orinalHTMLContent, settingsParams, callbacks). The function needs to return the value that should be shown in the dom. Returning undefined means cancel and will restore the dom and trigger an error. callbacks is a dictionary with two functions didStartSaving and didEndSaving() that you can use to tell the inline editor that it should start and stop any saving animations it has configured. /* DEPRECATED in 2.1.0 */ Parameter idOfEditor, use $(this).attr('id') instead
	callback_skip_dom_reset: false, // boolean: set this to true if the callback should handle replacing the editor with the new value to show
	success:			null, // function: this function gets called if server responds with a success. Prototype: function(newEditorContentString)
	error:				null, // function: this function gets called if server responds with an error. Prototype: function(request)
	error_sink:			function(idOfEditor, errorString) { alert(errorString); }, // function: gets id of the editor and the error. Make sure the editor has an id, or it will just be undefined. If set to null, no error will be reported. /* DEPRECATED in 2.1.0 */ Parameter idOfEditor, use $(this).attr('id') instead
	preinit:			null, // function: this function gets called after a click on an editable element but before the editor opens. If you return false, the inline editor will not open. Prototype: function(currentDomNode). DEPRECATED in 2.2.0 use delegate shouldOpenEditInPlace call instead
	postclose:			null, // function: this function gets called after the inline editor has closed and all values are updated. Prototype: function(currentDomNode). DEPRECATED in 2.2.0 use delegate didCloseEditInPlace call instead
	delegate:			null // object: if it has methods with the name of the callbacks documented below in delegateExample these will be called. This means that you just need to impelment the callbacks you are interested in.
};

// Lifecycle events that the delegate can implement
// this will always be fixed to the delegate
var delegateExample = {
	// called while opening the editor.
	// return false to prevent editor from opening
	shouldOpenEditInPlace: function(aDOMNode, aSettingsDict, triggeringEvent) {},
	// return content to show in inplace editor
	willOpenEditInPlace: function(aDOMNode, aSettingsDict) {},
	didOpenEditInPlace: function(aDOMNode, aSettingsDict) {},
	
	// called while closing the editor
	// return false to prevent the editor from closing
	shouldCloseEditInPlace: function(aDOMNode, aSettingsDict, triggeringEvent) {},
	// return value will be shown during saving
	willCloseEditInPlace: function(aDOMNode, aSettingsDict) {},
	didCloseEditInPlace: function(aDOMNode, aSettingsDict) {},
	
	missingCommaErrorPreventer:''
};


function InlineEditor(settings, dom) {
	this.settings = settings;
	this.dom = dom;
	this.originalValue = null;
	this.didInsertDefaultText = false;
	this.shouldDelayReinit = false;
};

$.extend(InlineEditor.prototype, {
	
	init: function() {
		this.setDefaultTextIfNeccessary();
		this.connectOpeningEvents();
	},
	
	reinit: function() {
		if (this.shouldDelayReinit)
			return;
		
		this.triggerCallback(this.settings.postclose, /* DEPRECATED in 2.1.0 */ this.dom);
		this.triggerDelegateCall('didCloseEditInPlace');
		
		this.markEditorAsInactive();
		this.connectOpeningEvents();
	},
	
	setDefaultTextIfNeccessary: function() {
		if('' !== this.dom.html())
			return;
		
		this.dom.html(this.settings.default_text);
		this.didInsertDefaultText = true;
	},
	
	connectOpeningEvents: function() {
		var that = this;
		this.dom
			.bind('mouseenter.editInPlace', function(){ that.addHoverEffect(); })
			.bind('mouseleave.editInPlace', function(){ that.removeHoverEffect(); })
			.bind('click.editInPlace', function(anEvent){ that.openEditor(anEvent); });
	},
	
	disconnectOpeningEvents: function() {
	 	// prevent re-opening the editor when it is already open
		this.dom.unbind('.editInPlace');
	},
	
	addHoverEffect: function() {
		if (this.settings.hover_class)
			this.dom.addClass(this.settings.hover_class);
		else
			this.dom.css("background-color", this.settings.bg_over);
	},
	
	removeHoverEffect: function() {
		if (this.settings.hover_class)
			this.dom.removeClass(this.settings.hover_class);
		else
			this.dom.css("background-color", this.settings.bg_out);
	},
	
	openEditor: function(anEvent) {
		if ( ! this.shouldOpenEditor(anEvent))
			return;
		
		this.disconnectOpeningEvents();
		this.removeHoverEffect();
		this.removeInsertedDefaultTextIfNeccessary();
		this.saveOriginalValue();
		this.markEditorAsActive();
		this.replaceContentWithEditor();
		this.setInitialValue();
		this.workAroundMissingBlurBug();
		this.connectClosingEventsToEditor();
		this.triggerDelegateCall('didOpenEditInPlace');
	},
	
	shouldOpenEditor: function(anEvent) {
		if (this.isClickedObjectCancelled(anEvent.target))
			return false;
		
		if (false === this.triggerCallback(this.settings.preinit, /* DEPRECATED in 2.1.0 */ this.dom))
			return false;
		
		if (false === this.triggerDelegateCall('shouldOpenEditInPlace', true, anEvent))
			return false;
		
		return true;
	},
	
	removeInsertedDefaultTextIfNeccessary: function() {
		if ( ! this.didInsertDefaultText
			|| this.dom.html() !== this.settings.default_text)
			return;
		
		this.dom.html('');
		this.didInsertDefaultText = false;
	},
	
	isClickedObjectCancelled: function(eventTarget) {
		if ( ! this.settings.cancel)
			return false;
		
		var eventTargetAndParents = $(eventTarget).parents().andSelf();
		var elementsMatchingCancelSelector = eventTargetAndParents.filter(this.settings.cancel);
		return 0 !== elementsMatchingCancelSelector.length;
	},
	
	saveOriginalValue: function() {
		if (this.settings.use_html)
			this.originalValue = this.dom.html();
		else
			this.originalValue = trim(this.dom.text());
	},
	
	restoreOriginalValue: function() {
		this.setClosedEditorContent(this.originalValue);
	},
	
	setClosedEditorContent: function(aValue) {
		if (this.settings.use_html)
			this.dom.html(aValue);
		else
			this.dom.text(aValue);
	},
	
	workAroundMissingBlurBug: function() {
		// Strangely, all browser will forget to send a blur event to an input element
		// when another one is created and selected programmatically. (at least under some circumstances). 
		// This means that if another inline editor is opened, existing inline editors will _not_ close 
		// if they are configured to submit when blurred.
		
		// Using parents() instead document as base to workaround the fact that in the unittests
		// the editor is not a child of window.document but of a document fragment
		var ourInput = this.dom.find(':input');
		this.dom.parents(':last').find('.editInPlace-active :input').not(ourInput).blur();
	},
	
	replaceContentWithEditor: function() {
		var buttons_html  = (this.settings.show_buttons) ? this.settings.save_button + ' ' + this.settings.cancel_button : '';
		var editorElement = this.createEditorElement(); // needs to happen before anything is replaced
		/* insert the new in place form after the element they click, then empty out the original element */
		this.dom.html('<form class="inplace_form" style="display: inline; margin: 0; padding: 0;"></form>')
			.find('form')
				.append(editorElement)
				.append(buttons_html);
	},
	
	createEditorElement: function() {
		if (-1 === $.inArray(this.settings.field_type, ['text', 'textarea', 'select']))
			throw "Unknown field_type <fnord>, supported are 'text', 'textarea' and 'select'";
		
		var editor = null;
		if ("select" === this.settings.field_type)
			editor = this.createSelectEditor();
		else if ("text" === this.settings.field_type)
			editor = $('<input type="text" ' + this.inputNameAndClass() 
				+ ' size="' + this.settings.text_size  + '" />');
		else if ("textarea" === this.settings.field_type)
			editor = $('<textarea ' + this.inputNameAndClass() 
				+ ' rows="' + this.settings.textarea_rows + '" '
				+ ' cols="' + this.settings.textarea_cols + '" />');
		
		return editor;
	},
	
	setInitialValue: function() {
		var initialValue = this.triggerDelegateCall('willOpenEditInPlace', this.originalValue);
		var editor = this.dom.find(':input');
		editor.val(initialValue);
		
		// Workaround for select fields which don't contain the original value.
		// Somehow the browsers don't like to select the instructional choice (disabled) in that case
		if (editor.val() !== initialValue)
			editor.val(''); // selects instructional choice
	},
	
	inputNameAndClass: function() {
		return ' name="inplace_value" class="inplace_field" ';
	},
	
	createSelectEditor: function() {
		var editor = $('<select' + this.inputNameAndClass() + '>'
			+	'<option disabled="true" value="">' + this.settings.select_text + '</option>'
			+ '</select>');
		
		var optionsArray = this.settings.select_options;
		if ( ! $.isArray(optionsArray))
			optionsArray = optionsArray.split(',');
		
		for (var i=0; i<optionsArray.length; i++) {
			var currentTextAndValue = optionsArray[i];
			if ( ! $.isArray(currentTextAndValue))
				currentTextAndValue = currentTextAndValue.split(':');
			
			var value = trim(currentTextAndValue[1] || currentTextAndValue[0]);
			var text = trim(currentTextAndValue[0]);
			
			var option = $('<option>').val(value).text(text);
			editor.append(option);
		}
		
		return editor;
	},
	
	connectClosingEventsToEditor: function() {
		var that = this;
		function cancelEditorAction(anEvent) {
			that.handleCancelEditor(anEvent);
			return false; // stop event bubbling
		}
		function saveEditorAction(anEvent) {
			that.handleSaveEditor(anEvent);
			return false; // stop event bubbling
		}
		
		var form = this.dom.find("form");
		
		form.find(".inplace_field").focus().select();
		form.find(".inplace_cancel").click(cancelEditorAction);
		form.find(".inplace_save").click(saveEditorAction);
		
		var ua = window.navigator.userAgent;
		var is_opera = /opera/i.test(ua);
		var is_mozilla = /mozilla/i.test(ua) && !/(compatible|webkit)/.test(ua);
		var is_msie = /msie/i.test(ua) && !is_opera;
		var is_safari = /Safari/gi.test(window.navigator.appVersion);
		
		if ( ! this.settings.show_buttons) {
				// TODO: Firefox has a bug where blur is not reliably called when focus is lost 
				//       (for example by another editor appearing)
			if ("save" === this.settings.on_blur)
				form.find(".inplace_field").blur(saveEditorAction);
			else
				form.find(".inplace_field").blur(cancelEditorAction);
			
			// workaround for msie & firefox bug where it won't submit on enter if no button is shown
			if (is_mozilla || is_msie)
				this.bindSubmitOnEnterInInput();
		}
		
		form.keyup(function(anEvent) {
			// allow canceling with escape
			var escape = 27;
			if (escape === anEvent.which)
				return cancelEditorAction();
		});
		
		// workaround for webkit nightlies where they won't submit at all on enter
		// REFACT: find a way to just target the nightlies
		if (is_safari)
			this.bindSubmitOnEnterInInput();
		
		
		form.submit(saveEditorAction);
	},
	
	bindSubmitOnEnterInInput: function() {
		if ('textarea' === this.settings.field_type)
			return; // can't enter newlines otherwise
		
		var that = this;
		this.dom.find(':input').keyup(function(event) {
			var enter = 13;
			if (enter === event.which)
				return that.dom.find('form').submit();
		});
	 	
	},
	
	handleCancelEditor: function(anEvent) {
		// REFACT: remove duplication between save and cancel
		if (false === this.triggerDelegateCall('shouldCloseEditInPlace', true, anEvent))
			return;
		
		var enteredText = this.dom.find(':input').val();
		enteredText = this.triggerDelegateCall('willCloseEditInPlace', enteredText);
		
		this.restoreOriginalValue();
		if (hasContent(enteredText) 
			&& ! this.isDisabledDefaultSelectChoice())
			this.setClosedEditorContent(enteredText);
		this.reinit();
	},
	
	handleSaveEditor: function(anEvent) {
		if (false === this.triggerDelegateCall('shouldCloseEditInPlace', true, anEvent))
			return;
		
		var enteredText = this.dom.find(':input').val();
		enteredText = this.triggerDelegateCall('willCloseEditInPlace', enteredText);
		
		if (this.isDisabledDefaultSelectChoice()
			|| this.isUnchangedInput(enteredText)) {
			this.handleCancelEditor(anEvent);
			return;
		}
		
		if (this.didForgetRequiredText(enteredText)) {
			this.handleCancelEditor(anEvent);
			this.reportError("Error: You must enter a value to save this field");
			return;
		}
		
		this.showSaving(enteredText);
		
		if (this.settings.callback)
			this.handleSubmitToCallback(enteredText);
		else
			this.handleSubmitToServer(enteredText);
	},
	
	didForgetRequiredText: function(enteredText) {
		return this.settings.value_required 
			&& ("" === enteredText 
				|| undefined === enteredText
				|| null === enteredText);
	},
	
	isDisabledDefaultSelectChoice: function() {
		return this.dom.find('option').eq(0).is(':selected:disabled');
	},
	
	isUnchangedInput: function(enteredText) {
		return ! this.settings.save_if_nothing_changed
			&& this.originalValue === enteredText;
	},
	
	showSaving: function(enteredText) {
		if (this.settings.callback && this.settings.callback_skip_dom_reset)
			return;
		
		var savingMessage = enteredText;
		if (hasContent(this.settings.saving_text))
			savingMessage = this.settings.saving_text;
		if(hasContent(this.settings.saving_image))
			// REFACT: alt should be the configured saving message
			savingMessage = $('<img />').attr('src', this.settings.saving_image).attr('alt', savingMessage);
		this.dom.html(savingMessage);
	},
	
	handleSubmitToCallback: function(enteredText) {
		// REFACT: consider to encode enteredText and originalHTML before giving it to the callback
		this.enableOrDisableAnimationCallbacks(true, false);
		var newHTML = this.triggerCallback(this.settings.callback, /* DEPRECATED in 2.1.0 */ this.id(), enteredText, this.originalValue, 
			this.settings.params, this.savingAnimationCallbacks());
		
		if (this.settings.callback_skip_dom_reset)
			; // do nothing
		else if (undefined === newHTML) {
			// failure; put original back
			this.reportError("Error: Failed to save value: " + enteredText);
			this.restoreOriginalValue();
		}
		else
			// REFACT: use setClosedEditorContent
			this.dom.html(newHTML);
		
		if (this.didCallNoCallbacks()) {
			this.enableOrDisableAnimationCallbacks(false, false);
			this.reinit();
		}
	},
	
	handleSubmitToServer: function(enteredText) {
		var data = this.settings.update_value + '=' + encodeURIComponent(enteredText) 
			+ '&' + this.settings.element_id + '=' + this.dom.attr("id") 
			+ ((this.settings.params) ? '&' + this.settings.params : '')
			+ '&' + this.settings.original_html + '=' + encodeURIComponent(this.originalValue) /* DEPRECATED in 2.2.0 */
			+ '&' + this.settings.original_value + '=' + encodeURIComponent(this.originalValue);
		
		this.enableOrDisableAnimationCallbacks(true, false);
		this.didStartSaving();
		var that = this;
		$.ajax({
			url: that.settings.url,
			type: "POST",
			data: data,
			dataType: "html",
			complete: function(request){
				that.didEndSaving();
			},
			success: function(html){
				var new_text = html || that.settings.default_text;
				
				/* put the newly updated info into the original element */
				// FIXME: should be affected by the preferences switch
				that.dom.html(new_text);
				// REFACT: remove dom parameter, already in this, not documented, should be easy to remove
				// REFACT: callback should be able to override what gets put into the DOM
				that.triggerCallback(that.settings.success, html);
			},
			error: function(request) {
				that.dom.html(that.originalHTML); // REFACT: what about a restorePreEditingContent()
				if (that.settings.error)
					// REFACT: remove dom parameter, already in this, not documented, can remove without deprecation
					// REFACT: callback should be able to override what gets entered into the DOM
					that.triggerCallback(that.settings.error, request);
				else
					that.reportError("Failed to save value: " + request.responseText || 'Unspecified Error');
			}
		});
	},
	
	// Utilities .........................................................
	
	triggerCallback: function(aCallback /*, arguments */) {
		if ( ! aCallback)
			return; // callback wasn't specified after all
		
		var callbackArguments = Array.prototype.slice.call(arguments, 1);
		return aCallback.apply(this.dom[0], callbackArguments);
	},
	
	/// defaultReturnValue is only used if the delegate returns undefined
	triggerDelegateCall: function(aDelegateMethodName, defaultReturnValue, optionalEvent) {
		// REFACT: consider to trigger equivalent callbacks automatically via a mapping table?
		if ( ! this.settings.delegate
			|| ! $.isFunction(this.settings.delegate[aDelegateMethodName]))
			return defaultReturnValue;
		
		var delegateReturnValue =  this.settings.delegate[aDelegateMethodName](this.dom, this.settings, optionalEvent);
		return (undefined === delegateReturnValue)
			? defaultReturnValue
			: delegateReturnValue;
	},
	
	reportError: function(anErrorString) {
		this.triggerCallback(this.settings.error_sink, /* DEPRECATED in 2.1.0 */ this.id(), anErrorString);
	},
	
	// REFACT: this method should go, callbacks should get the dom node itself as an argument
	id: function() {
		return this.dom.attr('id');
	},
	
	markEditorAsActive: function() {
		this.dom.addClass('editInPlace-active');
	},
	
	markEditorAsInactive: function() {
		this.dom.removeClass('editInPlace-active');
	},
	
	// REFACT: consider rename, doesn't deal with animation directly
	savingAnimationCallbacks: function() {
		var that = this;
		return {
			didStartSaving: function() { that.didStartSaving(); },
			didEndSaving: function() { that.didEndSaving(); }
		};
	},
	
	enableOrDisableAnimationCallbacks: function(shouldEnableStart, shouldEnableEnd) {
		this.didStartSaving.enabled = shouldEnableStart;
		this.didEndSaving.enabled = shouldEnableEnd;
	},
	
	didCallNoCallbacks: function() {
		return this.didStartSaving.enabled && ! this.didEndSaving.enabled;
	},
	
	assertCanCall: function(methodName) {
		if ( ! this[methodName].enabled)
			throw new Error('Cannot call ' + methodName + ' now. See documentation for details.');
	},
	
	didStartSaving: function() {
		this.assertCanCall('didStartSaving');
		this.shouldDelayReinit = true;
		this.enableOrDisableAnimationCallbacks(false, true);
		
		this.startSavingAnimation();
	},
	
	didEndSaving: function() {
		this.assertCanCall('didEndSaving');
		this.shouldDelayReinit = false;
		this.enableOrDisableAnimationCallbacks(false, false);
		this.reinit();
		
		this.stopSavingAnimation();
	},
	
	startSavingAnimation: function() {
		var that = this;
		this.dom
			.animate({ backgroundColor: this.settings.saving_animation_color }, 400)
			.animate({ backgroundColor: 'transparent'}, 400, 'swing', function(){
				// In the tests animations are turned off - i.e they happen instantaneously.
				// Hence we need to prevent this from becomming an unbounded recursion.
				setTimeout(function(){ that.startSavingAnimation(); }, 10);
			});
	},
	
	stopSavingAnimation: function() {
		this.dom
			.stop(true)
			.css({backgroundColor: ''});
	},
	
	missingCommaErrorPreventer:''
});



// Private helpers .......................................................

function assertMandatorySettingsArePresent(options) {
	// one of these needs to be non falsy
	if (options.url || options.callback)
		return;
	
	throw new Error("Need to set either url: or callback: option for the inline editor to work.");
}

/* preload the loading icon if it is configured */
function preloadImage(anImageURL) {
	if ('' === anImageURL)
		return;
	
	var loading_image = new Image();
	loading_image.src = anImageURL;
}

function trim(aString) {
	return aString
		.replace(/^\s+/, '')
		.replace(/\s+$/, '');
}

function hasContent(something) {
	if (undefined === something || null === something)
		return false;
	
	if (0 === something.length)
		return false;
	
	return true;
}

})(jQuery);

/*!
 * hoverIntent r7 // 2013.03.11 // jQuery 1.9.1+
 * http://cherne.net/brian/resources/jquery.hoverIntent.html
 *
 * You may use hoverIntent under the terms of the MIT license. Basically that
 * means you are free to use hoverIntent as long as this header is left intact.
 * Copyright 2007, 2013 Brian Cherne
 */
 
/* hoverIntent is similar to jQuery's built-in "hover" method except that
 * instead of firing the handlerIn function immediately, hoverIntent checks
 * to see if the user's mouse has slowed down (beneath the sensitivity
 * threshold) before firing the event. The handlerOut function is only
 * called after a matching handlerIn.
 *
 * // basic usage ... just like .hover()
 * .hoverIntent( handlerIn, handlerOut )
 * .hoverIntent( handlerInOut )
 *
 * // basic usage ... with event delegation!
 * .hoverIntent( handlerIn, handlerOut, selector )
 * .hoverIntent( handlerInOut, selector )
 *
 * // using a basic configuration object
 * .hoverIntent( config )
 *
 * @param  handlerIn   function OR configuration object
 * @param  handlerOut  function OR selector for delegation OR undefined
 * @param  selector    selector OR undefined
 * @author Brian Cherne <brian(at)cherne(dot)net>
 */
(function($) {
    $.fn.hoverIntent = function(handlerIn,handlerOut,selector) {

        // default configuration values
        var cfg = {
            interval: 100,
            sensitivity: 7,
            timeout: 0
        };

        if ( typeof handlerIn === "object" ) {
            cfg = $.extend(cfg, handlerIn );
        } else if ($.isFunction(handlerOut)) {
            cfg = $.extend(cfg, { over: handlerIn, out: handlerOut, selector: selector } );
        } else {
            cfg = $.extend(cfg, { over: handlerIn, out: handlerIn, selector: handlerOut } );
        }

        // instantiate variables
        // cX, cY = current X and Y position of mouse, updated by mousemove event
        // pX, pY = previous X and Y position of mouse, set by mouseover and polling interval
        var cX, cY, pX, pY;

        // A private function for getting mouse position
        var track = function(ev) {
            cX = ev.pageX;
            cY = ev.pageY;
        };

        // A private function for comparing current and previous mouse position
        var compare = function(ev,ob) {
            ob.hoverIntent_t = clearTimeout(ob.hoverIntent_t);
            // compare mouse positions to see if they've crossed the threshold
            if ( ( Math.abs(pX-cX) + Math.abs(pY-cY) ) < cfg.sensitivity ) {
                $(ob).off("mousemove.hoverIntent",track);
                // set hoverIntent state to true (so mouseOut can be called)
                ob.hoverIntent_s = 1;
                return cfg.over.apply(ob,[ev]);
            } else {
                // set previous coordinates for next time
                pX = cX; pY = cY;
                // use self-calling timeout, guarantees intervals are spaced out properly (avoids JavaScript timer bugs)
                ob.hoverIntent_t = setTimeout( function(){compare(ev, ob);} , cfg.interval );
            }
        };

        // A private function for delaying the mouseOut function
        var delay = function(ev,ob) {
            ob.hoverIntent_t = clearTimeout(ob.hoverIntent_t);
            ob.hoverIntent_s = 0;
            return cfg.out.apply(ob,[ev]);
        };

        // A private function for handling mouse 'hovering'
        var handleHover = function(e) {
            // copy objects to be passed into t (required for event object to be passed in IE)
            var ev = jQuery.extend({},e);
            var ob = this;

            // cancel hoverIntent timer if it exists
            if (ob.hoverIntent_t) { ob.hoverIntent_t = clearTimeout(ob.hoverIntent_t); }

            // if e.type == "mouseenter"
            if (e.type == "mouseenter") {
                // set "previous" X and Y position based on initial entry point
                pX = ev.pageX; pY = ev.pageY;
                // update "current" X and Y position based on mousemove
                $(ob).on("mousemove.hoverIntent",track);
                // start polling interval (self-calling timeout) to compare mouse coordinates over time
                if (ob.hoverIntent_s != 1) { ob.hoverIntent_t = setTimeout( function(){compare(ev,ob);} , cfg.interval );}

                // else e.type == "mouseleave"
            } else {
                // unbind expensive mousemove event
                $(ob).off("mousemove.hoverIntent",track);
                // if hoverIntent state is true, then call the mouseOut function after the specified delay
                if (ob.hoverIntent_s == 1) { ob.hoverIntent_t = setTimeout( function(){delay(ev,ob);} , cfg.timeout );}
            }
        };

        // listen for mouseenter and mouseleave
        return this.on({'mouseenter.hoverIntent':handleHover,'mouseleave.hoverIntent':handleHover}, cfg.selector);
    };
})(jQuery);
