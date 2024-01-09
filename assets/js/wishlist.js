const wishlistproducts =document.getElementById('wishlistproducts')

function getwishlist () {
    wishlistproducts.innerHTML = ''

    let wishlist = JSON.parse(localStorage.getItem('wishlist')) || []
    wishlist.map((item,index) => {
        let product = document.createElement('div')
        product.className = 'wishBox col-12 col-sm-6 col-md-3 col-lg-3 col-xl-3'
        product.innerHTML = `
        <img src="${item.image}" alt="">
        <p>"${item.name}"</p>
        <p>"${item.price}"</p>
        <button onclick="removefromwishlist(${index})">Remove from wishlist</button>
        `
        wishlistproducts.appendChild(product)
    })
}
getwishlist();

function removefromwishlist(index){
    let wishlist = JSON.parse(localStorage.getItem('wishlist')) || []
    wishlist.splice(index,1)
    localStorage.setItem('wishlist',JSON.stringify(wishlist))
    getwishlist() 
}