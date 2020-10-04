$(document).ready(function() {


    // GENERAL
    
    
    
      // contenteditable text
      $('.contenteditable').each(function() {
        var ce_text = $(this).data('reset');
        // alert(ce_text);
    
        $(this).html(ce_text);
      });
    
    
      // contenteditable reset button
      $('.contenteditable').on('focus', function() {
        $(this).on('keyup', function() {
          if($(this).html() != $(this).data('reset')) {
            $(this).next('.btn-reset').addClass('btn-topright--visible');
          }
          else{
            $(this).next('.btn-reset').removeClass('btn-topright--visible');
          };
        });
    
        if($(this).html() != $(this).data('reset')) {
          $(this).next('.btn-reset').addClass('btn-topright--visible');
        }
        else{
          $(this).next('.btn-reset').removeClass('btn-topright--visible');
        };
      });
    
      $('.contenteditable').on('blur', function() {
        setTimeout(function() {
          $('.contenteditable').next('.btn-reset').removeClass('btn-topright--visible');
        }, 200);
      });
    
      $('.btn-reset').on('click', function() {
        var reset = $(this).prev('.contenteditable').data('reset');
        $(this).prev('.contenteditable').html(reset);
      });
    
    
    
      // invert color
      $('.btn-invert').on('click', function() {
        $('html').toggleClass('invert');
        // $(this).css('outline', 'solid 10px green');
      });
    
    
      // focus ring only after tab key
      $(document).keyup(function(e) {
        if (e.keyCode === 9) { // tab key
          $('body').addClass('focus');
        }
      });
    
    
    
    // SECTION.COVER
    
      // desktop cover
      $(document).on("mousemove", function(event) {
    
        $('.cover-desktop-note-x, .cover-desktop-note-y').css('animation', 'fadeout 1.2s 6s forwards linear');
    
        $('.mainheading').addClass('mainheading--desktop');
    
        // track cursor position on viewport in percent
        xPercent = event.pageX / $( 'section.cover' ).width() * 100;
        yPercent = event.pageY / $( 'section.cover' ).height() * 100;
    
        // remove decimals
        xPercentFixed = xPercent.toFixed();
        yPercentFixed = yPercent.toFixed();
    
        // translate viewport position to font axes
        // x to width / 400–600 / spanne 200, start bei 400
        // y to weight / 60–100 / spanne 40, start bei 60
    
        xWidth = 400 + xPercentFixed*2;
        yWeight = 60 + yPercentFixed*40/100;
    
        // change font axes
        $(".mainheading--desktop").css(
          "font-variation-settings",
          " 'wght' " + yWeight +", 'wdth' " + xWidth + ""
        );
      });
    
      // mobile cover
      window.ondevicemotion = function(event) {
    
        $('.mainheading').removeClass('mainheading--desktop').addClass('mainheading--mobile');
    
        // access accelaration values and round them
        xAcc = event.accelerationIncludingGravity.x;
        yAcc = event.accelerationIncludingGravity.y;
    
        xAccFixed = (Math.round(xAcc * 10) / 10).toFixed();
        yAccFixed = (Math.round(yAcc * 10) / 10).toFixed();
    
        // translate values to font axes
    
        // reine übertragung von sensoren zu achsen:
        // xWidthAcc = 400+xAccFixed*10;
        // yWeightAcc = 60+yAccFixed*2;
    
        // übertragung + anpassung der werte für bessere UX:
        xWidthAcc = 500+xAccFixed*20;
        yWeightAcc = 100+yAccFixed*4;
    
        // $(".mainheading--mobile").css(
        //   "font-variation-settings",
        //   " 'wght' " + yWeightAcc +", 'wdth' " + xWidthAcc + ""
        // );
    
        // change font axes
        // (only if x value is divisable by 20 to reduce jittering)
        if(xWidthAcc % 20 == 0) {
          $(".mainheading--mobile").css(
            "font-variation-settings",
            " 'wght' " + yWeightAcc  +", 'wdth' " + xWidthAcc + ""
          );
        }
      };
    
    
    
    
    
    // SECTION.EXAMPLES
    
    var title = "Scope – a variable typeface designed to enable typographic interactions";
    History.pushState({state:0}, title, "");
    
    (function(window,undefined){
    
        // Bind to StateChange Event
        History.Adapter.bind(window,'statechange',function(){ // Note: We are using statechange instead of popstate
            var State = History.getState(); // Note: We are using History.getState() instead of event.state
        });
    })(window);
    
      $('.examples-link').on('click', function(event) {
    
        var number = $(this).html();
    
        History.pushState({state:number}, title, "?example=0" + number);
    
        var url = $(this).attr('href');
        // var title = $(this).attr('title');
    
        event.preventDefault();
    
        $('body').addClass('noscroll');
        $('.examples-popup').addClass('examples-popup--visible');
        $('.examples-popup iframe').remove();
        $('.examples-popup').prepend('<iframe src="' + url + '"></iframe>');
        $('.btn-invert').addClass('btn-invert--invert');
        $('.btn-close').addClass('btn-topright--visible');
    
        $('.examples-popup-loading').addClass('examples-popup-loading--visible');
    
        $('.examples-popup iframe').on('load', function() {
          setTimeout(function() {
            $('.examples-popup-loading').removeClass('examples-popup-loading--visible');
          }, 200);
        });
      });
    
      // $('examples-popup iframe').on('load', function() {
      //   // $('body').removeClass('loading');
      //   $(this).hide();
      // });
    
    
      // escape key
      $(document).keyup(function(e) {
        if (e.keyCode === 27) { // esc key
          $('.examples-popup').removeClass('examples-popup--visible');
          $('body').removeClass('noscroll');
          $('.btn-invert').removeClass('btn-invert--invert');
          $('.btn-close').removeClass('btn-topright--visible');
          History.pushState({state:0}, title, "?");
        }
      });
    
      // close button
      $('.btn-close').on('click', function() {
          $('.examples-popup').removeClass('examples-popup--visible');
          $('body').removeClass('noscroll');
          $('.btn-invert').removeClass('btn-invert--invert');
          $(this).removeClass('btn-topright--visible');
          History.pushState({state:0}, title, "?");
      });
    
      $(window).on('popstate', function() {
        $('.examples-popup').removeClass('examples-popup--visible');
        $('body').removeClass('noscroll');
        $('.btn-invert').removeClass('btn-invert--invert');
        $('.btn-close').removeClass('btn-topright--visible');
    
        var loc = window.location.href;
        currentState = loc.substr(-1,1);
    
        $('.examples-link-'+currentState).click();
    
        // if(currentState == "1") {
        //   $('.examples-link-1').click();
        // }
        //
        // if(currentState == "2") {
        //   $('.examples-link-2').click();
        // }
        //
        // if(currentState == "3") {
        //   $('.examples-link-3').click();
        // }
        //
        // if(currentState == "4") {
        //   $('.examples-link-4').click();
        // }
        //
        // if(currentState == "5") {
        //   $('.examples-link-5').click();
        // }
        //
        // if(currentState == "6") {
        //   $('.examples-link-6').click();
        // }
      });
    
      // $(window).on('StateChange', function() {
      //   alert("hi!");
      // });
    
      // History.Adapter.bind(window, 'statechange', function(){
      //   if(window.location.hash.contains("1")) {
      //     alert("hi!");
      //   }
      // });
    
    
    
    
    // SHOW / HIDE SLIDER
      $(window).on('touchmove scroll', function() {
        var height = $(window).scrollTop();
        var s_tt = $('section.typetester').offset();
        var s_glyphs = $('section.glyphs').offset();
        var s_info = $('section.info').offset();
    
        if (height > s_tt.top - 300) {
          $('.slider-1').addClass('slider--visible');
          $('.slider-2').addClass('slider--visible');
          $('.slider-3').addClass('slider--visible');
        }
    
        else {
          $('.slider-1').removeClass('slider--visible');
          $('.slider-2').removeClass('slider--visible');
          $('.slider-3').removeClass('slider--visible');
        }
    
        if (height > s_glyphs.top - 300) {
          $('.slider-3').removeClass('slider--visible');
        }
    
        if (height > s_info.top - 300) {
          $('.slider-1').removeClass('slider--visible');
          $('.slider-2').removeClass('slider--visible');
        }
      });
    
    
    
    
    // SLIDER FUNCTIONALITY
    
      // slider 1
      var value_weight = $('.slider-weight').val();
      var value_width = $('.slider-width').val();
    
      $('.slider-weight-value').html(value_weight);
      $('.slider-width-value').html(value_width);
    
      $('.slider-weight, .slider-width').on("input", function() {
        var value_weight = $('.slider-weight').val();
        var value_width = $('.slider-width').val();
    
        $('.slider-weight-value').html(value_weight);
        $('.slider-width-value').html(value_width);
    
        $(".react-to-slider-1-2").css(
          "font-variation-settings",
          " 'wght' " + value_weight +", 'wdth' " + value_width + ""
        );
      });
    
      // slider 2
    
      var value_size = $('.slider-size').val();
      $('.slider-size-value').html(value_size);
    
      $('.slider-size').on("input", function() {
        var value_size = $('.slider-size').val();
        $('.slider-size-value').html(value_size);
    
        $(".react-to-slider-3").css(
          "font-size", value_size + "px"
        );
      });
    
    
    // SECTION.GLYPHS
    
      // disable glyph zoom outside of active area
      $(window).on('touchmove scroll', function() {
        var height = $(window).scrollTop();
        var s_glyphs = $('section.glyphs').offset();
        var s_info = $('section.info').offset();
    
        if (height < s_glyphs.top - 300) {
          $('.glyph-zoom').hide();
        }
    
        else {
          $('.glyph-zoom').show();
        }
    
        if (height > s_info.top - 300) {
          $('.glyph-zoom').hide();
        }
      });
    
      // glyph zoom functionality
    
      $('.glyphs-list-item').on('mouseenter', function() {
        $('.glyph-zoom').addClass('glyph-zoom--visible');
    
        var glyph = $(this).html();
        $('.glyph-zoom').html(glyph);
    
        if($(this).hasClass('tf')) {
          $('.glyph-zoom').addClass('tf');
        }
        else {
          $('.glyph-zoom').removeClass('tf');
        }
    
        if($(this).hasClass('lig')) {
          $('.glyph-zoom').addClass('lig');
        }
        else {
          $('.glyph-zoom').removeClass('lig');
        }
      });
    
      $('.glyphs-list-item').on('mouseleave', function() {
          $('.glyph-zoom').removeClass('glyph-zoom--visible');
      });
    
    
    
    
    // FEATURE DETECTION
      if ($('body').css("font-variation-settings")) {
      }
      else {
        alert("Your browser does not support variable fonts. You can still use the site, but not the fun features.");
        $('body').addClass('no-variable-fonts');
      }
    
    });