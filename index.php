<!doctype html>
<html class="no-js">
<head>

  <meta charset="UTF-8">

  <?php include('./page/_include/head.php'); ?>
  <!-- <link rel="prefetch" href="http://davidwalsh.name/wp-content/themes/walshbook3/images/sprite.png" /> -->
</head>

<body data-spy="scroll" data-target="#primary-nav-container">

 <?php include('./page/content/overlays.php'); ?>

  <?php include('./page/_include/top-nav.php'); ?>

  <section id="page-a-love-story" class="page-love-story primary clearfix">
    <?php include('./page/content/a-love-story.php'); ?>
  </section>

  <section id="page-wedding" class="page-wedding primary clearfix">
    <?php include('./page/content/the-wedding.php'); ?>
  </section>

  <section id="page-reception" class="page-reception primary clearfix">
    <?php include('./page/content/the-reception.php'); ?>
  </section>

  <section id="page-traveling" class="page-traveling primary clearfix">
    <?php include('./page/content/traveling.php'); ?>
  </section>

  <!-- <section id="page-RSVP" class="page-RSVP primary clearfix">
    <?php // include('./page/content/RSVP.php'); ?>
  </section> -->

  <section id="page-registry" class="page-registry primary clearfix">
    <?php include('./page/content/registry.php'); ?>
  </section>

  <section id="page-social" class="page-social primary clearfix">
    <?php include('./page/content/social.php'); ?>
  </section>

  <?php include('./page/_include/foot.php'); ?>

  <script>
  (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
  })(window,document,'script','//www.google-analytics.com/analytics.js','ga');

  ga('create', 'UA-9571226-1', 'auto');
  ga('require', 'displayfeatures');
  ga('send', 'pageview');

</script>

</body>
</html>