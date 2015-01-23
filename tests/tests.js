// require('../dist/js/wedding.min.js');
window.TEST = {};


// tests.js
describe('Wedding sanity check', function(){
  describe('Wedding', function(){
    it('should exist', function(){
      //chai.assert.equal(-1, [1,2,3].indexOf(5));
      expect(Wedding).to.exist;
    });
  });
  describe('Wedding.RSVP', function(){
    it('should exist', function(){
      expect(Wedding.RSVP).to.exist;
    })
  });
  describe('Wedding.Util', function () {
    it('should exist', function () {
      expect(Wedding.Util).to.exist;
    });
  });
  describe('Wedding.Admin', function () {
    it('should exist', function () {
      expect(Wedding.Admin).to.exist;
    });
  });
});



describe('Wedding.validation', function () {
  describe('init()', function () {
    it('should exist', function () {
      expect(Wedding.validation.init).to.exist;
    });
  });
  describe('form.RSVPchild', function(){
    it('should exist', function () {
      expect(Wedding.validation.form.RSVPchild.init).to.exist;
    });
    describe.skip('DOM tests', function () {
      it('Should find cached DOM elements', function () {
        var cache = Wedding.validation.form.RSVPchild.cacheDom();
        cache.should.be.an("object");
      });
    });
  });
});


describe('Wedding.RSVP', function () {
  describe('init()', function () {
    it('Should exist', function () {
      expect(Wedding.RSVP.init).to.exist;
    });
  });

  describe('triggerRSVPcode()', function () {
    it('Should trigger keyup on #rsvp-code', function () {
      // var checkEvent = sinon.spy();
      $('#rsvp-code').on('keyup', function(e){
        expect(e.type).to.contain("keyup");
        return e.type;
      });
      Wedding.RSVP.triggerRSVPcode();
    });
  });

  describe('handleRSVPkeyup', function () {
    it('Should use the value entered to make an AJAX call to check if the RSVP code is valid', function () {

    });
  });
});

describe('Wedding.Util', function () {
  describe('UserAgent', function () {
    it('should be a function', function () {
      (Wedding.Util.UserAgent).should.be.a("function");
    });
    it('should return an object', function () {
      (Wedding.Util.UserAgent()).should.be.an("object");
    });
    describe('isAndroid', function () {
      it('should return true on an Android device', function () {
        var ua = new Wedding.Util.UserAgent();
        ua.userAgent = "Mozilla/5.0 (Linux; U; Android 4.0.3; ko-kr; LG-L160L Build/IML74K) AppleWebkit/534.30 (KHTML, like Gecko) Version/4.0 Mobile Safari/534.30";
        (ua.isAndroid()).should.equal(true);
      });
    });
    describe('isBlackBerry', function () {
      it('should return true on an Blackberry device', function () {
        var ua = new Wedding.Util.UserAgent();
        ua.userAgent = "Mozilla/5.0 (BlackBerry; U; BlackBerry 9900; en) AppleWebKit/534.11+ (KHTML, like Gecko) Version/7.1.0.346 Mobile Safari/534.11+";
        (ua.isBlackBerry()).should.equal(true);
      });
    });
    describe('isIos', function () {
      it('should return true on an iOS device', function () {
        var ua = new Wedding.Util.UserAgent();
        ua.userAgent = "Mozilla/5.0 (iPhone; CPU iPhone OS 7_0 like Mac OS X; en-us) AppleWebKit/537.51.1 (KHTML, like Gecko) Version/7.0 Mobile/11A465 Safari/9537.53";
        (ua.isIos()).should.equal(true);
      });
    });
    describe('isWindowsMobile', function () {
      it('should return true on an Windows Mobile device', function () {
        var ua = new Wedding.Util.UserAgent();
        ua.userAgent = "Mozilla/5.0 (compatible; MSIE 9.0; Windows Phone OS 7.5; Trident/5.0; IEMobile/9.0)";
        (ua.isWindowsMobile()).should.equal(true);
      });
    });
    describe('isMobileWebkit', function () {
      it('should return true on a mobile WebKit browser', function () {
        var ua = new Wedding.Util.UserAgent();
        ua.userAgent = "Mozilla/5.0 (Linux; U; Android 4.0.3; ko-kr; LG-L160L Build/IML74K) AppleWebkit/534.30 (KHTML, like Gecko) Version/4.0 Mobile Safari/534.30";
        (ua.isMobileWebkit()).should.equal(true);
      });
    });
    describe('isAnyMobile', function () {
      it('should return true on any mobile device', function () {
        var ua = new Wedding.Util.UserAgent();
        ua.userAgent = "Mozilla/5.0 (Linux; U; Android 4.0.3; ko-kr; LG-L160L Build/IML74K) AppleWebkit/534.30 (KHTML, like Gecko) Version/4.0 Mobile Safari/534.30";
        (ua.isAnyMobile()).should.equal(true);
      });
    });
    describe('isIE8', function () {
      it('should return true on IE8', function () {
        var ua = new Wedding.Util.UserAgent();
        ua.userAgent = "Mozilla/5.0 (compatible; MSIE 8.0; Windows NT 6.1; Trident/4.0; GTB7.4; InfoPath.2; SV1; .NET CLR 3.3.69573; WOW64; en-US)";
        (ua.isIE8()).should.equal(true);
      });
    });
    describe('isIE9', function () {
      it('should return true on IE9', function () {
        var ua = new Wedding.Util.UserAgent();
        ua.userAgent = "Mozilla/5.0 (compatible; MSIE 9.0; Windows NT 6.1; Trident/4.0; GTB7.4; InfoPath.2; SV1; .NET CLR 3.3.69573; WOW64; en-US)";
        (ua.isIE9()).should.equal(true);
      });
    });


  }); //end UserAgent
describe('Sounds', function () {
  before(function () {
    //set up DOM
    var elAudio = document.createElement('audio');
    var $el = $(elAudio).attr('id', 'audio-id');
    $('body').append($el);
  });
  after(function(){
    $('#audio-id').remove();
  });
  it('should return an object', function () {
    (Wedding.Util.Sounds()).should.be.an('object');
  });
  it('event "play" should fire on the audio element passed in', function () {

    var $el = $('#audio-id'),
    sounds = Wedding.Util.Sounds(),
    eventSpy = sinon.spy();

    $el.on('play', eventSpy);
    sounds.playByID('audio-id');
  });
});




describe('pushNotification', function () {
  beforeEach(function () {
    TEST.pushy = new Wedding.Util.pushNotification();
    TEST.xhr = sinon.useFakeXMLHttpRequest();
    TEST.requests = this.requests = [];

    TEST.xhr.onCreate = function (xhr) {
      TEST.requests.push(xhr);
    };

  });
  afterEach(function () {
    delete TEST.pushy;
    // TEST.xhr.restore();
  });
  it('should should return an object', function () {
    (TEST.pushy).should.be.an('object');
  });
  describe('this.json', function () {
    it('should have a default json object', function () {
      (TEST.pushy.json.token).should.be.a('string') &&
      (TEST.pushy.json.user).should.be.a('string') &&
      (TEST.pushy.json.device).should.be.a('string') &&
      (TEST.pushy.json.title).should.be.a('string') &&
      (TEST.pushy.json.message).should.be.a('string')
    });
  });

  describe('this.push()', function () {
    it('should be a function', function () {
      (TEST.pushy.push).should.be.a('function');
    });
    it('should make an AJAX call', function () {
       TEST.pushy.push();
       (TEST.requests).should.have.length(1);
    });
    it('should return a promise', function(){
      (TEST.pushy.push().success).should.be.a('function');
    });
  });
  
});

describe('hideKeyboard()', function () {
  before(function () {
    //set up DOM
    var elinput = document.createElement('input');
    var $el = $(elinput).attr('id', 'input-id');
    $('body').append($el);
  });
  after(function(){
    $('#input-id').remove();
  });
  it('should remove focus from all elements', function () {
    $('#input-id').focus();
    Wedding.Util.hideKeyboard();
    ($("#input-id").is(":focus")).should.equal(false);
  });
});


});