// VARIABLES 

var usersList = $('#usersList')[0]
var editWallet = []
var searchName = $('#searchName')[0]

var tabUsers

var API = "http://localhost:8080/lunchtime/";

// FUNCTIONS
$(searchName).keyup(event => filtreUsers(event))

function getUsers() {
    fetch(API + "user/findall")
        .then(res => res.json())
        .then(users => {
            tabUsers = users;
            users.forEach(user => {
                updateUserRow(user)
            })
            
        })
}

function filtreUsers(e) {
    if (searchName.value.length < 3) {
        return
    } else if (searchName.value.length == 0) {
        usersList.children[1].innerHTML = ""

        tabUsers.forEach(user => {
            updateUserRow(user)
        });
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

function openModalEditWallet(e) {
    console.log(e.target.dataset.id)
}

function updateUserRow(user) {
    let row = "<tr><td>"+ user.name +"</td><td>"+ user.firstname +"</td><td>"+ user.wallet +"</td><td><button class='editWallet' data-id='"+ user.id +"'>Edit</button></td></tr>"
    usersList.children[1].innerHTML += row
    $(".editWallet").click(event => openModalEditWallet(event))
}

// APP 

getUsers()


