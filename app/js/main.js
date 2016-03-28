function allowDrop(ev) {
    ev.preventDefault();
}

function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
}

function drop(ev) {
    ev.preventDefault();
    var data = ev.dataTransfer.getData("text");
    if (ev.target == friendList2 || ev.target == friendList) {
        ev.target.insertBefore(document.getElementById(data), ev.target.firstChild);
    } else if (ev.target.parentNode.parentNode == results || ev.target.parentNode.parentNode.parentNode == results || ev.target.parentNode.parentNode.parentNode.parentNode == results) {
        friendList.insertBefore(document.getElementById(data), friendList.firstChild);
    } else {
        friendList2.insertBefore(document.getElementById(data), friendList2.firstChild);
    }
    check(friendList2.children, second.value);
    check(friendList.children, first.value);
}

function toggleList(e) {
    if (e.target.matches('i')) {
        var data = e.target.parentNode.cloneNode('true');
        friendList2.insertBefore(data, friendList2.firstChild);
        friendList.removeChild(e.target.parentNode);
    }
    check(friendList2.children, second.value);
}

function toggleList2(e) {
    if (e.target.matches('i')) {
        var data = e.target.parentNode.cloneNode('true');
        friendList.insertBefore(data, friendList.firstChild);
        friendList2.removeChild(e.target.parentNode);
    }
    check(friendList.children, first.value);
}

results.onclick = toggleList;
results2.onclick = toggleList2;


first.addEventListener('keyup', function () {
    check(friendList.children, first.value);
});

second.addEventListener('keyup', function () {
    check(friendList2.children, second.value);
});

function check(array, char) {
    for (var i = 0; i < array.length; i++) {
        if (array[i].children[1].innerText.toLowerCase().indexOf(char) >= 0) {
            array[i].style.display = 'block';
        } else {
            array[i].style.display = 'none';
        }
    }
    if (char == '') {
        for (var i = 0; i < array.length; i++)
            array[i].style.display = 'block';
    }
}

save.onclick = function () {
    if (friendList2.children.length > 0) {
        var friendsArray = [];
        for (var i = 0; i < friendList2.children.length; i++)
            friendsArray.push(friendList2.children[i].getAttribute('id'));
        localStorage.setItem('friendsArray', friendsArray);
    } else {
        localStorage.clear();
    }
}
