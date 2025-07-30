# E-commerce App Tutorial: From Scratch

This guide provides a step-by-step walkthrough to build a functional e-commerce web application using only HTML, CSS, and JavaScript. It's designed for beginners with a basic understanding of these technologies.

## Final Project Structure

```
/ecom
├── index.html
├── cart.html
├── search.html
├── script.js
└── documentation.md
```

## Step 1: Setting Up the Home Page (`index.html`)

This is the main landing page where products are displayed.

### HTML (`index.html`)

Create an `index.html` file and add the following code. This structure includes a header with navigation and a main section to display products.

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Commerce App</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/7.0.0/css/all.min.css"
        integrity="sha512-DxV+EoADOkOygM4IR9yXP8Sb2qwgidEmeqAEmDKIOfPRQZOWbXCzLC6vjbZyy0vPisbH2SyW27+ddLVCN+OMzQ=="
        crossorigin="anonymous" referrerpolicy="no-referrer" />
    <style>
        * {
            padding: 0;
            margin: 0;
            box-sizing: border-box;
            font-family: monospace;
        }

        body {
            background-color: #f9f9f9;
        }

        header {
            height: 14vh;
            width: 100vw;
            display: flex;
            justify-content: center;
            align-items: center;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
            background-color: white;
        }

        nav {
            height: 100%;
            width: 95%;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }

        nav>a>img {
            height: 90%;
            cursor: pointer;
        }

        nav .nav-links {
            width: 50%;
            height: 100%;
            display: flex;
            justify-content: space-evenly;
            align-items: center;
        }

        nav .nav-links a {
            text-decoration: none;
            color: black;
            font-weight: bolder;
        }

        nav .search-bar {
            width: 25%;
            height: 60%;
            display: flex;
            justify-content: space-evenly;
            align-items: center;
            border: 2px solid #eeeee4;
            border-radius: 5px;
        }

        nav .search-bar input {
            height: 40px;
            width: 80%;
            border: 0px;
            outline: none;
        }

        nav .nav-icons {
            height: 40px;
            width: 15%;
            display: flex;
            justify-content: space-evenly;
            align-items: center;
        }

        .nav-icon-item {
            display: flex;
            justify-content: center;
            align-items: center;
            flex-direction: column;
            cursor: pointer;
        }

        .logo {
            width: 90px;
        }

        .nav-icon-item>p {
            font-size: 9px;
            font-weight: 700;
            margin-top: 4px;
        }

        .produt-list {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
            gap: 25px;
            padding: 30px;
            max-width: 1400px;
            margin: auto;
        }

        .product-card {
            background: white;
            border-radius: 10px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
            overflow: hidden;
            transition: transform 0.3s, box-shadow 0.3s;
            display: flex;
            flex-direction: column;
        }

        .product-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 8px 16px rgba(0, 0, 0, 0.15);
        }

        .product-card>img {
            width: 100%;
            height: 250px;
            object-fit: cover;
        }

        .product-details {
            padding: 15px;
            flex-grow: 1;
            display: flex;
            flex-direction: column;
        }

        .product-name {
            font-size: 16px;
            font-weight: 800;
        }

        .product-cat {
            color: #777;
            margin: 5px 0;
        }

        .price {
            font-weight: 700;
            font-size: 18px;
            margin-top: auto;
            color: #333;
        }

        .btn-cart {
            all: unset;
            background: #007bff;
            color: white;
            padding: 10px 15px;
            border-radius: 5px;
            margin-top: 15px;
            cursor: pointer;
            font-weight: 700;
            text-align: center;
            transition: background-color 0.3s;
        }

        .btn-cart:hover {
            background: #0056b3;
        }
    </style>
</head>

<body>
    <header>
        <nav>
            <a href="/index.html">
                <img class="logo" src="https://aartisto.com/wp-content/uploads/2020/11/myntra.png" alt="">
            </a>
            <div class="nav-links">
                <a href="">MEN</a>
                <a href="">WOMEN</a>
                <a href="">KIDS</a>
                <a href="">HOME</a>
                <a href="">BEAUTY</a>
                <a href="">GENZ</a>
                <a href="">STUDIO</a>
            </div>
            <form class="search-bar" action="search.html" method="get">
                <i class="fa-solid fa-magnifying-glass"></i>
                <input type="text" name="q" placeholder="Search for products...">
            </form>
            <div class="nav-icons">
                <div class="nav-icon-item">
                    <i class="fa-solid fa-user"></i>
                    <p>Profile</p>
                </div>
                <div class="nav-icon-item">
                    <i class="fa-solid fa-heart"></i>
                    <p>Wishlist</p>
                </div>
                <a href="/cart.html">
                    <div class="nav-icon-item">
                        <i class="fa-solid fa-bag-shopping"></i>
                        <p>Bag</p>
                    </div>
                </a>
            </div>
        </nav>
    </header>

    <section>
        <div class="produt-list">
        </div>
    </section>

    <script src="./script.js"></script>
</body>

</html>
```

## Step 2: Fetching and Displaying Products (`script.js`)

This script fetches product data from a public API and dynamically creates product cards.

### JavaScript (`script.js`)

Create a `script.js` file. This code defines functions to fetch products and add them to the cart using local storage.

```javascript
function addToCart(product) {
    let allProducts = JSON.parse(localStorage.getItem("products")) || [];
    allProducts.push(product);
    localStorage.setItem("products", JSON.stringify(allProducts));
}

const fetchProducts = async () => {
    const res = await fetch('https://dummyjson.com/products');
    const data = await res.json();

    if (data) {
        data.products.forEach((product) => {
            const productList = document.querySelector(".produt-list");

            const productCard = document.createElement("div");
            productCard.setAttribute('class', 'product-card');

            const image = document.createElement('img');
            image.setAttribute('src', product.thumbnail);
            image.setAttribute('alt', 'broken image');

            const productDetails = document.createElement('div');
            productDetails.setAttribute('class', 'product-details');

            const p1 = document.createElement('p');
            p1.setAttribute('class', 'product-name');
            p1.innerText = product.title;

            const p2 = document.createElement('p');
            p2.setAttribute('class', 'product-cat');
            p2.innerText = product.category;

            const p3 = document.createElement('p');
            p3.setAttribute('class', 'price');
            p3.innerText = '₹' + product.price;

            const btnCart = document.createElement('button');
            btnCart.setAttribute('class', 'btn-cart');
            btnCart.addEventListener('click', () => {
                addToCart(product);
            });
            btnCart.innerText = 'Add to Cart';

            productDetails.appendChild(p1);
            productDetails.appendChild(p2);
            productDetails.appendChild(p3);

            productCard.appendChild(image);
            productCard.appendChild(productDetails);
            productCard.appendChild(btnCart);

            productList.appendChild(productCard);
        });
    }
};

fetchProducts();
```

## Step 3: Creating the Shopping Cart (`cart.html`)

This page displays items added to the cart and allows users to remove them.

### HTML (`cart.html`)

Create a `cart.html` file. The layout is similar to the home page but includes a modern cart UI and a price summary.

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Commerce App</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/7.0.0/css/all.min.css"
        integrity="sha512-DxV+EoADOkOygM4IR9yXP8Sb2qwgidEmeqAEmDKIOfPRQZOWbXCzLC6vjbZyy0vPisbH2SyW27+ddLVCN+OMzQ=="
        crossorigin="anonymous" referrerpolicy="no-referrer" />
    <style>
        * {
            padding: 0;
            margin: 0;
            box-sizing: border-box;
            font-family: monospace;
        }

        header {
            height: 14vh;
            width: 100vw;
            display: flex;
            justify-content: center;
            align-items: center;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }

        nav {
            height: 100%;
            width: 95%;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }

        nav>a>img {
            height: 90%;
            cursor: pointer;
        }

        nav .nav-links {
            width: 50%;
            height: 100%;
            display: flex;
            justify-content: space-evenly;
            align-items: center;
        }

        nav .nav-links a {
            text-decoration: none;
            color: black;
            font-weight: bolder;
        }

        nav .search-bar {
            width: 25%;
            height: 60%;
            display: flex;
            justify-content: space-evenly;
            align-items: center;
            border: 2px solid #eeeee4;
            border-radius: 5px;
        }

        nav .search-bar input {
            height: 40px;
            width: 80%;
            border: 0px;
            outline: none;
        }

        nav .nav-icons {
            height: 40px;
            width: 15%;
            display: flex;
            justify-content: space-evenly;
            align-items: center;
        }

        .nav-icon-item {
            display: flex;
            justify-content: center;
            align-items: center;
            flex-direction: column;
            cursor: pointer;
        }

        .logo {
            width: 90px;
        }

        .nav-icon-item>p {
            font-size: 9px;
            font-weight: 700;
            margin-top: 4px;
        }

        .cart-container {
            width: 70%;
            margin: 30px auto;
        }

        .cart-header {
            font-size: 24px;
            font-weight: 800;
            margin-bottom: 20px;
            border-bottom: 2px solid #eee;
            padding-bottom: 10px;
        }

        .product-card {
            display: flex;
            align-items: center;
            margin-bottom: 20px;
            padding: 15px;
            border: 1px solid #ddd;
            border-radius: 10px;
            box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);
        }

        .product-card>img {
            width: 120px;
            height: 120px;
            object-fit: cover;
            border-radius: 5px;
        }

        .product-details {
            flex-grow: 1;
            margin-left: 20px;
        }

        .product-name {
            font-size: 18px;
            font-weight: 800;
        }

        .product-cat {
            color: #666;
            margin: 5px 0;
        }

        .price {
            font-weight: 700;
            font-size: 16px;
        }

        .btn-delete {
            all: unset;
            background: #ff4d4d;
            color: white;
            padding: 8px 15px;
            border-radius: 5px;
            cursor: pointer;
            font-weight: 700;
            transition: background 0.3s;
        }

        .btn-delete:hover {
            background: #cc0000;
        }

        .cart-summary {
            margin-top: 30px;
            padding: 20px;
            border: 1px solid #ddd;
            border-radius: 10px;
        }

        .summary-title {
            font-size: 20px;
            font-weight: 800;
            margin-bottom: 15px;
        }

        .summary-item {
            display: flex;
            justify-content: space-between;
            margin-bottom: 10px;
        }

        .summary-total {
            font-weight: 800;
            font-size: 18px;
            margin-top: 10px;
            border-top: 2px solid #eee;
            padding-top: 10px;
        }
    </style>
</head>

<body>
    <header>
        <nav>
            <a href="/index.html">
                <img class="logo" src="https://aartisto.com/wp-content/uploads/2020/11/myntra.png" alt="">
            </a>
            <div class="nav-links">
                <a href="">MEN</a>
                <a href="">WOMEN</a>
                <a href="">KIDS</a>
                <a href="">HOME</a>
                <a href="">BEAUTY</a>
                <a href="">GENZ</a>
                <a href="">STUDIO</a>
            </div>
            <form class="search-bar" action="search.html" method="get">
                <i class="fa-solid fa-magnifying-glass"></i>
                <input type="text" name="q" placeholder="Search for products...">
            </form>
            <div class="nav-icons">
                <div class="nav-icon-item">
                    <i class="fa-solid fa-user"></i>
                    <p>Profile</p>
                </div>
                <div class="nav-icon-item">
                    <i class="fa-solid fa-heart"></i>
                    <p>Wishlist</p>
                </div>
                <a href="/cart.html">
                    <div class="nav-icon-item">
                        <i class="fa-solid fa-bag-shopping"></i>
                        <p>Bag</p>
                    </div>
                </a>
            </div>
        </nav>
    </header>

    <section class="cart-container">
        <h1 class="cart-header">My Shopping Bag</h1>
        <div class="produt-list"></div>
        <div class="cart-summary">
            <h2 class="summary-title">Price Details</h2>
            <div class="summary-item">
                <span>Total MRP</span>
                <span id="total-mrp">₹0</span>
            </div>
            <div class="summary-item">
                <span>Discount on MRP</span>
                <span id="discount-mrp" style="color: green;">-₹0</span>
            </div>
            <div class="summary-item summary-total">
                <span>Total Amount</span>
                <span id="total-amount">₹0</span>
            </div>
        </div>
    </section>

    <script>
        function deleteFromCart(id) {
            let allProducts = JSON.parse(localStorage.getItem("products")) || [];
            let productWithoutThatId = allProducts.filter((product) => product.id !== id);
            localStorage.setItem("products", JSON.stringify(productWithoutThatId));
            window.location.reload();
        }

        const fetchProducts = () => {
            let allProducts = JSON.parse(localStorage.getItem("products")) || [];
            const productList = document.querySelector(".produt-list");
            let totalMRP = 0;

            if (allProducts.length > 0) {
                allProducts.forEach((product) => {
                    totalMRP += product.price;

                    const productCard = document.createElement("div");
                    productCard.setAttribute('class', 'product-card');

                    const image = document.createElement('img');
                    image.setAttribute('src', product.thumbnail);
                    image.setAttribute('alt', 'broken image');

                    const productDetails = document.createElement('div');
                    productDetails.setAttribute('class', 'product-details');

                    const p1 = document.createElement('p');
                    p1.setAttribute('class', 'product-name');
                    p1.innerText = product.title;

                    const p2 = document.createElement('p');
                    p2.setAttribute('class', 'product-cat');
                    p2.innerText = product.category;

                    const p3 = document.createElement('p');
                    p3.setAttribute('class', 'price');
                    p3.innerText = '₹' + product.price;

                    const btnDelete = document.createElement('button');
                    btnDelete.setAttribute('class', 'btn-delete');
                    btnDelete.addEventListener('click', () => {
                        deleteFromCart(product.id);
                    });
                    btnDelete.innerText = 'Remove';

                    productDetails.appendChild(p1);
                    productDetails.appendChild(p2);
                    productDetails.appendChild(p3);

                    productCard.appendChild(image);
                    productCard.appendChild(productDetails);
                    productCard.appendChild(btnDelete);

                    productList.appendChild(productCard);
                });
            } else {
                productList.innerHTML = "<p>Your cart is empty.</p>";
            }

            // Update summary
            const discount = 0; // Assuming a fixed discount for now
            document.getElementById('total-mrp').innerText = '₹' + totalMRP.toFixed(2);
            document.getElementById('discount-mrp').innerText = '-₹' + discount.toFixed(2);
            document.getElementById('total-amount').innerText = '₹' + (totalMRP - discount).toFixed(2);
        }

        fetchProducts();
    </script>

</body>

</html>
```

## Step 4: Implementing Search Functionality (`search.html`)

This page displays search results based on a user's query.

### HTML (`search.html`)

Create a `search.html` file. The JavaScript fetches the search query from the URL, filters products, and displays the results.

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Commerce App - Search</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/7.0.0/css/all.min.css"
        integrity="sha512-DxV+EoADOkOygM4IR9yXP8Sb2qwgidEmeqAEmDKIOfPRQZOWbXCzLC6vjbZyy0vPisbH2SyW27+ddLVCN+OMzQ=="
        crossorigin="anonymous" referrerpolicy="no-referrer" />
    <style>
        * {
            padding: 0;
            margin: 0;
            box-sizing: border-box;
            font-family: monospace;
        }

        header {
            height: 14vh;
            width: 100vw;
            display: flex;
            justify-content: center;
            align-items: center;
            box-shadow: -5px -5px 12px 0px;
        }

        nav {
            height: 100%;
            width: 95%;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }


        nav>a>img {
            height: 90%;
            cursor: pointer;
        }

        nav .nav-links {
            width: 50%;
            height: 100%;
            display: flex;
            justify-content: space-evenly;
            align-items: center;
        }

        nav .nav-links a {
            text-decoration: none;
            color: black;
            font-weight: bolder;

        }

        nav .search-bar {
            width: 25%;
            height: 60%;
            display: flex;
            justify-content: space-evenly;
            align-items: center;
            border: 2px solid #eeeee4;
        }

        nav .search-bar input {
            height: 40px;
            width: 80%;
            border: 0px;
        }

        nav .nav-icons {
            height: 40px;
            width: 15%;
            display: flex;
            justify-content: space-evenly;
            align-items: center;
        }

        .nav-icon-item {
            display: flex;
            justify-content: center;
            align-items: center;
            flex-direction: column;
            cursor: pointer;
        }

        .logo {
            width: 90px;
        }

        .nav-icon-item>p {
            font-size: 9px;
            font-weight: 700;
            margin-top: 4px;
        }

        .product-card {}

        .product-card>img {
            width: 200px;
            height: 200px;

        }

        .product-name {
            font-size: 14px;
            font-weight: 800;
            margin-left: 10px;
            margin-top: 15px;
        }

        .product-cat {
            margin-left: 10px;
            margin-top: 5px;
            margin-bottom: 5px;
        }

        .price {
            margin-left: 10px;
        }

        .produt-list {
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            justify-items: center;
            gap: 15px;
            margin: 30px 0px;
        }

        .btn-cart {
            all: unset;
            background: #99b2ff;
            padding: 6px 10px;
            border-radius: 5px;
            margin-top: 5px;
            margin-left: 10px;
            cursor: pointer;
            font-weight: 700;
        }
    </style>
</head>

<body>
    <header>
        <nav>
            <a href="/index.html">
                <img class="logo" src="https://aartisto.com/wp-content/uploads/2020/11/myntra.png" alt="">
            </a>

            <div class="nav-links">
                <a href="">MEN</a>
                <a href="">WOMEN</a>
                <a href="">KIDS</a>
                <a href="">HOME</a>
                <a href="">BEAUTY</a>
                <a href="">GENZ</a>
                <a href="">STUDIO</a>
            </div>

            <form class="search-bar" action="search.html" method="get">
                <i class="fa-solid fa-magnifying-glass"></i>
                <input type="text" name="q" placeholder="Search for products...">
            </form>

            <div class="nav-icons">
                <div class="nav-icon-item">
                    <i class="fa-solid fa-user"></i>
                    <p>Profile</p>
                </div>
                <div class="nav-icon-item">
                    <i class="fa-solid fa-heart"></i>
                    <p>Wishlist</p>
                </div>
                <a href="/cart.html">
                    <div class="nav-icon-item">
                        <i class="fa-solid fa-bag-shopping"></i>
                        <p>Bag</p>
                    </div>
                </a>
            </div>
        </nav>
    </header>

    <section>
        <div class="produt-list">
        </div>
    </section>

    <script>
        function addToCart(product) {
            let allProducts = JSON.parse(localStorage.getItem("products")) || [];
            allProducts.push(product);
            localStorage.setItem("products", JSON.stringify(allProducts));
        }

        const fetchProducts = async () => {
            const urlParams = new URLSearchParams(window.location.search);
            const searchQuery = urlParams.get('q').toLowerCase();
            const res = await fetch('https://dummyjson.com/products');
            const data = await res.json();

            if (data) {
                const filteredProducts = data.products.filter(product =>
                    product.title.toLowerCase().includes(searchQuery) ||
                    product.category.toLowerCase().includes(searchQuery)
                );

                const productList = document.querySelector(".produt-list");
                filteredProducts.forEach((product) => {
                    let productCart = document.createElement("div");
                    productCart.setAttribute('class', 'product-card');

                    let image = document.createElement('img');
                    image.setAttribute('src', product.thumbnail);
                    image.setAttribute('alt', 'broken image');

                    let p1 = document.createElement('p');
                    p1.setAttribute('class', 'product-name');
                    p1.innerText = product.title;

                    let p2 = document.createElement('p');
                    p2.setAttribute('class', 'product-cat');
                    p2.innerText = product.category;

                    let p3 = document.createElement('p');
                    p3.setAttribute('class', 'price');
                    p3.innerText = '₹' + product.price;

                    let btnCart = document.createElement('button');
                    btnCart.setAttribute('class', 'btn-cart');
                    btnCart.addEventListener('click', () => {
                        addToCart(product);
                    });
                    btnCart.innerText = 'Add to Cart';

                    productCart.appendChild(image);
                    productCart.appendChild(p1);
                    productCart.appendChild(p2);
                    productCart.appendChild(p3);
                    productCart.appendChild(btnCart);

                    productList.appendChild(productCart);
                });
            }
        };

        fetchProducts();
    </script>
</body>

</html>
```

Congratulations! You have successfully built a complete e-commerce application. You can now open `index.html` in your browser to see it in action.