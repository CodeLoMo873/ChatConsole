let currentRelationshipID;
document.addEventListener('DOMContentLoaded', function () {
    var userList = document.getElementById('contactList');
    for (let i = 0; i < friendName.length; i++) {  // Sử dụng let thay cho var

        var contactDiv = document.createElement('div');
        contactDiv.className = 'contact';
        contactDiv.dataset.index = i;  // Lưu chỉ số i trong data-index

        var avatarDiv = document.createElement('div');
        avatarDiv.className = 'contact-image';
        avatarDiv.style.float = 'left';
        avatarDiv.style.backgroundImage = "url('/image/" + friendAvatar[i] + "')";
        contactDiv.appendChild(avatarDiv);

        var infoDiv = document.createElement('div');
        infoDiv.className = 'contact-info';

        var nameDiv = document.createElement('div');
        nameDiv.className = 'contact-name';
        nameDiv.textContent = friendName[i];
        infoDiv.appendChild(nameDiv);

        var messageDiv = document.createElement('div');
        messageDiv.className = 'contact-message';
        messageDiv.textContent = lastMessage[i];
        infoDiv.appendChild(messageDiv);

        contactDiv.appendChild(infoDiv);
        userList.appendChild(contactDiv);

        // Đảm bảo rằng giá trị relationshipID[i] được lưu trữ đúng trong mỗi sự kiện click
        contactDiv.addEventListener('click', function () {
            var contactIndex = this.dataset.index;
            currentRelationshipID = relationshipID[contactIndex];
            $.ajax({
                type: "GET",
                url: '/chat/RelationShip', // Thêm contactIndex vào URL
                data: { relationshipid: relationshipID[contactIndex] },  // Sử dụng contactIndex thay cho i
                success: function (data) {debugger
                    //$result.val(newValue);
                    showChat(contactIndex, data);// Giả sử $result và newValue đã được định nghĩa
                }

            });
        });
    }
});


function showChat(index, data) {
    var chatHeaderName = document.getElementById('chat-header-name');
    var chatHeaderImage = document.getElementById('chat-header-image');
    chatHeaderName.textContent = friendName[index];
    chatHeaderImage.style.backgroundImage = "url('/image/" + friendAvatar[index] + "')";
    var chatMessages = document.getElementById('chatMessages');
    chatMessages.innerHTML = '';
    function addMessage(isReceived, contentText, imageUrl) {
        var message = document.createElement('div');
        message.classList.add('message');
        if (isReceived) {
            message.classList.add('received');
            var messageImage = document.createElement('div');
            messageImage.classList.add('message-image');
            messageImage.style.backgroundImage = "url('" + imageUrl + "')";
            message.appendChild(messageImage);
        } else {
            message.classList.add('sent');
        }
        var content = document.createElement('div');
        content.classList.add('content');
        content.textContent = contentText;
        message.appendChild(content);
        chatMessages.appendChild(message);
    }

    for (var i = 0; i < data.message.count; i++) {
        if (data.message.authorID[i] == userID) {
            addMessage(false, data.message.content[i], "");
        }
        else {
            addMessage(true, data.message.content[i], "/image/" + friendAvatar[index]);
        }
    }
    chatMessages.scrollTop = chatMessages.scrollHeight;


    var TypingMessage = document.getElementById('TypingMessage');
    TypingMessage.addEventListener('click', function () {
        sendMessage(); 
    });
}

function sendMessage() {
    var TypingMessage = document.getElementById('TypingMessage');
    if (TypingMessage.value != '') {
        function addMessage(contentText) {
            var message = document.createElement('div');
            message.classList.add('message');

            message.classList.add('sent');
            var content = document.createElement('div');
            content.classList.add('content');
            content.textContent = contentText;
            message.appendChild(content);
            chatMessages.appendChild(message);
        }
        addMessage(TypingMessage.value);
        $.ajax({
            type: "POST",
            url: '/chat/Addmessage', 
            data: {
                content_message: TypingMessage.value,
                relationship_id: currentRelationshipID,
                userid: userID
            },   
            success: function (response) {
                console.log("Message sent successfully:", response);
            },
            error: function (xhr, status, error) {
                console.error("Error sending message:", error);
            }
        });
        TypingMessage.value = ''; 
        chatMessages.scrollTop = chatMessages.scrollHeight;

    }
    else {
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }
}



