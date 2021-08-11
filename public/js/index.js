const $messages = $('.messages-content');
let d, h, m;
const i = 0;

let myName = "";
let image = null;

const chat_app = new Vue({
    el: '#chat_app',
    data() {
        return {
            hello: 'Hello Vue!',
            messages: [],
        }
    },
    methods: {
        loadMessages: function () {

        },
    },
});
$(window).load(function () {
    if (localStorage.getItem('myName')) {
        myName = localStorage.getItem('myName');
    } else {
        myName = prompt("Enter your name");
        localStorage.setItem("myName", myName);
    }
    $('.messages-content').val = '';

    $messages.mCustomScrollbar();
    updateScrollbar();
    console.log(this);

    db.collection("messages")
        .orderBy('created_at')
        .onSnapshot((querySnapshot) => {
            chat_app.messages = [];
            querySnapshot.forEach((doc) => {
                chat_app.messages.push(doc);
            });
            updateScrollbar();
            setDate();
        });
});

function uploadAttachment() {
    this.image = document.getElementById('attachment').files;
}

function updateScrollbar() {
    const messageBody = document.querySelector('.messages');
    messageBody.scrollTop = messageBody.scrollHeight - messageBody.clientHeight;
}

function setDate() {
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

$('.message-submit').click(function () {
    insertMessage();
});

$(window).on('keydown', function (e) {
    if (e.which == 13) {
        insertMessage();
        return false;
    }
});
