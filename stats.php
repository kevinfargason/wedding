<!--
You are free to copy and use this sample in accordance with the terms of the
Apache license (http://www.apache.org/licenses/LICENSE-2.0.html)
-->

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
  <head>
    <meta http-equiv="content-type" content="text/html; charset=utf-8"/>
    <title>
      Yargie wedding stats
    </title>
    <script type="text/javascript" src="https://www.google.com/jsapi"></script>
     <?php include('./page/_include/foot.php'); ?>
    <script type="text/javascript">
      google.load('visualization', '1', {packages: ['corechart']});

    </script>
    <script type="text/javascript">
      var stats = new Wedding.Admin.stats();
      stats.init();
      stats.fetch().done( stats.chartFood ).done( stats.chartRSVPtotals).done( stats.chartAttending );

    </script>
  </head>
  <body style="font-family: Arial;border: 0 none;">
  <div id="rsvp-chart" style="float: left;"></div>
  <div id="attending-chart" style="float: left;"></div>
    <div id="visualization" style="width: 600px; height: 400px; float: left;"></div>
  </body>
</html>
​