//var dataCharacters = require('');

var loadDataCharacters = new Promise(function (resolve, reject) {
    var xhr = new XMLHttpRequest();

    xhr.open('GET', 'https://raw.githubusercontent.com/lacera/tensor_test/master/src/dataCharacters.json');
    xhr.send();

    xhr.addEventListener('readystatechange', function () {
        if (xhr.status === 200) {
            var obj = xhr.response;
            console.log(obj);
            console.log(typeof obj);
            resolve(xhr.response);
        } else {
            console.log(xhr.status);
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