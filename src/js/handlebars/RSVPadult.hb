{{#each family}}

{{#ifCond status "adult"}}
<div class="friend adult">
  <div class="border">
    <section class="incomplete">
      <h3 class="guest">{{title}} {{first}} {{last}}:</h3>
      <form role="form" class="RSVP-adult" id="RSVP-response-{{first}}" name="RSVP-response-{{first}}" data-validate="true">
        <input type="hidden" name="RSVPcode" value="{{../../code}}">
        <input type="hidden" name="id" value="{{id}}">
        <div class="form-group">
          <div class="radio RSVP-response">
            <label>
              <input type="radio" name="RSVP" id="RSVP-accept-{{first}}" class="RSVP-accept" value="yes" class="" >
              Accepts with great pleasure.
            </label>
          </div>
          <div class="form-group event-selections">
              <div class="radio">
              <label>
                <input type="radio" name="RSVPevent" id="RSVP-{{first}}-ceremony" value="ceremony" class="input-ceremony-option" >
                Ceremony Only
              </label>
            </div>
            <div class="radio">
              <label>
                <input type="radio" name="RSVPevent" id="RSVP-{{first}}-reception" value="ceremony+reception" class="input-ceremony-reception-option" >
                Ceremony + Reception
              </label>
            </div>
          </div>
          <div class="form-group food-selections">
            <h4>Please indicate your preference of entreé:</h4>

            <div class="radio">
              <label>
                <input type="radio" name="RSVPfood" id="RSVP-{{first}}-food-beef" value="beef" class="input-food-option" >
                Beef Entreé
              </label>
            </div>
            <div class="radio">
              <label>
                <input type="radio" name="RSVPfood" id="RSVP-{{first}}-food-fish" value="fish" class="input-food-option" >
                Fish Entreé
              </label>
            </div>
            <div class="radio">
              <label>
                <input type="radio" name="RSVPfood" id="RSVP-{{first}}-food-veggie" value="vegetarian" class="input-food-option" >
                Vegetarian Entreé
              </label>
            </div>
          </div>
          <div class="radio RSVP-response">
            <label>
              <input type="radio" name="RSVPevent" id="RSVP-{{first}}-decline" class="RSVP-decline" value="no" class="" >
              Declines with deep and lingering regrets.
            </label>
          </div>
        </div>
      </form>
    </section>
    <section class="complete">
      <div class="RSVP-modify">
      <a> <span>modify</span> <span class="glyphicon glyphicon-pencil"></span> </a>
      </div>
      <h3><span class="glyphicon glyphicon-ok"></span><span class="short"> Thank You</span><span class="long"> Your response has been recorded.</span></h3>
      <div class="accepted">
        <p><span class="guest">{{title}} {{first}} {{last}}</span> <br class="short">accepts with great pleasure.</p>
        <p class="selected-reception">A <span class="selected-food"></span> entreé is preferred.</p>
      </div>
      <div class="declined">
        <p><span class="guest">{{title}} {{first}} {{last}}</span> <br class="short">declines to attend.</p>
      </div>
    </section>
  </div>
  <div class="card-shadow"></div>
</div>

{{/ifCond}}
{{/each}}
