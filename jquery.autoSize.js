/*! autoSize - based on autoSize of Josh Pyles
 *
 * @author - Livingston Samuel, http://livingstonsamuel.com/
 * @license - MIT License - http://www.opensource.org/licenses/mit-license.php
 *
 * Original Copyright © 2010 Josh Pyles / Pixelmatrix Design LLC, http://pixelmatrixdesign.com
 */
/*
 * Requires jQuery 1.3 or newer
 *
 * Adds customizable classes to objects based on their length
 * so you can make them the optimal size for the space available
 *
 * Basic Usage:
 *   $("#sizeme").autoSize();
 *
 * Custom Lengths:
 *   $("#sizeme").autoSize({classes: {tiny: 0, small: 100, medium: 500, large: 1000}});
 *   $("#sizeme").autoSize({classes: {d0: 0, d1: 1, d2: 2, d3: 3, d4: 4}});
 *
 * @params - classes (object)
 *           an object of key value pairs with the class name as the key, and the value being the minimum # of characters
 *
 */

(function($) {
  $.fn.autoSize = (function () {
    var defaults = {
          classes:{ tiny: 0,
                    small: 200,
                    medium: 1000,
                    large: 3000
                  }
        };

    return function (options) {
      var opts = $.extend({}, defaults, options); // build main options before element iteration

      return this.each(function () { // iterate and setup each matched element
        var $this = $(this),
            o = $.meta ? $.extend({}, opts, $this.data()) : opts, // build element specific options
            len = $this.text().length,
            classnames = [], cls, match,
            classes = o.classes, mapping = [], temp;

        for(cls in classes) {
          if (classes.hasOwnProperty(cls)) {
            temp = classes[cls];
            if(len >= temp) {
              mapping[temp] = cls
            }
            classnames.push(cls);
          }
        }

        match = mapping.sort().shift();
        classnames = classnames.join(' ');

        $this.removeClass(classnames).addClass(match);
      });
    };
  }());
}(jQuery));