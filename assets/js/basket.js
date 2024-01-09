const awesomeproducts =document.getElementById('awesomeproducts')

function getbaskets () {
    awesomeproducts.innerHTML = ''

    let cart = JSON.parse(localStorage.getItem('cart')) || []
    cart.map((item,index) => {
        let product = document.createElement('div')
        product.className = 'remBox col-xl-4 col-lg-4 col-md-12 col-sm-12 '
        product.innerHTML = `
        <img src="${item.image}" >
        <p>"${item.name}"</p>
        <p>"${item.price}"</p>
        <button onclick="removefromBasket(${index})">Remove from cart</button>
        `
        awesomeproducts.appendChild(product)
    })
}
getbaskets();
function removefromBasket(index){
    let cart = JSON.parse(localStorage.getItem('cart')) || []
    cart.splice(index,1)
    localStorage.setItem('cart',JSON.stringify(cart))
    getbaskets() 
}