//var dataCharacters = require('');

var loadDataCharacters = new Promise(function (resolve, reject) {
    var xhr = new XMLHttpRequest();

    xhr.open('GET', './dataCharacters.json');
    xhr.send();

    xhr.addEventListener('readystatechange', function () {
        if (xhr.response.status === 200) {
            resolve(xhr.response);
        } else {
            reject(new Error('Ошибка получения данных по персонажам'));
        }
    });


});

loadDataCharacters
    .catch(function (e) {
        console.log(e);
    })
    .then(function (result) {
        console.log(result);
    });