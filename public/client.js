var socket = io('http://localhost:3000');

function renderMessage(message, type){
    let mainDiv = $("<div/>").addClass(`${type} message`).html(`
        <h4>${message.author}</h4>
        <p>${message.message}</p>
    `);

    $('.message__area').append(mainDiv);
}

socket.on('previousMessages', (messages)=>{
    for(message of messages ){
        renderMessage(message, 'incoming');
        scrollToBottom();
    }
})

socket.on('receivedMessage', (message)=>{
    renderMessage(message, 'incoming')
    scrollToBottom()
})

$('#chat').submit((event) => {
    event.preventDefault()

    var author = $('input[name=username]').val();
    var message = $('input[name=message]').val();
    
    if (author.length && message.length) {
        var messageObject = {
            author: author,
            message: message,
        }

        renderMessage(messageObject, 'outgoing');
        scrollToBottom();

        $('input[name=username]').attr('disabled','disabled');
        $('input[name=message]').val('');

        socket.emit('sendMessage', messageObject)
        
    }
})

function scrollToBottom() {
    $('.message__area').animate({scrollTop: $('.message__area')[0].scrollHeight}, 500);
}