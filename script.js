const timer = document.querySelector('.header__timer-extra')

function lvl(i){
    i++
    timer.innerHTML = i
    if (i < 100) {
    setTimeout(function() {
        lvl(i)
    }, i+i);
     }   
}
lvl(0)

function summAmount() {
    return this.amount * this.price
}

function summKcall() {
    return this.amount * this.kcall
}


const products = {
    plainBurger: {
        name: 'Гамбургер простой',
        price: 10000,
        amount: 0,
        kcall: 400,
    },
    freshBurger: {
        name: 'Гамбургер FRESH',
        price: 20500,
        amount: 0,
        kcall: 550,
    },
    freshCombo:{
        name: 'FRESH COMBO',
        price: 31900,
        amount: 0,
        kcall: 700,
    },
}   

const extraProducts = {
    doubleMayonnaise:{
        name: 'Двойной майонез',
        price: 200,
        kcall: 50,

    },
    lettuce:{
        name: 'Салатный лист',
        price: 300,
        kcall: 20,

    },
    cheese:{
        name: 'Сыр',
        price: 500,
        kcall: 100,

    },
}

for(const key in products){
    products[key]['Summ'] = summAmount
    products[key]['Kcall'] = summKcall

}

const mainProduct = document.querySelectorAll('.main__product')

mainProduct.forEach(function(card, key){
    const cardBtn = card.querySelectorAll('.main__product-btn')
    const mainCheckbox = card.querySelectorAll('.main__product-checkbox')
    const cardId = card.getAttribute('id');

    const cardAmound = card.querySelector('.main__product-num')
    const cardPrice = card.querySelector('.main__product-price span')
    const cardKcall = card.querySelector('.main__product-kcall span')
     

    cardBtn.forEach(function(btn, key){
    btn.addEventListener('click',function() {
    const symbol = btn.getAttribute('data-symbol')
    if (symbol == '+' && products[cardId].amount < 30) {
        products[cardId].amount++
    }else if(symbol == '-' && products[cardId].amount > 0){
        products[cardId].amount--

    }
    cardAmound.innerHTML = products[cardId].amount
    cardPrice.innerHTML = products[cardId].Summ()
    cardKcall.innerHTML = products[cardId].Kcall()


   })
})
mainCheckbox.forEach(function(check, key){
    check.addEventListener('click', function(){
            const dataExtra = check.getAttribute('data-extra')
            products[cardId][dataExtra] = check.checked
            if(products[cardId][dataExtra] == true){
                products[cardId].price +=extraProducts[dataExtra].price
                products[cardId].kcall +=extraProducts[dataExtra].kcall
            }else{
                products[cardId].price -=extraProducts[dataExtra].price
                products[cardId].kcall -=extraProducts[dataExtra].kcall

            }
            cardPrice.innerHTML = products[cardId].Summ()
            cardKcall.innerHTML = products[cardId].Kcall()
    })
})
})


const addCart = document.querySelector('.addCart')

const receipt = document.querySelector('.receipt')
const receiptWindow = document.querySelector('.receipt__window')
const receiptOut = document.querySelector('.receipt__window-out')
const receiptBtn = document.querySelector('.receipt__window-btn')

addCart.addEventListener('click', function(){
    let productsArr = []
    let totalName = ''
    let totalPrice = 0
    let totalKcall = 0

    for(const key in products){
        const pObj = products[key]
        if(pObj.amount > 0){
            productsArr.push(pObj)
            pObj['totalName']  = `${pObj.name} : ${pObj.amount}\n`
            for(const info in pObj){
                if(pObj[info] === true){
                    pObj['totalName'] += `${extraProducts[info].name}\n`
                }
            }
            pObj['totalName'] +=`\n Цена за шт. ${pObj.price} Всего : ${pObj.Summ()}\n`
        }
    }
   for(const key in productsArr){
       totalName += `\n${productsArr[key].totalName}______________\n`
       totalPrice += productsArr[key].Summ()
   }
   receiptOut.innerHTML = `Ваш заказ : ${totalName} Общая сумма ${totalPrice}`

    receipt.style.display = 'flex'
    setTimeout(() => {
        receipt.style.opacity = `1`
    }, 100);
    setTimeout(() => {
        receiptWindow.style.top = `10%`
    }, 300);
    setTimeout(() => {
        receiptWindow.style.opacity = `1`
    }, 500);


})
receiptBtn.addEventListener('click', function(){
    receiptWindow.style.top = '-100%'
    setTimeout(() => {
        receipt.style.opacity = '0'
    }, 300);
    setTimeout(() => {
        receipt.style.display = 'none'
        receipt.removeAttribute('style')
        receiptWindow.removeAttribute('style')
    }, 600);
})


// const mainProductImg = img.querySelectorAll('.main__product-img')



const mainInfo = document.querySelectorAll('.main__product-info')
const view = document.querySelector('.view')
const viewClose = document.querySelector('.view__close')
const viewSrc = document.querySelector('.views')
const viewSrcImg = viewSrc.getAttribute('src')



mainInfo.forEach(function(img, key){
    const mainProductImg = img.querySelector('.main__product-img')
    const imgImg = mainProductImg.getAttribute('src')
    
    img.addEventListener('dblclick', function(){
        view.classList.add("active")
        if(viewSrc != imgImg ){
                       
            viewSrc.setAttribute('src', imgImg)
             
        }else{
            imgImg
        }
    })
    viewClose.addEventListener('click',function(){
        view.classList.remove("active")
    })
    
})


