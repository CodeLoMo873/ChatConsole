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

    // Cập nhật tiêu đề và ảnh đại diện trong phần chat header
    chatHeaderName.textContent = friendName[index];
    chatHeaderImage.style.backgroundImage = "url('/image/" + friendAvatar[index] + "')";

    // Xóa toàn bộ nội dung của phần tử có ID 'chatMessages' (nếu muốn xóa tin nhắn cũ)
    var chatMessages = document.getElementById('chatMessages');
    chatMessages.innerHTML = '';

    // Hàm để tạo và thêm tin nhắn vào phần tử chatMessages
    function addMessage(isReceived, contentText, imageUrl) {
        var message = document.createElement('div');
        message.classList.add('message');

        // Thêm class 'received' hoặc 'sent'
        if (isReceived) {
            message.classList.add('received');
            var messageImage = document.createElement('div');
            messageImage.classList.add('message-image');
            messageImage.style.backgroundImage = "url('" + imageUrl + "')";
            message.appendChild(messageImage);
        } else {
            message.classList.add('sent');
        }

        // Tạo nội dung tin nhắn
        var content = document.createElement('div');
        content.classList.add('content');
        content.textContent = contentText;
        message.appendChild(content);

        // Thêm tin nhắn vào phần tử 'chatMessages'
        chatMessages.appendChild(message);
    }
    debugger;

    for (var i = 0; i < data.message.count; i++) {
        if (data.message.authorID[i] == userID) {
            addMessage(false, data.message.content[i], "");
        }
        else {
            addMessage(true, data.message.content[i], "/image/" + friendAvatar[index]);
        }
    }
    chatMessages.scrollTop = chatMessages.scrollHeight;
}


