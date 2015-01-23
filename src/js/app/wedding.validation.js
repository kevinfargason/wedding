Wedding.validation = {
  init: function(){

  },

  form: {
    RSVPchild:{
      cacheDom: function(){
        var cache = {};
        var allGood = cache;
        cache.childForms = $('form.RSVP-child');
        // cache.bad = $('#kevin-awesome-stuff');

        $.each(cache, function(i, val){
          console.log(i,val);
          if(val.length === 0){
            allGood = false;
          }
        });

        return allGood;
      },
      init: function(){
        var $cache = this.cacheDom();

        $.each($cache.childForms, function(i, childForm){
          $(childForm).validate({
            rules:{
              RSVPchild: "required"
            },
            showErrors: function(errorMap, errorList){
              $(this.currentForm).parents('.friend').find('.RSVP-status').removeClass('valid');
            },
            submitHandler: function(theForm){
              console.log('SUBMIT SUCESSS!');
              Wedding.RSVP.saveRSVP(theForm);
              // $(this.currentForm).parents('.friend').find('.RSVP-status').addClass('valid');
            }
          });

        });
      }
    },
    RSVPadult:{
      init: function(){

        var $adultForms = $('form.RSVP-adult');  //this isn't what it sounds like, I promise

        //bind validation to all the adults
        $.each($adultForms, function(i, adultForm){
          $(adultForm).validate({
            rules: {
              // RSVP: {
              //   required:{
              //     depends: function(element) {
              //       console.log("RSVP-->",!($(this).parents('friend').find('.RSVP-decline:checked').length))
              //       return !($(this).parents('friend').find('.RSVP-decline:checked').length);
              //     }
              //   }
              // },
              RSVPevent: {
                required:{
                  depends: function(element) {
                    console.log("EVENT-->",!!$(this).parents('friend').find('.RSVP-accept:checked').length);
                    // return $(this).parents('friend').find('.RSVP-accept:checked').length;
                    return !($(this).parents('friend').find('.RSVP-decline:checked').length);
                  }
                }
              },
              RSVPfood: {
                required:{
                  depends: function(element) {
                    console.log("FOOD-->", !!$(this).parents('friend').find('.input-ceremony-reception-option:checked'), !($(this).parents('friend').find('.RSVP-decline:checked').length));
                    return !!$(this).parents('friend').find('.input-ceremony-reception-option:checked').length && !($(this).parents('friend').find('.RSVP-decline:checked').length);
                  }
                }
              }
            },
            showErrors: function(errorMap, errorList){
              if(!!errorList.length){
                $(this.currentForm).parents('.friend').find('.RSVP-status').removeClass('valid');
                console.log('REMOVE VALID', errorList);
              }
            },
            submitHandler: function(theForm){
              console.log("FORM IS VALID!!  -->", theForm);
              Wedding.RSVP.saveRSVP(theForm);
            }
          });
        });
      } // end init
    } //end RSVPadult
  } //end forms
} //end validation