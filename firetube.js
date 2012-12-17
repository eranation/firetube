var commentsRef = new Firebase('https://firetube.firebaseio.com/comments');
var myUserID = null;

//Render Comments
commentsRef.on('child_added', function (snapshot) {
  var comment = snapshot.val();
  var newDiv = $("<div/>").addClass("comment").attr("id",snapshot.name()).appendTo("#comments");
  FB.api("/" + comment.userid, function(userdata) {
    comment.name = userdata.name;
    newDiv.html(Mustache.to_html($('#template').html(), comment));
  });
});

//Add New Comments
function onCommentKeyDown(event) {
  if(event.keyCode == 13 && myUserID != null) {
    commentsRef.push({userid: myUserID, body: $("#text").val()})
    $("#text").val("");
  }
}

//Remove deleted comments
commentsRef.on("child_removed", function(snapshot) {
  $("#" + snapshot.name()).remove();
});

//Handle Login
function onLoginButtonClicked() {
  var authClient = new FirebaseAuthClient(commentsRef);
  authClient.login("facebook", function(err, token, userInfo) {
    myUserID = userInfo.id;
    $("#loginDiv").text(userInfo.first_name + " " + userInfo.last_name);
  });
}
