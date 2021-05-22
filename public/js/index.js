var $messages = $('.messages-content'),
    d, h, m,
    i = 0;

var myName = "";

$(window).load(function() {
  if(localStorage.getItem('myName')){
    myName = localStorage.getItem('myName');
  }else{
    myName = prompt("Enter your name");
    localStorage.setItem("myName", myName);
  }
  
  $messages.mCustomScrollbar();

  db.collection("messages").onSnapshot((querySnapshot) => {
    querySnapshot.forEach((doc) => {
        if (doc.data().sender == myName) {
          $('<div class="message message-personal"><b class="user-name">'+doc.data().sender+'</b><figure class="avatar"><img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQpdX6tPX96Zk00S47LcCYAdoFK8INeCElPeJrVDrh8phAGqUZP_g" /></figure><div id="message-' + doc.id + '">' + doc.data().message + ' <button class="btn-delete" data-id="' + doc.id + '" onclick="deleteMessage(this);">🗑</button></div></div>').appendTo($('.mCSB_container')).addClass('new');
          $('.message-input').val(null);
        } else {
          $('<div class="message new"><b class="user-name">'+doc.data().sender+'</b><figure class="avatar"><img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQpdX6tPX96Zk00S47LcCYAdoFK8INeCElPeJrVDrh8phAGqUZP_g" /></figure><div id="message-' + doc.id + '">' + doc.data().message + '</div></div>').appendTo($('.mCSB_container')).addClass('new');
        }
    });
    
    setDate();
    updateScrollbar();
  });

});

function updateScrollbar() {
  $messages.mCustomScrollbar("update").mCustomScrollbar('scrollTo', 'bottom', {
    scrollInertia: 10,
    timeout: 0
  });
}

function setDate(){
  d = new Date()
  if (m != d.getMinutes()) {
    m = d.getMinutes();
    $('<div class="timestamp">' + d.getHours() + ':' + m + '</div>').appendTo($('.message:last'));
  }
}

function insertMessage() {
  msg = $('.message-input').val();
  if ($.trim(msg) == '') {
    return false;
  }

  sendMessage();
}

$('.message-submit').click(function() {
  insertMessage();
});

$(window).on('keydown', function(e) {
  if (e.which == 13) {
    insertMessage();
    return false;
  }
});