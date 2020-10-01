/** VARIABLES **/

var noFlock = $('#settingArea .flock')[0]
var individual = $('#settingArea .flock')[1]

var flockFields = $('#flockFields')[0]
var inputFlockNumber = flockFields.children[0]
var inputFlockName = flockFields.children[1]

var flockSettings = $('#flockSettings')[0]
var flockNumber = flockSettings.children[1]
var flockName = flockSettings.children[0]

var badges = []
var badgesSelector = $('#badgesSelector input')

var mainImg = $('#photoArea img')[0]
var img = $('#thumbs img')

var quantity = $('#quantity')[0]
var totalPrice = $('#price')[0]
var initialPrice = $('#price')[0].innerHTML
var unitPrice = $('#price')[0].innerHTML

/** FUNCTIONS **/

function init() {
    $(individual).click(event => selectIndividual());
    $(noFlock).click(event => selectNoFlock());

    for (let i = 0; i < badgesSelector.length; i++) {
        const badge = badgesSelector[i];
        $(badge).click(event => selectBadges(event))
    }

    for (let i = 0; i < img.length; i++) {
        const element = img[i];
        $(element).click(event => changeMainImg(event))
    }

    $(quantity).change(event => changeQuantity())

    $(inputFlockName).keyup(event => changeFlockName(event))
    $(inputFlockNumber).keyup(event => changeFlockNumber(event))
}

function display(element, display) {
    if (display) {
        $(element).removeClass('hide')
    } else {
        $(element).addClass('hide')
    }
    
}

function addPrice() {
    var price = +totalPrice.innerHTML + ($(quantity).val() * 10)
    return price
}

function priceLess() {
    var price = +totalPrice.innerHTML - ($(quantity).val() * 10)
    return price
}

function selectIndividual() {
    $(individual).addClass('selected')
    $(noFlock).removeClass('selected')

    display($(flockFields), true)
    display($(flockSettings), true)

    mainImg.src = img[2].src

    if (addPrice() > +initialPrice + 10 + (badges.length * 10)) {
        return
    } else {
        totalPrice.innerHTML = addPrice()
        unitPrice = addPrice()/$(quantity).val()
    }
    
}

function selectNoFlock(e) {
    $(noFlock).addClass('selected')
    $(individual).removeClass('selected')

    inputFlockName.value = ''
    inputFlockNumber.value = ''
    flockName.innerHTML = ''
    flockNumber.innerHTML = ''

    display($(flockFields), false)

    if (priceLess() < $(quantity).val()*(+initialPrice)) {
        return
    } else {
        totalPrice.innerHTML = priceLess()
        unitPrice = priceLess()/$(quantity).val()
    }
}

function selectBadges(e) {
    if(badges.indexOf(e.target.value) == -1 || badges == []) {
        badges.push(e.target.value)
        totalPrice.innerHTML = addPrice()
        unitPrice = addPrice()/$(quantity).val()
    } else {
        badges.splice(badges.indexOf(e.target.value), 1)
        totalPrice.innerHTML = priceLess()
        unitPrice = priceLess()/$(quantity).val()
    }
}

function changeQuantity() {
    selectNoFlock()
    totalPrice.innerHTML = initialPrice * $(quantity).val() + (10 * badges.length * $(quantity).val())
}

function changeMainImg(e) {
    mainImg.src = e.target.src
}

function changeFlockName(e) {
    $(flockName).text(e.target.value.toUpperCase())
}

function changeFlockNumber(e) {
    $(flockNumber).text(e.target.value)
}



/** APP **/

init()