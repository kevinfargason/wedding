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