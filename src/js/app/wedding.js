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