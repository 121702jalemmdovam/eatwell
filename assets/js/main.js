const awesomeproduct =document.getElementById('awesomeproduct')
const customername = document.getElementById('customername')
const customersurname = document.getElementById('customersurname')
const customeremail = document.getElementById('customeremail')
const customerpassword = document.getElementById('customerpassword')
const filter = document.getElementById('filter')
const customerform = document.getElementById('customerform')
const pro = document.getElementById('pro')
const btn= document.getElementById('pagi')




function getProducts(){
    page = 1
  limit = 3
    axios.get(`https://65680f199927836bd97406d3.mockapi.io/username/products?page=${page}&limit=${limit}`)
    .then(res => {
        products = res.data
        products.map(item => {
            let product = document.createElement('div')
            product.className = 'proBox  col-xl-4 col-lg-4 col-md-12 col-sm-12'
            product.innerHTML = `
            <button onclick="addtowishlist(${item.id})"><i class="fa-regular fa-heart fa-lg"></i></button>
            <img src="${item.image}" alt="">
            <p>"${item.name}"</p>
            <p>"${item.price}"</p>
            <button onclick="addtoBasket(${item.id})">Add to cart</button>
            `
            awesomeproduct.appendChild(product)
        })
        page++
    })


}
btn.addEventListener('click', getProducts)

getProducts();

function addtowishlist(id){
    let wishlist = JSON.parse(localStorage.getItem('wishlist')) || []
    wishlist.push(products.find(item => item.id == id))
    localStorage.setItem('wishlist',JSON.stringify(wishlist))
}

function addtoBasket(id){
    let cart = JSON.parse(localStorage.getItem('cart')) || []
    cart.push(products.find(item => item.id == id))
    localStorage.setItem('cart',JSON.stringify(cart))
}


function sortedFunctions(){
    awesomeproduct.innerHTML = ''
   let selectvalue = filter.value 

   if(selectvalue==="1"){
    page = 1
    limit = 3
      axios.get(`https://65680f199927836bd97406d3.mockapi.io/username/products?page=${page}&limit=${limit}`)
      .then(res => {
          products = res.data
          products.map(item => {
              let product = document.createElement('div')
              product.className = 'proBox  col-xl-4 col-lg-4 col-md-12 col-sm-12'
              product.innerHTML = `
              <img src="${item.image}" alt="">
              <p>"${item.name}"</p>
              <p>"${item.price}"</p>
              <button onclick="addtoBasket(${item.id})">Add to cart</button>
              `
              awesomeproduct.appendChild(product)
          })
          page++
      })
   }
}

filter.addEventListener('change',sortedFunctions)

function sortedFunction(){
    awesomeproduct.innerHTML = ''
   let selectvalue = filter.value 

   if(selectvalue==="2"){
    page = 1
    limit = 3
      axios.get(`https://65680f199927836bd97406d3.mockapi.io/username/products?page=${page}&limit=${limit}`)
      .then(res => {
          products = res.data
          let sortProduct = products.sort((a,b) => a.name.localeCompare(b.name))
          sortProduct.map(item => {
              let product = document.createElement('div')
              product.className = 'proBox  col-xl-4 col-lg-4 col-md-12 col-sm-12'
              product.innerHTML = `
              <img src="${item.image}" alt="">
              <p>"${item.name}"</p>
              <p>"${item.price}"</p>
              <button onclick="addtoBasket(${item.id})">Add to cart</button>
              `
              awesomeproduct.appendChild(product)
          })
          page++
      })
   }
}

filter.addEventListener('change',sortedFunction)


function sortFunction(){
    awesomeproduct.innerHTML = ''
   let selectvalue = filter.value 

   if(selectvalue==="3"){
    page = 1
    limit = 3
      axios.get(`https://65680f199927836bd97406d3.mockapi.io/username/products?page=${page}&limit=${limit}`)
      .then(res => {
          products = res.data
          let sortProduct = products.sort((a,b) => b.name.localeCompare(a.name))
          sortProduct.map(item => {
              let product = document.createElement('div')
              product.className = 'proBox col-xl-4 col-lg-4 col-md-12 col-sm-12'
              product.innerHTML = `
              <img src="${item.image}" alt="">
              <p>"${item.name}"</p>
              <p>"${item.price}"</p>
              <button onclick="addtoBasket(${item.id})">Add to cart</button>
              `
              awesomeproduct.appendChild(product)
          })
          page++
      })
   }
}

filter.addEventListener('change',sortFunction)

let form = document.getElementById('form');
form.addEventListener('submit', formPost);

let namee = document.getElementById("name")
let surname = document.getElementById("surname")
function formPost(e) {
    e.preventDefault()
    let data = {
        name: namee.value,
        surname: surname.value
    }
    axios.post("https://65680f199927836bd97406d3.mockapi.io/username/basket", data)
    .then(() => displaySeen())
    namee.value = ""
    surname.value = ""
}

let displayProduct = document.getElementById('display');

async function displaySeen() {
    displayProduct.innerHTML = ""
    let res = await axios.get("https://65680f199927836bd97406d3.mockapi.io/username/basket");
    let data = res.data;
    data.forEach((item) => {
        let div = document.createElement("div");
        div.className = "box"
        div.innerHTML = `
        <p><span>Name</span> : ${item.name} </p>
        <p><span>Surname</span>: ${item.surname}</p>
        <button onclick="deletePost(${item.id})">Delete</button>
        `
        displayProduct.appendChild(div)
    })
}
displaySeen();
function deletePost(id) {
    axios.delete(`https://65680f199927836bd97406d3.mockapi.io/username/basket/${id}`)
    .then(() => displaySeen())
}