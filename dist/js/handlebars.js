this["Handlebars"] = this["Handlebars"] || {};

this["Handlebars"]["RSVPadult"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression, self=this, helperMissing=helpers.helperMissing;

function program1(depth0,data,depth1) {
  
  var buffer = "", stack1, stack2, options;
  buffer += "\n\n";
  options = {hash:{},inverse:self.noop,fn:self.programWithDepth(2, program2, data, depth1),data:data};
  stack2 = ((stack1 = helpers.ifCond || depth0.ifCond),stack1 ? stack1.call(depth0, depth0.status, "adult", options) : helperMissing.call(depth0, "ifCond", depth0.status, "adult", options));
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += "\n";
  return buffer;
  }
function program2(depth0,data,depth2) {
  
  var buffer = "", stack1, stack2;
  buffer += "\n<div class=\"friend adult\">\n  <div class=\"border\">\n    <section class=\"incomplete\">\n      <h3 class=\"guest\">";
  if (stack1 = helpers.title) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.title; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + " ";
  if (stack1 = helpers.first) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.first; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + " ";
  if (stack1 = helpers.last) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.last; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + ":</h3>\n      <form role=\"form\" class=\"RSVP-adult\" id=\"RSVP-response-";
  if (stack1 = helpers.first) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.first; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\" name=\"RSVP-response-";
  if (stack1 = helpers.first) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.first; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\" data-validate=\"true\">\n        <input type=\"hidden\" name=\"RSVPcode\" value=\""
    + escapeExpression(((stack1 = depth2.code),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\">\n        <input type=\"hidden\" name=\"id\" value=\"";
  if (stack2 = helpers.id) { stack2 = stack2.call(depth0, {hash:{},data:data}); }
  else { stack2 = depth0.id; stack2 = typeof stack2 === functionType ? stack2.apply(depth0) : stack2; }
  buffer += escapeExpression(stack2)
    + "\">\n        <div class=\"form-group\">\n          <div class=\"radio RSVP-response\">\n            <label>\n              <input type=\"radio\" name=\"RSVP\" id=\"RSVP-accept-";
  if (stack2 = helpers.first) { stack2 = stack2.call(depth0, {hash:{},data:data}); }
  else { stack2 = depth0.first; stack2 = typeof stack2 === functionType ? stack2.apply(depth0) : stack2; }
  buffer += escapeExpression(stack2)
    + "\" class=\"RSVP-accept\" value=\"yes\" class=\"\" >\n              Accepts with great pleasure.\n            </label>\n          </div>\n          <div class=\"form-group event-selections\">\n              <div class=\"radio\">\n              <label>\n                <input type=\"radio\" name=\"RSVPevent\" id=\"RSVP-";
  if (stack2 = helpers.first) { stack2 = stack2.call(depth0, {hash:{},data:data}); }
  else { stack2 = depth0.first; stack2 = typeof stack2 === functionType ? stack2.apply(depth0) : stack2; }
  buffer += escapeExpression(stack2)
    + "-ceremony\" value=\"ceremony\" class=\"input-ceremony-option\" >\n                Ceremony Only\n              </label>\n            </div>\n            <div class=\"radio\">\n              <label>\n                <input type=\"radio\" name=\"RSVPevent\" id=\"RSVP-";
  if (stack2 = helpers.first) { stack2 = stack2.call(depth0, {hash:{},data:data}); }
  else { stack2 = depth0.first; stack2 = typeof stack2 === functionType ? stack2.apply(depth0) : stack2; }
  buffer += escapeExpression(stack2)
    + "-reception\" value=\"ceremony+reception\" class=\"input-ceremony-reception-option\" >\n                Ceremony + Reception\n              </label>\n            </div>\n          </div>\n          <div class=\"form-group food-selections\">\n            <h4>Please indicate your preference of entreé:</h4>\n\n            <div class=\"radio\">\n              <label>\n                <input type=\"radio\" name=\"RSVPfood\" id=\"RSVP-";
  if (stack2 = helpers.first) { stack2 = stack2.call(depth0, {hash:{},data:data}); }
  else { stack2 = depth0.first; stack2 = typeof stack2 === functionType ? stack2.apply(depth0) : stack2; }
  buffer += escapeExpression(stack2)
    + "-food-beef\" value=\"beef\" class=\"input-food-option\" >\n                Beef Entreé\n              </label>\n            </div>\n            <div class=\"radio\">\n              <label>\n                <input type=\"radio\" name=\"RSVPfood\" id=\"RSVP-";
  if (stack2 = helpers.first) { stack2 = stack2.call(depth0, {hash:{},data:data}); }
  else { stack2 = depth0.first; stack2 = typeof stack2 === functionType ? stack2.apply(depth0) : stack2; }
  buffer += escapeExpression(stack2)
    + "-food-fish\" value=\"fish\" class=\"input-food-option\" >\n                Fish Entreé\n              </label>\n            </div>\n            <div class=\"radio\">\n              <label>\n                <input type=\"radio\" name=\"RSVPfood\" id=\"RSVP-";
  if (stack2 = helpers.first) { stack2 = stack2.call(depth0, {hash:{},data:data}); }
  else { stack2 = depth0.first; stack2 = typeof stack2 === functionType ? stack2.apply(depth0) : stack2; }
  buffer += escapeExpression(stack2)
    + "-food-veggie\" value=\"vegetarian\" class=\"input-food-option\" >\n                Vegetarian Entreé\n              </label>\n            </div>\n          </div>\n          <div class=\"radio RSVP-response\">\n            <label>\n              <input type=\"radio\" name=\"RSVPevent\" id=\"RSVP-";
  if (stack2 = helpers.first) { stack2 = stack2.call(depth0, {hash:{},data:data}); }
  else { stack2 = depth0.first; stack2 = typeof stack2 === functionType ? stack2.apply(depth0) : stack2; }
  buffer += escapeExpression(stack2)
    + "-decline\" class=\"RSVP-decline\" value=\"no\" class=\"\" >\n              Declines with deep and lingering regrets.\n            </label>\n          </div>\n        </div>\n      </form>\n    </section>\n    <section class=\"complete\">\n      <div class=\"RSVP-modify\">\n      <a> <span>modify</span> <span class=\"glyphicon glyphicon-pencil\"></span> </a>\n      </div>\n      <h3><span class=\"glyphicon glyphicon-ok\"></span><span class=\"short\"> Thank You</span><span class=\"long\"> Your response has been recorded.</span></h3>\n      <div class=\"accepted\">\n        <p><span class=\"guest\">";
  if (stack2 = helpers.title) { stack2 = stack2.call(depth0, {hash:{},data:data}); }
  else { stack2 = depth0.title; stack2 = typeof stack2 === functionType ? stack2.apply(depth0) : stack2; }
  buffer += escapeExpression(stack2)
    + " ";
  if (stack2 = helpers.first) { stack2 = stack2.call(depth0, {hash:{},data:data}); }
  else { stack2 = depth0.first; stack2 = typeof stack2 === functionType ? stack2.apply(depth0) : stack2; }
  buffer += escapeExpression(stack2)
    + " ";
  if (stack2 = helpers.last) { stack2 = stack2.call(depth0, {hash:{},data:data}); }
  else { stack2 = depth0.last; stack2 = typeof stack2 === functionType ? stack2.apply(depth0) : stack2; }
  buffer += escapeExpression(stack2)
    + "</span> <br class=\"short\">accepts with great pleasure.</p>\n        <p class=\"selected-reception\">A <span class=\"selected-food\"></span> entreé is preferred.</p>\n      </div>\n      <div class=\"declined\">\n        <p><span class=\"guest\">";
  if (stack2 = helpers.title) { stack2 = stack2.call(depth0, {hash:{},data:data}); }
  else { stack2 = depth0.title; stack2 = typeof stack2 === functionType ? stack2.apply(depth0) : stack2; }
  buffer += escapeExpression(stack2)
    + " ";
  if (stack2 = helpers.first) { stack2 = stack2.call(depth0, {hash:{},data:data}); }
  else { stack2 = depth0.first; stack2 = typeof stack2 === functionType ? stack2.apply(depth0) : stack2; }
  buffer += escapeExpression(stack2)
    + " ";
  if (stack2 = helpers.last) { stack2 = stack2.call(depth0, {hash:{},data:data}); }
  else { stack2 = depth0.last; stack2 = typeof stack2 === functionType ? stack2.apply(depth0) : stack2; }
  buffer += escapeExpression(stack2)
    + "</span> <br class=\"short\">declines to attend.</p>\n      </div>\n    </section>\n  </div>\n  <div class=\"card-shadow\"></div>\n</div>\n\n";
  return buffer;
  }

  stack1 = helpers.each.call(depth0, depth0.family, {hash:{},inverse:self.noop,fn:self.programWithDepth(1, program1, data, depth0),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n";
  return buffer;
  });

this["Handlebars"]["RSVPchild"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, stack2, options, functionType="function", escapeExpression=this.escapeExpression, self=this, helperMissing=helpers.helperMissing;

function program1(depth0,data) {
  
  
  return "<span class=\"child-rate\"> at a rate of $20 per child</span>";
  }

function program3(depth0,data,depth1) {
  
  var buffer = "", stack1, stack2, options;
  buffer += "\n\n";
  options = {hash:{},inverse:self.noop,fn:self.programWithDepth(4, program4, data, depth1),data:data};
  stack2 = ((stack1 = helpers.ifCond || depth0.ifCond),stack1 ? stack1.call(depth0, depth0.status, "child", options) : helperMissing.call(depth0, "ifCond", depth0.status, "child", options));
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += "\n";
  return buffer;
  }
function program4(depth0,data,depth2) {
  
  var buffer = "", stack1, stack2;
  buffer += "\n<div class=\"friend child\">\n  <div class=\"border\">\n    <section class=\"incomplete\">\n      <h3 class=\"guest\">";
  if (stack1 = helpers.first) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.first; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + " ";
  if (stack1 = helpers.last) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.last; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + ":</h3>\n      <form role=\"form\" class=\"RSVP-child\" id=\"RSVP-response-";
  if (stack1 = helpers.first) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.first; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\" name=\"RSVP-response-";
  if (stack1 = helpers.first) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.first; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\" data-validate=\"true\">\n        <input type=\"hidden\" name=\"RSVPcode\" value=\""
    + escapeExpression(((stack1 = depth2.code),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\">\n        <input type=\"hidden\" name=\"id\" value=\"";
  if (stack2 = helpers.id) { stack2 = stack2.call(depth0, {hash:{},data:data}); }
  else { stack2 = depth0.id; stack2 = typeof stack2 === functionType ? stack2.apply(depth0) : stack2; }
  buffer += escapeExpression(stack2)
    + "\">\n        <div class=\"form-group\">\n          <div class=\"radio RSVP-response\">\n            <label>\n              <input type=\"radio\" name=\"RSVPevent\" id=\"RSVP-accept-";
  if (stack2 = helpers.first) { stack2 = stack2.call(depth0, {hash:{},data:data}); }
  else { stack2 = depth0.first; stack2 = typeof stack2 === functionType ? stack2.apply(depth0) : stack2; }
  buffer += escapeExpression(stack2)
    + "\" class=\"RSVP-accept\" value=\"ceremony+reception\" class=\"\" >\n              Will be in attendance.\n            </label>\n          </div>\n          <div class=\"radio RSVP-response\">\n            <label>\n              <input type=\"radio\" name=\"RSVPevent\" id=\"RSVP-";
  if (stack2 = helpers.first) { stack2 = stack2.call(depth0, {hash:{},data:data}); }
  else { stack2 = depth0.first; stack2 = typeof stack2 === functionType ? stack2.apply(depth0) : stack2; }
  buffer += escapeExpression(stack2)
    + "-decline\" class=\"RSVP-decline\" value=\"no\" class=\"\" >\n              Declines with deep and lingering regrets.\n            </label>\n          </div>\n        </div>\n      </form>\n    </section>\n    <section class=\"complete\">\n      <div class=\"RSVP-modify\">\n      <a> <span>modify</span> <span class=\"glyphicon glyphicon-pencil\"></span> </a>\n      </div>\n      <h3><span class=\"glyphicon glyphicon-ok\"></span><span class=\"short\"> Thank You</span><span class=\"long\"> Your response has been recorded.</span></h3>\n      <div class=\"accepted\">\n        <p><span class=\"guest\">";
  if (stack2 = helpers.first) { stack2 = stack2.call(depth0, {hash:{},data:data}); }
  else { stack2 = depth0.first; stack2 = typeof stack2 === functionType ? stack2.apply(depth0) : stack2; }
  buffer += escapeExpression(stack2)
    + " ";
  if (stack2 = helpers.last) { stack2 = stack2.call(depth0, {hash:{},data:data}); }
  else { stack2 = depth0.last; stack2 = typeof stack2 === functionType ? stack2.apply(depth0) : stack2; }
  buffer += escapeExpression(stack2)
    + "</span> will be in attendance.</p>\n      </div>\n      <div class=\"declined\">\n        <p><span class=\"guest\">";
  if (stack2 = helpers.first) { stack2 = stack2.call(depth0, {hash:{},data:data}); }
  else { stack2 = depth0.first; stack2 = typeof stack2 === functionType ? stack2.apply(depth0) : stack2; }
  buffer += escapeExpression(stack2)
    + " ";
  if (stack2 = helpers.last) { stack2 = stack2.call(depth0, {hash:{},data:data}); }
  else { stack2 = depth0.last; stack2 = typeof stack2 === functionType ? stack2.apply(depth0) : stack2; }
  buffer += escapeExpression(stack2)
    + "</span> declines to attend.</p>\n      </div>\n    </section>\n  </div>\n  <div class=\"card-shadow\"></div>\n</div>\n";
  return buffer;
  }

  buffer += "<div class=\"children-info\">\n  <p>Children are more than welcomed to attend our wedding; however, due to venue limitations a separate children’s reception staffed by Black-Tie Babysitting will be provided on site at Arlington Hall for all children 12 and under";
  options = {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data};
  stack2 = ((stack1 = helpers.ifCond || depth0.ifCond),stack1 ? stack1.call(depth0, depth0.charge, true, options) : helperMissing.call(depth0, "ifCond", depth0.charge, true, options));
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += ".</p>\n\n\n    </div>\n\n";
  stack2 = helpers.each.call(depth0, depth0.family, {hash:{},inverse:self.noop,fn:self.programWithDepth(3, program3, data, depth0),data:data});
  if(stack2 || stack2 === 0) { buffer += stack2; }
  return buffer;
  });

this["Handlebars"]["adminRSVP"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n  <tr>\n  <td>&nbsp;</td>\n    <td></td>\n    <td></td>\n    <td></td>\n    <td></td>\n    <td></td>\n  </tr>\n  ";
  stack1 = helpers.each.call(depth0, depth0.family, {hash:{},inverse:self.noop,fn:self.programWithDepth(2, program2, data, depth0),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n  ";
  return buffer;
  }
function program2(depth0,data,depth1) {
  
  var buffer = "", stack1, stack2;
  buffer += "\n\n  <tr>\n    <td class=\"index\"></td>\n    <td>"
    + escapeExpression(((stack1 = depth1.code),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</td>\n    <td>";
  if (stack2 = helpers.status) { stack2 = stack2.call(depth0, {hash:{},data:data}); }
  else { stack2 = depth0.status; stack2 = typeof stack2 === functionType ? stack2.apply(depth0) : stack2; }
  buffer += escapeExpression(stack2)
    + "</td>\n    <td>";
  if (stack2 = helpers.title) { stack2 = stack2.call(depth0, {hash:{},data:data}); }
  else { stack2 = depth0.title; stack2 = typeof stack2 === functionType ? stack2.apply(depth0) : stack2; }
  buffer += escapeExpression(stack2)
    + " ";
  if (stack2 = helpers.first) { stack2 = stack2.call(depth0, {hash:{},data:data}); }
  else { stack2 = depth0.first; stack2 = typeof stack2 === functionType ? stack2.apply(depth0) : stack2; }
  buffer += escapeExpression(stack2)
    + " ";
  if (stack2 = helpers.last) { stack2 = stack2.call(depth0, {hash:{},data:data}); }
  else { stack2 = depth0.last; stack2 = typeof stack2 === functionType ? stack2.apply(depth0) : stack2; }
  buffer += escapeExpression(stack2)
    + "</td>\n    <td>"
    + escapeExpression(((stack1 = ((stack1 = depth0.response),stack1 == null || stack1 === false ? stack1 : stack1.attending)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</td>\n    <td>"
    + escapeExpression(((stack1 = ((stack1 = depth0.response),stack1 == null || stack1 === false ? stack1 : stack1.food)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</td>\n  </tr>\n\n  ";
  return buffer;
  }

  buffer += "<table id=\"admin\">\n<thead>\n  <tr>\n    <th>Count</th>\n    <th>Code</th>\n    <th>Status</th>\n    <th>Name</th>\n    <th>RSVP</th>\n    <th>Food</th>\n  </tr>\n</thead>\n<tbody>\n  ";
  stack1 = helpers.each.call(depth0, depth0.people, {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n</tbody>\n</table>\n\n<table>\n  <tr>\n    <th>Fi</th>\n  </tr>\n</table>";
  return buffer;
  });

this["Handlebars"]["oldie"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  


  return "<h1>Your browser says &ldquo;I Don't.&rdquo;</h1>\n\n<div class=\"container\">\n<div class=\"col-sm-8 col-sm-offset-2 bg\">\n\n<div class=\"vellum\"></div>\n<div class=\"content\">\n<p>Your browser is too old and outdated to run the fancy stuff on Kevin and Yana's site.\n  They recommend that you download one of these browsers to view the site.  The rest of the internet will be way more awesome on these browsers too!</p>\n\n  <ul>\n    <li><a href=\"https://www.google.com/intl/en-US/chrome/browser/\">Chrome</a></li>\n    <li><a href=\"http://support.apple.com/downloads/#safari\">Safari</a></li>   \n    <li><a href=\"http://www.mozilla.org/en-US/\">Firefox</a></li>\n  </ul> \n  </div>\n</div>\n</div>";
  });