var commentsRef = new Firebase('https://firetube.firebaseio.com/');

commentsRef.on('child_added', function (snapshot) {
  var comment = snapshot.val();
  var graphBase = "https://graph.facebook.com/" + comment.userid
  $.ajax({
    url: graphBase + "?fields=name",
    dataType: 'jsonp',
    success: function(userdata) {
      $('<div/>')
        .text(comment.body)
        .addClass('comment')
        .prepend($('<br/>'))
        .prepend($('<span/>').text(userdata.name))
        .prepend($('<img src="' + graphBase + '/picture">'))
        .appendTo($('#commentsDiv'));
    }
  });
});

