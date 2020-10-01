// VARIABLES

var idClient = $('#id_client')[0];
var label = idClient.nextElementSibling
var digicode = $('#digicode')[0];
var password = $('#password')[0];
var infoBtn = $('.info')[0];

var delBtn = $('#delBtn')[0]
var btn = $('#validate')

var keys = new Array();

    for (let i = 0; i < digicode.children.length; i++) {
        const element = digicode.children[i]

        for (let index = 0; index < element.children.length; index++) {
            const key = element.children[index];
            keys.push(key)
        }
    };

// FUNCTIONS

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
  }


function fillDigicode(array) {
    var i = 0

    while (i < 10) {
        let rand = getRandomInt(array.length)
        if (array[rand].innerHTML == '') {
            array[rand].innerHTML = i
            i++;
        } else {
            continue;
        }
    }
}

function display(element) {
    element.toggleClass('hide')
}

function checkConditions(element) {
    console.log('yes')
    element.removeClass('active')
        
        if (isNaN(element.val())) {
            element.addClass('error')
        } else {
            element.removeClass('error')
        }

        if(element.val().length == 8 && !isNaN(element.val())) {
            element.addClass('success')
            delBtn.innerHTML = 'check'
            $(delBtn).addClass('success')
            $(btn).removeClass('disabled')
        } else {
            element.removeClass('success')
            delBtn.innerHTML = 'close'
            $(delBtn).removeClass('success')
            $(btn).addClass('disabled')
        }
}

function createDigicode() {

    if(idClient.value.length == 8 && !isNaN(idClient.value)) {
        fillDigicode(keys)
        display($(digicode))
    } else {
        alert('Your ID is not exact')
    }

}

function clickKey(key) {

    if (password.dataset.pwd.length < 7) {
        password.dataset.pwd += key.innerHTML
        let index = password.dataset.pwd.length - 1
        $('.pwdElement')[index].dataset.pwd = key.innerHTML
        $('.pwdElement')[index].children[0].innerHTML = 'lens'

        if (password.dataset.pwd.length == 6) alert('You are successfully connected')
    }
}

//******  *******//

    $(idClient).keyup(event => checkConditions($(idClient)))

    $(btn).click(event => createDigicode())

    for (let i = 0; i < keys.length; i++) {
        const key = keys[i];
        
        $(key).click(event => clickKey(key))
    }

    $(delBtn).click(function() {
        idClient.value = idClient.value.slice(0, -1)
        $(btn).addClass('disabled')
    })

    $(infoBtn).click(event => display($('#info-box')))
    $('#understand').click(event => display($('#info-box')))

    $('#delPwdBtn').click(function() {
        password.dataset.pwd = password.dataset.pwd.slice(0, -1)
        let index = password.dataset.pwd.length
        $('.pwdElement')[index].dataset.pwd = ""
        $('.pwdElement')[index].children[0].innerHTML = 'remove'
    })
