// IIFE - Immediately Invoked Function Expression
(function(main) {

    // The global jQuery object is passed as a parameter
    main(window.jQuery, window, document);
 
    }(function($, window, document) {
 
        // The $ is now locally scoped
        $(function() {
 
           $('nav ul li a').on('click', function(evt){
             changeNavigation(evt, $(this));
           });
 
            // The DOM is ready!
            $('#technical-skills li').on('mousemove', function(evt){
              var elementOffset = $(this).offset();
              //$(this).find('.desc').delay(100).stop(true, false).animate({
              $(this).find('.desc').css({
                left: evt.pageX - elementOffset.left + 10,
                top: evt.pageY - elementOffset.top + 20
              });
            });
 
            $('form').validate({
              errorElement: 'em',
              rules: {
                contact_name: {
                  required: true
                },
                contact_email: {
                  required: true,
                  email: true
                },
                contact_message: {
                  required: true
                }
              }
            });
 
            $('form').on('submit', function(e){
              e.preventDefault();
              if($(this).find('input.error').length < 1)
              {
                var xhr = $.ajax({
                  type: "POST",
                  url: $(this).attr('action'),
                  data: $(this).serializeArray()
                }).done(function(data){
                  if(data.status == 'success')
                  {
                   $('form').fadeOut(300, function(){
                     //var message = '<div class="display-none"><p>Hallo ' + data.name + '! Vielen Dank für die Nachricht! Ich werde mich so schnell wie möglich zurückmelden!</p></div>';
                     var message = 'Hallo ' + data.name + '! Vielen Dank für die Nachricht! Ich werde mich so schnell wie möglich zurückmelden!';
                     //$(this).before(message);
                     $(this).prev('p.clear-both').addClass('push-up').text(message);
                   });
                  }
                });
              }
 
            });
 
        });
 
 
 
        // The rest of your code goes here!
        function changeNavigation(evt, element)
        {
          evt.preventDefault();
          $('nav ul li a.active').removeClass('active');
          element.addClass('active');
          scrollToElement($('section' + element.attr('href')), 20, 300, 300);
        }
 
        function scrollToElement(element, offset, duration, delay)
        {
          jQuery('body').stop().delay(delay).animate({
            scrollTop: element.offset().top - offset
          }, duration);
 
          return false;
        }
 
    }
 ));