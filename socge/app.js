// VARIABLES

var idClient = $('#id_client')[0];
var label = idClient.nextElementSibling
var digicode = $('#digicode')[0];
var password = $('#password')[0];

var delBtn = $('#delBtn')[0]
var btn = $('#validate')

var cases = new Array();

    for (let i = 0; i < digicode.children.length; i++) {
        const element = digicode.children[i]

        for (let index = 0; index < element.children.length; index++) {
            const key = element.children[index];
            cases.push(key)
        }
    };

// FUNCTIONS

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
  }


function fillDigicode(array) {
    var i = 1

    while (i < 10) {
        let rand = getRandomInt(array.length)
        console.log(array[rand].innerHTML)
        if (array[rand].innerHTML == '') {
            array[rand].innerHTML = i
            i++;
        } else {
            continue;
        }
    }
}

//

$(document).ready(function() {
    fillDigicode(cases)

    $(btn).click(function() {

        if(idClient.value.length == 8 && !isNaN(idClient.value)) {
            delBtn.innerHTML = 'check'
            $(digicode).removeClass('none')
        } else {
            alert('Your ID is not exact')
        }

    })

    for (let i = 0; i < cases.length; i++) {
        const element = cases[i];
        
        $(element).click(function() {

            if (password.dataset.pwd.length < 7) {
                password.dataset.pwd += element.innerHTML
                let index = password.dataset.pwd.length - 1
                $('.pwdElement')[index].dataset.pwd = element.innerHTML
                $('.pwdElement')[index].children[0].innerHTML = 'lens'

                if (password.dataset.pwd.length == 6) alert('You are successfully connected')
            }


        })
    }

    $(delBtn).click(function() {
        idClient.value = idClient.value.slice(0, -1)
        $(btn).addClass('disabled')
    })

    $('#delPwdBtn').click(function() {
        password.dataset.pwd = password.dataset.pwd.slice(0, -1)
        let index = password.dataset.pwd.length
        $('.pwdElement')[index].dataset.pwd = ""
        $('.pwdElement')[index].children[0].innerHTML = 'remove'
    })
})