'use strict';
$(function () {
    $('#chat_user').slimscroll({
        height: '590px',
        size: '5px'
    });
});

$(function () {
    $('#chat-conversation').slimscroll({
        height: 'calc(100vh - 350px)', /*449px*/
        size: '5px',
        start: 'bottom'
    });
});