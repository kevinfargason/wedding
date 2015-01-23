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