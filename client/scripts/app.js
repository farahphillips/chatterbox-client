var app = {},
    messages;

app.init = function() {
  this.server = 'https://api.parse.com/1/classes/chatterbox';
  this.fetch();
};

app.send = function(message) {
  $.ajax({
    // This is the url you should use to communicate with the parse API server.
    url: 'https://api.parse.com/1/classes/chatterbox',
    type: 'POST',
    data: JSON.stringify(message),
    contentType: 'application/json',
    success: function (data) {
      console.log('chatterbox: Message sent');
    },
    error: function (data) {
      // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
      console.error('chatterbox: Failed to send message');
    }
  });
}

app.fetch = function() {
  obj = $.ajax({
    url: 'https://api.parse.com/1/classes/chatterbox',
    type: 'GET',
    contentType: 'application/json',
    success: function (data) {
      console.log('chatterbox: Messages received');
      messages = obj.responseJSON.results;
      app.displayMessages();
    },
    error: function (data) {
      // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
      console.error('chatterbox: Failed to receive messages');
    }
  })

}

app.displayMessages = function(roomname) {
  this.clearMessages();

  if (roomname) {
    for (var i = 0; i < messages.length; i++) {
      if (messages[i].roomname === "roomname") {
        app.addMessage(messages[i]);
      }
    }
  } else {
    for (var i = 0; i < messages.length; i++) {
      if(messages[i].username) {
        app.addMessage(messages[i]);
      }
    }
  }
}

app.clearMessages = function() {
  $("#chats").html("");
  console.log("cleared messages");
}

app.addMessage = function(message) {
  var div = $("<div></div>")
  div.addClass("message");
  var username = $("<h4></h4>").text(message.username);
  var msg = $("<h5></h5>").text(message.text);
  div.append(username).append(msg);
  $("#chats").append(div);
}

app.submitMessage = function() {
  var formId = document.getElementById("userInput").value;
  var formMsg = document.getElementById("msgInput").value;
  var formRoom = $("#roomSelect")[0].value;

  var message = {
    username: formId,
    text: formMsg,
    roomname: formRoom
  };

  $.ajax({
    url: 'https://api.parse.com/1/classes/chatterbox',
    type: 'POST',
    data: JSON.stringify(message),
    contentType: 'application/json',
    success: function (data) {
      console.log('chatterbox: Message sent');
      app.fetch();
    },
    error: function (data) {
      console.error('chatterbox: Failed to send message');
    }
  });

}

app.addRoom = function(roomname) {
  var newRoom = $("<option></option>");
  newRoom.attr("value", roomname);
  newRoom.text(roomname);
  $("#roomSelect").append(newRoom);
}

$(document).ready(function() {

  $(".getMessages").click(function() {
    console.log("getting messages");
    app.fetch();
  });

  $(".wipeMessages").click(function() {
    app.clearMessages();
  });

  $("#submitBtn").click(function(e) {
    e.preventDefault();

    app.submitMessage();
  })

  app.init();

});
