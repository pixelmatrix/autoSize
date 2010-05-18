/*

autoSize v0.1
Copyright © 2010 Josh Pyles / Pixelmatrix Design LLC
http://pixelmatrixdesign.com

Requires jQuery 1.3 or newer

License:
MIT License - http://www.opensource.org/licenses/mit-license.php

Adds customizable classes to objects based on their length 
so you can make them the optimal size for the space available

Basic Usage:
$("#sizeme").autoSize();

Custom Lengths:
$("#sizeme").autoSize({classes: {tiny: 0, small: 100, medium: 500, large: 1000}});

$("#sizeme").autoSize({classes: {d0: 0, d1: 1, d2: 2, d3: 3, d4: 4}});

Parameters:
classes (object)
- an object of key value pairs with the class name as the key, and the value being the minimum # of characters

Enjoy!

*/

(function($) {
  $.fn.autoSize = function(options) {
    //map vars correctly
    
    //debug(this);
    // build main options before element iteration
    var opts = $.extend({}, $.fn.autoSize.defaults, options);
    // iterate and setup each matched element
    return this.each(function() {
      var $this = $(this);
      // build element specific options
      var o = $.meta ? $.extend({}, opts, $this.data()) : opts;
      
      var text = $this.text();
      
      var length = text.length;
      
      var theClass;
      
      var classes = [];
      
      $.each(o.classes, function(k,v){
        classes.push([k, v]);
      });
      
      classes = classes.sort(function(a,b){
        return a[1] - b[1];
      });

      var matches = [];
      
      for(i=0; i < classes.length; i++){
        if(length >= classes[i][1]){
          // if 4 >= 1
          matches.push(classes[i]);
        }else{
          break;
        }
      }
      
      matches = matches.sort(function(a,b){
        return b[1] - a[1];
      });
      
      var classnames = [];
      
      $.each(o.classes, function(k,v){
        classnames.push(k);
      })
      
      classnames = classnames.join(" ");
      
      if(matches.length > 0){
        theClass = matches[0][0];
        $this.removeClass(classnames);
        $this.addClass(theClass);
      }
    });
  };
  //
  // plugin defaults
  //
  $.fn.autoSize.defaults = {
    classes: {
      tiny: 0,
      small: 200,
      medium: 1000,
      large: 3000
    }
  };
})(jQuery);