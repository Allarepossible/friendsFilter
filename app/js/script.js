new Promise(function (resolve) {
    if (document.readyState === 'complete') {
        resolve();
    } else {
        window.onload = resolve;
    }
})
    .then(function () {
        return new Promise(function (resolve, reject) {
            VK.init({
                apiId: 5373245
            });

            VK.Auth.login(function (response) {
                if (response.session) {
                    resolve(response);
                } else {
                    reject(new Error('Не удалось авторизоваться'));
                }
            }, 2);
        });
    })
    .then(function () {
        return new Promise(function (resolve, reject) {
            VK.api('friends.get', {fields: 'first_name,last_name,photo,user_id'}, function (response) {
                if (response.error) {
                    reject(new Error(response.error.error_msg));
                } else {
                    var source = friendItemTemplate.innerHTML,
                        templateFn = Handlebars.compile(source),
                        template = templateFn({list: response.response});
                    results.innerHTML = template;

                    if (localStorage.friendsArray != undefined) {
                        var array = localStorage.friendsArray.split(',');
                        for (var i = 0; i < array.length; i++) {
                            for (var j = 0; j < friendList.children.length; j++) {
                                if (friendList.children[j].getAttribute('id') == array[i]) {
                                    var data = friendList.children[j].cloneNode('true');
                                    friendList2.appendChild(data);
                                    friendList.removeChild(friendList.children[j]);
                                }
                            }
                        }
                    }
                    resolve();
                }
            });
        });
    }).catch(function (e) {
    alert('Ошибка: ' + e.message);
});

