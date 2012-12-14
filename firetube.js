var commentsRef = new Firebase('https://firetube.firebaseio-staging.com/');

commentsRef.on('child_added', function (snapshot) {
  var comment = snapshot.val();
  $.ajax({
    url: "https://graph.facebook.com/" + comment.userid + "?fields=name",
    dataType: 'jsonp',
    success: function(userdata) {
      comment.name = userdata.name;
      var template = $('#template').html();
      $("#comments").append($(Mustache.to_html(template, comment)));
    }
  });
});

function doLogin() {
  var authClient = new FirebaseAuthClient(commentsRef);

  authClient.login("facebook", function(err, token, userInfo) {
    $("#loginDiv").html("Logged in as " + userInfo);
  });
}