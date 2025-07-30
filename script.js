// fetch the product data from API

function addToCart(product) {
    let allProducts = JSON.parse(localStorage.getItem("products")) || [];
    allProducts.push(product);
    localStorage.setItem("products", JSON.stringify(allProducts));
}

// localStorage.clear()

const fetchProducts = async () => {
    const res = await fetch('https://dummyjson.com/products')
    const data = await res.json()
    if (data) {
        data.products.forEach((product) => {
            let productList = document.querySelector(".produt-list")

            // create product cart
            let productCart = document.createElement("div")
            productCart.setAttribute('class', 'product-card')

            // created image
            let image = document.createElement('img')
            image.setAttribute('src', product.thumbnail)
            image.setAttribute('alt', 'brocken image')

            // para tags
            let p1 = document.createElement('p')
            p1.setAttribute('class', 'product-name')
            p1.innerText = product.title

            let p2 = document.createElement('p')
            p2.setAttribute('class', 'product-cat')
            p2.innerText = product.category

            let p3 = document.createElement('p')
            p3.setAttribute('class', 'price')
            p3.innerText = '₹' + product.price

            // create button
            let btnCart = document.createElement('button')
            btnCart.setAttribute('class', 'btn-cart')
            // btnCart.setAttribute('onclick', 'addToCart()')
            btnCart.addEventListener('click', () => {
                console.log(product)
                addToCart(product)
            })
            btnCart.innerText = 'Add to Cart'

            // append all the element we create in productCart
            productCart.appendChild(image)
            productCart.appendChild(p1)
            productCart.appendChild(p2)
            productCart.appendChild(p3)
            productCart.appendChild(btnCart)

            // append productCart to productList
            productList.appendChild(productCart)

        })

    }
}

fetchProducts()


let allProducts = JSON.parse(localStorage.getItem("products")) || [];
console.log("Current cart contents:", allProducts);

