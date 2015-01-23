Handlebars.registerHelper('ifCond', function(v1, v2, options) {
  if(v1 === v2) {
    return options.fn(this);
  }
  return options.inverse(this);
});

var Wedding = Wedding ? Wedding : {};

$(function() {
  Wedding.wedding.init();
});
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
Wedding.wedding = {

    fitTextMultiplier: 1.1,
    unsupportedBrowser: false,
    device: {},

    init: function(){

        $('html').removeClass('no-js');

        this.setupPage();
        if(this.unsupportedBrowser){
            $('body').addClass('oldie').html(Handlebars.oldie());
            $('h1').fitText(1.7);
            return false;
        }
        Wedding.RSVP.init();   //RSVP cards
        this.initSmoothScroll();

        // $.stellar();          //parallax
        var lazyLayout = _.debounce(this.handleResize, 100);
        $(window).resize(lazyLayout);

        $('.say-yargie').on('click', function(){
            var sounds = new Wedding.Util.Sounds();
            sounds.playByID('yargie-audio');
        })
    },

    setupPage: function(){
        this.device = new Wedding.Util.UserAgent();

        if(this.device.isIE9() || this.device.isIE8()){
            this.unsupportedBrowser = true;
            return false;
        }

        if (!!this.device.isAnyMobile()) {
            $('html').addClass('mobile');
            this.fitTextMultiplier = 0.5;
            var scroll = new this.onScroll()
            scroll.init();
        }

        $('body').on('shown.bs.modal', function(){
            $('body').addClass('modal-opened');
        }).on('hide.bs.modal', function(){
            $('body').removeClass('modal-opened');
        })

        if(this.device.isIos()){
            $('html').addClass('ios');
        }else if(this.device.isAndriod){
            $('html').addClass('android');
        }

        $('.strip h1').fitText(this.fitTextMultiplier);
        $('h1.hashtag').fitText(0.5);
    },

    onScroll: function(e){

        this.previosPosition = 0;
        this.handleScroll = _.throttle(function(e){
            console.log($(document).scrollTop());
            var curPosition = $(document).scrollTop();
            if(curPosition > this.previousPosition && (curPosition > 100)){
                $('nav.navbar').addClass('bye');
            }else{
                $('nav.navbar').removeClass('bye');

            }
            this.previousPosition = curPosition;

        },200);
        this.init = function(){
            window.addEventListener("scroll", this.handleScroll);
            // $(window).on('scroll', this.handleScroll);
        }
        return this;
    },

    handleResize: function(e){
        if(e.target.innerWidth < 800){
            Wedding.wedding.fitTextMultiplier = 0.5;
        }else{
            Wedding.wedding.fitTextMultiplier= 1.1;
        }

        $('.strip h1').fitText(Wedding.wedding.fitTextMultiplier);
            // $('h1.hashtag').fitText(0.5);
        },

        initSmoothScroll: function(){
            window.smoothScroll.init({
            speed: 400, // Integer. How fast to complete the scroll in milliseconds
            easing: 'easeInOutCubic', // Easing pattern to use
            updateURL: true, // Boolean. Whether or not to update the URL with the anchor hash on scroll
            offset: 0, // Integer. How far to offset the scrolling anchor location in pixels
            callbackBefore: function ( toggle, anchor ) {
                if(!$('.navbar-toggle').hasClass('collapsed')){
                    $('.navbar-toggle').click();
                }
            }, // Function to run before scrolling
            callbackAfter: function ( toggle, anchor ) {

            } // Function to run after scrolling
        });
        }

    } 
//end Wedding.wedding
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
Wedding.Util = {
	UserAgent: function(){
		this.userAgent = this.userAgent ? this.userAgent : navigator.userAgent;
		this.isAndroid = function(){
			return (/Android/i.test(this.userAgent));
		};
		this.isBlackBerry = function() {
			return (/BlackBerry/i.test(this.userAgent));
		};
		this.isIos =  function() {
			return (/iPhone|iPad|iPod/i.test(this.userAgent));
		};
		this.isWindowsMobile = function() {
			return (/IEMobile/i.test(this.userAgent));
		};
		this.isMobileWebkit = function(){
			return (/WebKit/i.test(this.userAgent) && (/Mobile/i.test(this.userAgent)));
		};
		this.isAnyMobile = function() {
			return (this.isAndroid() || this.isBlackBerry() || this.isIos() || this.isWindowsMobile() || this.isMobileWebkit());
		};
		this.isIE9 = function(){
			return (/MSIE 9/i.test(this.userAgent));
		};
		this.isIE8 = function(){
			return (/MSIE 8/i.test(this.userAgent));
		};


		return this;
	},

	Sounds: function(){
		this.playByID = function(id){
			document.getElementById(id).play();
		}
		return this;
	}, 

	pushNotification: function(){
		this.json = {
			"token": "a46Z7HbKCC1xBH3QTXhiK4uEedbevp",
			"user": "uWECi1Ub1mZkiXALkLU6dax8tc9k7p",
			"device": "iphone5s",
			"title": "Wedding RSVP",
			"message": ""
		};
		this.push = function(callback){
			var theData = this.json;

			var promise = $.ajax({
				url: 'https://api.pushover.net/1/messages.json',
				data: theData,
				type: 'POST',
				contentType: "application/x-www-form-urlencoded",
				success: function(data){
				},
				error: function(xhr, desc, err){
				},
				complete: function(){
				}
			});

			// callback(promise);

			return promise;
		};

		return this;
	},

	slideTo: function(el){
		var to = isNaN(el) ? $(el).offset().top : el, //find scroll to position
		from = $(window).scrollTop(), //find starting point
		dy = to-from, //calculate change in scroll position - deltaY
		body = $("article.body");


	// console.log(to, from, dy);
	/* We're going to use margin-top to move the the page so it feels like we're at the *from* scroll position, when we're actually instantly at the *to* scroll position. */

	body.css("margin-top", dy+"px");
	$(window).scrollTop(to);


	/* Now we will use CSS transitions to perform the scroll for us, by transition the margin-top to 0 */
	body.css("transition","margin-top 1s ease-out");
	body.css("margin-top", 0);

	/* Reset the transition property once we're done with it so we don't get accidental transitions, and so if we slideTo again, the first step will be instant. */

	body.on("webkitTransitionEnd oTransitionEnd otransitionend transitionend MSTransitionEnd", function(){
		$("article.body").css("transition", "none");
	});
},
hideKeyboard: function() {
	document.activeElement.blur();
	$("input").blur();
}
}
Wedding.Admin = {
  init: function(){
    var $guests = $('.admin-guests');


    if(!!$guests){
      console.log('admin');
    }
    $.ajax({
      url: '/api/rsvp/',
      data: null,
      type: 'get',
      success: function(data){
        $guests.html(Handlebars.adminRSVP(data));
        var $rows = $('.index');
        $.each($rows, function(i,val){
          $(val).html(i+1);
        });
        $("#admin").tablesorter();
      },
      error: function(xhr, desc, err){
        console.log('AJAX FAIL :(', xhr, desc, err);
      },
      complete: function(){
              // console.log('AJAX DONE.');
            }
          });
  },
  stats: function(){
    this.init= function(){
      console.log(this);
      window.google.load('visualization', '1', {packages: ['corechart']});
      // window.google.setOnLoadCallback(this.chartFood);
    },
    this.fetch = function(){
      var promise = $.ajax({
        url: '/api/stats',
        data: null,
        type: 'get'});

      return promise;
      // promise.done(this.chartFood);
      // promise.done(this.chartColumn);
    },
    this.chartFood = function(json) {

      console.log('WOWZ:', json);
        // Create and populate the data table.
        
        var jason =  JSON.stringify(json);
        var parsed = $.parseJSON(jason);
        var arr = [["Food", "count"]];
        
        $.each(parsed.food, function(i, obj) {
          arr.push([i.toString(), obj]);
        });
        var finalArr = [arr];

        console.log(finalArr);
        
        var data = window.google.visualization.arrayToDataTable(arr);

        // Create and draw the visualization.
        new window.google.visualization.PieChart(document.getElementById('visualization')).
        draw(data, {
          title:"Reception food breakdown",
          pieHole: 0.5,
          pieSliceText: 'value',
          colors: ['salmon', "brown", '#00693c']
        });
      },
      this.chartRSVPpie = function(json) {

        // Create and populate the data table.
        
        var jason =  JSON.stringify(json);
        var parsed = $.parseJSON(jason);
        var arr = [["Person", "RSVP"]];
        
        $.each(parsed.food, function(i, obj) {
          arr.push([i.toString(), obj]);
        });
        var finalArr = [arr];
        
        var data = window.google.visualization.arrayToDataTable(arr);

        // Create and draw the visualization.
        new window.google.visualization.PieChart(document.getElementById('visualization')).
        draw(data, {
          title:"Reception food breakdown",
          pieHole: 0.5,
          pieSliceText: 'value',
          colors: ['salmon', "brown", '#00693c']
        });
      },
      this.chartRSVPtotals = function(json){
        // Create and populate the data table.
        var jason =  JSON.stringify(json);
        var parsed = $.parseJSON(jason);
        var data = google.visualization.arrayToDataTable([
          ['Families', 'Replied', "Unreplied"],
          ['Families',  parsed.responses.families,   parsed.responses["families-remaining"]],
          ['People',  parsed.responses.people,   parsed.responses["people-remaining"]],
          ['Adults',  parsed.responses.adults,   parsed.responses["adults-remaining"]],
          ['Children',  parsed.responses.children,   parsed.responses["children-remaining"]]
          ]);

        // Create and draw the visualization.
        new google.visualization.ColumnChart(document.getElementById('rsvp-chart')).
        draw(data,
        {
          title:"RSVPs",
          width:500, height:400,
          isStacked: true,
          colors: ['#00693c','#EEE']
        }
        );
      },
      this.chartAttending = function(json){
        var jason =  JSON.stringify(json);
        var parsed = $.parseJSON(jason);
        var data = google.visualization.arrayToDataTable([
          ['Attending', 'Adults', "Children"],
          ['Ceremony Only',  parsed.responses.attending.ceremony.adults,   parsed.responses.attending.ceremony.children],
          ['Ceremony + Reception',  parsed.responses.attending["ceremony+reception"].adults,   parsed.responses.attending["ceremony+reception"].children],
          ['Not Attending',  parsed.responses.declined.adults,   parsed.responses.declined.children]
          ]);


        // Create and draw the visualization.
        new google.visualization.ColumnChart(document.getElementById('attending-chart')).
        draw(data,
        {
          title:"Attendance",
          width:500, height:400,
          isStacked: true,
          colors: ['darkblue','pink']
      
        });
      }

      return this;
    }
  }