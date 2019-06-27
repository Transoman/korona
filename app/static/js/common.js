global.jQuery = require('jquery');
var svg4everybody = require('svg4everybody'),
popup = require('jquery-popup-overlay'),
IMask = require('imask');

jQuery(document).ready(function($) {

  // Toggle nav menu
  $('.nav-toggle').on('click', function (e) {
    e.preventDefault();
    $(this).toggleClass('active');
    $('.header__nav').toggleClass('is-active');
  });

  document.addEventListener('click', function (e) {
    var hamburger = document.querySelector('.nav-toggle');
    var menu = document.querySelector('.nav');
    var target = e.target;
    var its_menu = target == menu || menu.contains(target);
    var its_hamburger = target == hamburger || hamburger.contains(target);
    var menu_is_active = menu.classList.contains('is-active');

    if (!its_menu && !its_hamburger && menu_is_active) {
      $('.nav-toggle').toggleClass('active');
      $('.header__nav').toggleClass('is-active');
    }
  });

  // Modal
  $('.modal').popup({
    transition: 'all 0.3s',
    onclose: function() {
      $(this).find('label.error').remove();
    }
  });

  $('.ajax-form').submit(function(e) {
    e.preventDefault();
    var data = $(this).serialize();
    ajaxSend($('.ajax-form'), data);
  });

  function ajaxSend(formName, data) {
    jQuery.ajax({
      type: "POST",
      url: "sendmail.php",
      data: data,
      success: function() {
        $(".modal").popup("hide");
        $("#thanks").popup("show");
        setTimeout(function() {
          $(formName).trigger('reset');
        }, 2000);
      }
    });
  }

  $('a[href*="#"]')
  // Remove links that don't actually link to anything
    .not('[href="#"]')
    .not('[href="#0"]')
    .click(function(event) {
      // On-page links
      if (
        location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '')
        &&
        location.hostname == this.hostname
      ) {
        // Figure out element to scroll to
        var target = $(this.hash);
        target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
        // Does a scroll target exist?
        if (target.length) {
          // Only prevent default if animation is actually gonna happen
          event.preventDefault();

          if ($(window).width() > 1199) {
            var offset = $('.header__bottom').height();
          }
          else {
            var offset = $('.header').height();
          }

          $('html, body').animate({
            scrollTop: target.offset().top - offset
          }, 1000);
        }
      }
    });

  // Fixed header
  var fixedHeader = function(e) {
    if ($(window).width() > 1199) {
      var h = $('.header__bottom').innerHeight();

      if (e.scrollTop() > 79) {
        $('.header').css('padding-bottom', h);
        $('.header__bottom').addClass('fixed');
      }
      else {
        $('.header').css('padding-bottom', 0);
        $('.header__bottom').removeClass('fixed');
      }
    }
  };

  fixedHeader($(this));

  $(window).scroll(function() {
    fixedHeader($(this));
  });

  var inputsPhone = $('input[type="tel"]');
  var maskOptions = {
    mask: '+{7} (000) 000-00-00'
  };

  if (inputsPhone.length) {
    inputsPhone.each(function(i, el) {
      IMask(el, maskOptions);
    });
  }
  // SVG
  svg4everybody({});

});