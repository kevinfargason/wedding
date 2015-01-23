Wedding.RSVP = {

  cacheDOM: function(){
    var cache = {}

  },

  init: function(){
    var ns = Wedding.RSVP;

    $('#RSVP-form').on('submit', function(e){
      e.preventDefault();
      ns.triggerRSVPcode();
      return false;
    })

    // check RSVP code against API
    $('#rsvp-code').on('keyup', function(e){
      var that = this;
      setTimeout(function(){
        ns.handleRSVPkeyup(that);
      },100);
      
    });
  },

  triggerRSVPcode: function(){
    $('#rsvp-code').trigger('keyup');
  },

  handleRSVPkeyup: function(that){
    var $this = $(that);
    var val = $this.val().toUpperCase();

    if(val.length  === 4){
      Wedding.Util.hideKeyboard();
      $('.loading').addClass('fadeIn').removeClass('fadeOut');   
      $('#rsvp-code').addClass('glow');
      setTimeout(function(){
        $.ajax({
          url: '/api/rsvp/'+val,
          data: null,
          type: 'get',
          success: function(data){
            $('.wrong-code').removeClass('fadeIn').addClass('fadeOut');

            var hasChildren = false;
            $('#RSVPcards').html(Handlebars.RSVPadult(data));
            data.family.forEach(function(person){
              if(person.status === 'child'){
                hasChildren = true;
              }
            });
            if(hasChildren){
              $('#RSVPchildren').html(Handlebars.RSVPchild(data));
              $('.children-info').show(function(){
                $(this).addClass('fadeIn');
              })
            }

            Wedding.RSVP.bindRSVPcards(hasChildren);

          },
          error: function(xhr, desc, err){
              $('.mirror-code').html($('#rsvp-code').val().toUpperCase());  
              $('.wrong-code').removeClass('fadeOut').addClass('fadeIn');
            },
            complete: function(){
              $('#rsvp-code').removeClass('glow');
              $('.loading').removeClass('fadeIn').addClass('fadeOut');   
              setTimeout(function(){
                if(Wedding.wedding.device.isAndroid()){
                  document.location.hash="";
                  document.location.hash="RSVP";
                }
              },1000);
            }
          });
}, 1000)
}
},

saveRSVP: function(theForm){
  //pass in the form that passed validation
  var $theForm = $(theForm);
      theData = $theForm.serialize();


  if(!$theForm.find('.input-food-option:checked').length){
    theData = theData + "&RSVPfood=null";
  }

  $.ajax({
    url: '/api/rsvp/',
    data: theData,
    type: 'put',
    success: function(data){
      $theForm.parents('.friend').find('.incomplete').addClass('fadeOut');
      var theName = $theForm.siblings('h3').html(),
          response = $theForm.find("input[name='RSVPevent']:checked").val(),
          pushy = new Wedding.Util.pushNotification();

      pushy.json.message = theName + "    " + response;
      pushy.push();

    },
    error: function(xhr, desc, err){},
    complete: function(){}
  });
},

bindRSVPcards: function(hasChildren){

  if(!!hasChildren){
    Wedding.validation.form.RSVPchild.init();
    $('.input-ceremony-option').on('change', function(e){
      $(".child").find(".RSVP-accept").attr('value', "ceremony");
    })
  }
  // Wedding.validation.form.RSVPadult.init();

  $('.wrong-code').hide();

  $('.RSVP-modify a').on('click', function(){
    var $this = $(this);
    $this.parents('.friend').find('input').prop('checked', false);
    $this.parents('.friend').find('.food-selections').removeClass('fadeIn').hide()
    $this.parents('.friend').find('.event-selections').removeClass('fadeIn').hide();
    $this.parents('.complete').addClass('fadeOut', function(){
      $(this).removeClass('beef fish vegetarian accepted declined');
    }).removeClass('fadeIn');
    $this.parents('.friend').find('.incomplete').addClass('fadeIn', function(){
      $(this).removeClass('beef fish vegetarian accepted declined');
    }).removeClass('fadeOut');
  })


  $('.incomplete').on('webkitTransitionEnd oTransitionEnd otransitionend transitionend MSTransitionEnd', function(e) {
    var $el = $(e.target);
    if($el.hasClass('fadeOut')){
      $el.hide().removeClass('fadeOut');
      $el.parents('.friend').find('.complete').fadeIn().addClass('fadeIn');
    }

  });

  $('.complete').on('webkitTransitionEnd oTransitionEnd otransitionend transitionend MSTransitionEnd', function(e) {
    var $el = $(e.target);
    if($el.hasClass('fadeOut')){
      $el.hide().removeClass('fadeOut');
      $el.parents('.friend').find('.incomplete').show(function(){
        $(this).addClass('fadeIn');
      });
    }
  });

  $('#rsvp-loading').on('webkitTransitionEnd oTransitionEnd otransitionend transitionend MSTransitionEnd', function(e) {
    var $el = $(e.target);
    if($el.hasClass('fadeOut')){
      $el.hide().removeClass('fadeOut');
      $('.stranger').addClass('fadeOut');
    }
  });

  $('.stranger').on('webkitTransitionEnd oTransitionEnd otransitionend transitionend MSTransitionEnd', function(e) {
    var $el = $(e.target);
    if($el.hasClass('fadeOut')){
      $el.hide().removeClass('fadeOut');
      $('.RSVPcards, .RSVPchildren').show();
      $('.friend').show().addClass('fadeIn');
      $('h3.guest').fitText(1.3);
    }
  });

  $('.event-selections').on('webkitTransitionEnd oTransitionEnd otransitionend transitionend MSTransitionEnd', function(e) {
    var $el = $(e.target);
    if($el.hasClass('fadeOut')){
      $el.slideUp('fast').removeClass('fadeOut');
    }
  });
  $('.food-selections').on('webkitTransitionEnd oTransitionEnd otransitionend transitionend MSTransitionEnd', function(e) {
    var $el = $(e.target);
    if($el.hasClass('fadeOut')){
      $el.slideUp('fast').removeClass('fadeOut');
    }
  });
    //end animation timing

    //RSVP
    $('.RSVP-accept').on('change', function(){
      var $this = $(this);
      $this.parents('.friend').find('.complete').addClass('accepted').removeClass('declined');
      $this.parents('form').find('.event-selections').show(function(){
        $(this).addClass('fadeIn').removeClass('fadeOut');
      });
      if(!!$this[0].checked){
        $this.parents('form').find('.RSVP-decline').attr('checked', false);
      }
    });

    $('.input-ceremony-reception-option').on('change', function(){
      var $this = $(this);
      $this.parents('.friend').find('.complete').addClass('ceremony-reception').removeClass('ceremony-only');
      $this.parents('form').find('.food-selections').show(function(){
        $(this).addClass('fadeIn').removeClass('fadeOut');
      });
    });

    //attending ceremony only
    $('.input-ceremony-option').on('change', function(){
      var $this = $(this);
      if(!!$this[0].checked){
        $this.parents('form').find('.RSVP-decline').attr('checked', false);
        $this.parents('form').find('.food-selections').attr('checked', false);
        $this.parents('.friend').find('.selected-reception').hide();
        Wedding.RSVP.saveRSVP($this.parents('form'));
      }
    });

    $('.input-food-option').on('change', function(){
     var $this = $(this);
          if(!!$this[0].checked){
            $this.parents('form').find('.RSVP-decline').attr('checked', false);
            $this.parents('.friend').find('.selected-food').html($this.val());
            $this.parents('.friend').find('.selected-reception').show();
            Wedding.RSVP.saveRSVP($this.parents('form'));
          }
    });

    //not attending
    $('.RSVP-decline').on('change', function(){
      var $this = $(this);
      if(!!$this[0].checked){
        $this.parents('.friend').find('.complete').addClass('declined').removeClass('accepted');

        $this.parents('form').find('.food-selections').removeClass('fadeIn').addClass('fadeOut').attr('checked', false);
        $this.parents('form').find('.event-selections').removeClass('fadeIn').addClass('fadeOut').attr('checked', false);
        $this.parents('form').find('.RSVP-accept').attr('checked', false);
        $this.parents('form').find('.event-selections').find('input').attr('checked', false);
        Wedding.RSVP.saveRSVP($this.parents('form'));
        // this.$this.submit()  
      }
    });

    $('form.RSVP-child').on('change', function(e){

      // if( $(e.target).hasClass('input-food-option') ){
      //   var food = $(e.target).val();
      //   $(this).parents('.friend').find('.complete').addClass(food);
      // }
      var theForm = $(this);
      setTimeout(
        function(){
          $(theForm).submit();
        }, 100);
  });
  } //end bindRSVPcards

}