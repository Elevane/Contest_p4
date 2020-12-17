// Gestion des routes
$('[routeid]').click(function () {
  const id = $(this).attr('routeID');
  $('section').hide();
  $('section[id^="' + id + '"]').show();
})
