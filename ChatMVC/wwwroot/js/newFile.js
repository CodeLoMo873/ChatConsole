document.addEventListener('DOMContentLoaded', function() {
    var userList = document.getElementById('contactList');
    for (var i = 1; i <= 10; i++) {

        var contactDiv = document.createElement('div');
        contactDiv.className = 'contact';

        var avatarDiv = document.createElement('div');
        avatarDiv.className = 'contact-image';
        avatarDiv.style.float = 'left'; // Tương đương với thuộc tính CSS float
        avatarDiv.style.backgroundImage = "url('/image/user6.jpg')"; // Thiết lập hình ảnh nền
        contactDiv.appendChild(avatarDiv);

        var infoDiv = document.createElement('div');
        infoDiv.className = 'contact-info';

        var nameDiv = document.createElement('div');
        nameDiv.className = 'contact-name';
        nameDiv.textContent = 'User ' + i;
        infoDiv.appendChild(nameDiv);

        var messageDiv = document.createElement('div');
        messageDiv.className = 'contact-message';
        messageDiv.textContent = 'Hello';
        infoDiv.appendChild(messageDiv);

        contactDiv.appendChild(infoDiv);
        userList.appendChild(contactDiv);
    }
});
