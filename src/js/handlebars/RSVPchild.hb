<div class="children-info">
  <p>Children are more than welcomed to attend our wedding; however, due to venue limitations a separate children’s reception staffed by Black-Tie Babysitting will be provided on site at Arlington Hall for all children 12 and under{{#ifCond charge true}}<span class="child-rate"> at a rate of $20 per child</span>{{/ifCond}}.</p>


    </div>

{{#each family}}

{{#ifCond status "child"}}
<div class="friend child">
  <div class="border">
    <section class="incomplete">
      <h3 class="guest">{{first}} {{last}}:</h3>
      <form role="form" class="RSVP-child" id="RSVP-response-{{first}}" name="RSVP-response-{{first}}" data-validate="true">
        <input type="hidden" name="RSVPcode" value="{{../../code}}">
        <input type="hidden" name="id" value="{{id}}">
        <div class="form-group">
          <div class="radio RSVP-response">
            <label>
              <input type="radio" name="RSVPevent" id="RSVP-accept-{{first}}" class="RSVP-accept" value="ceremony+reception" class="" >
              Will be in attendance.
            </label>
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
        <p><span class="guest">{{first}} {{last}}</span> will be in attendance.</p>
      </div>
      <div class="declined">
        <p><span class="guest">{{first}} {{last}}</span> declines to attend.</p>
      </div>
    </section>
  </div>
  <div class="card-shadow"></div>
</div>
{{/ifCond}}
{{/each}}