// VARIABLES 

var usersList = $('#usersList')[0]
var editWallet = []
var searchName = $('#searchName')[0]
var resetBtn = $('#resetBtn')[0]
var creditBtn = $('#credit')[0]
var debitBtn = $('#debit')[0]

var modalEditWallet = $('#modalEditWallet')[0]
var amount = $('#amount')[0]

var tabUsers

var API = "http://localhost:8080/lunchtime/";

// FUNCTIONS
function init() {
    $(searchName).keyup(event => filtreUsers(event))
    $(resetBtn).click(event => resetUsersFilter())
    $(creditBtn).click(event => creditUser())
    $(debitBtn).click(event => debitUser())
}


function getUsers() {
    usersList.children[1].innerHTML = ""
    fetch(API + "user/findall")
        .then(res => res.json())
        .then(users => {
            tabUsers = users;
            users.forEach(user => {
                updateUserRow(user)
            })
            
        })
}

function getUserWallet(id) {
    fetch(API + "user/find/" + id)
        .then(res => res.json())
        .then(user => {
            modalEditWallet.children[0].innerHTML = user.wallet + "€<span id='close'>X</span>"
            $('#close').click(event => {
                display($(modalEditWallet))
                display($('#grey_bg'))
            })
        })
} 

function display(element) {
    $(element).toggleClass('hide')
}

function filtreUsers(e) {
    if (searchName.value.length < 3) {
        return
    } else {
        usersList.children[1].innerHTML = ""

        tabUsers.forEach(user => {
            let name = user.name.toLowerCase()
            if (name.includes(searchName.value.toLowerCase())){
                updateUserRow(user)
            }
        });
    }
}

function resetUsersFilter() {
    usersList.children[1].innerHTML = ""

    tabUsers.forEach(user => {
        updateUserRow(user)
    });
}

function openModalEditWallet(e) {
    let id = e.target.dataset.id
    getUserWallet(id)

    display($(modalEditWallet))
    display($('#grey_bg'))

    modalEditWallet.dataset.id = id
}

function creditUser() {
    let id = modalEditWallet.dataset.id

    if (amount.value != "" && !isNaN(amount.value)) {
        fetch(API + 'user/credit/'+ id +"?amount="+ amount.value, { method: "POST" })
            .then(res => console.log(res.status))
            .then(function() {
                amount.value = ""
                display($(modalEditWallet))
                display($('#grey_bg'))
                getUsers()
            })
    } else {
        alert("Amount isn't correct")
    }
}

function debitUser() {
    let id = modalEditWallet.dataset.id

    if (amount.value != "" && !isNaN(amount.value)) {
        fetch(API + 'user/debit/' + id +"?amount="+ amount.value, { method: "POST" })
            .then(function() {
                amount.value = ""
                display($(modalEditWallet))
                display($('#grey_bg'))
                getUsers()
            })

    } else {
        alert("Amount isn't correct")
    }
    
    
}

function updateUserRow(user) {
    let row = "<tr><td>"+ user.name +"</td><td>"+ user.firstname +"</td><td>"+ user.wallet +"</td><td><button class='editWallet' data-id='"+ user.id +"'>Edit</button></td></tr>"
    usersList.children[1].innerHTML += row
    $(".editWallet").click(event => openModalEditWallet(event))
}

// APP 

getUsers()

init()

