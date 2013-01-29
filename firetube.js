var commentsRef = new Firebase('https://firetube.firebaseio.com/comments');
var myUserID = null;

//Create an Firebase Simple Login client so we can do Facebook auth
var authClient = new FirebaseAuthClient(commentsRef, function(error, user) {
  if(user) {
    myUserID = user.id;
    $("#loginDiv").text(user.first_name + " " + user.last_name);
  }
});

//Create a query for only the last 10 comments
var last10Comments = commentsRef.limit(10);

//Render Comments
last10Comments.on('child_added', function (snapshot) {
  var comment = snapshot.val();
  var newDiv = $("<div/>").addClass("comment").attr("id",snapshot.name()).appendTo("#comments");
  FB.api("/" + comment.userid, function(userdata) {
    comment.name = userdata.name;
    newDiv.html(Mustache.to_html($('#template').html(), comment));
  });
});

//Add New Comments
function onCommentKeyDown(event) {
  if(event.keyCode == 13) {
    if(myUserID == null) {
      alert("You must log in to leave a comment");
    } else {
      commentsRef.push({userid: myUserID, body: $("#text").val()})
      $("#text").val("");
    }
    event.preventDefault();
  }
}

//Remove deleted comments
last10Comments.on("child_removed", function(snapshot) {
  $("#" + snapshot.name()).remove();
});

//Handle Login
function onLoginButtonClicked() {
  authClient.login("facebook");
}
