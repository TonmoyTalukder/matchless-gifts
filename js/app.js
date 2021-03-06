const loadProducts = () => {
  const url = `https://fakestoreapi.com/products`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => showProducts(data));
};
loadProducts();

// show all product in UI 
const showProducts = (products) => {
  const allProducts = products.map((pd) => pd);
  for (const product of allProducts) {
    const image = product.image;
    const div = document.createElement("div");
    div.classList.add("product");
    div.innerHTML = `<div class="single-product">
      <div>
    <img class="product-image" src=${image}></img>
      </div>
      <h6>${product.title}</h6>
      <p>Category: ${product.category}</p>
      <h5 class="text-success">Price: $ ${product.price}</h5>
      <p>Total Rating: ${product.rating.count}</p>
      <p>Rating Rate: ${product.rating.rate}</p>
      <button onclick="addToCart(${product.id},${product.price})" id="addToCart-btn" class="buy-now btn btn-warning my-2">add to cart</button>
      <button id="details-btn" class="btn btn-secondary" onclick="showDetails(${product.id})">Details</button></div>
      `;
    document.getElementById("all-products").appendChild(div);
  }
};

let count = 0;
const addToCart = (id , price) => {
  count = count + 1;
  updatePrice("price", price);

  updateTaxAndCharge();
  updateTotal();
  document.getElementById("total-Products").innerText = count;
};

const getInputValue = (id) => {
  const element = document.getElementById(id).innerText;
  const converted = parseFloat(element);
  return converted;
};

// main price update function
const updatePrice = (id, value) => {
  const convertedOldPrice = getInputValue(id);
  const convertPrice = parseFloat(value);
  const total = convertedOldPrice + convertPrice;
  document.getElementById(id).innerText = Math.abs(total).toFixed(2);
};

// set innerText function
const setInnerText = (id, value) => {
  document.getElementById(id).innerText = Math.abs(value).toFixed(2);
};

// update delivery charge and total Tax
const updateTaxAndCharge = () => {
  const priceConverted = getInputValue("price");
  if (priceConverted > 200) {
    setInnerText("delivery-charge", 30);
    setInnerText("total-tax", priceConverted * 0.2);
  }
  if (priceConverted > 400) {
    setInnerText("delivery-charge", 50);
    setInnerText("total-tax", priceConverted * 0.3);
  }
  if (priceConverted > 500) {
    setInnerText("delivery-charge", 60);
    setInnerText("total-tax", priceConverted * 0.4);
  }
};

//grandTotal update function
const updateTotal = () => {
  const grandTotal =
    getInputValue("price") + getInputValue("delivery-charge") +
    getInputValue("total-tax");
  document.getElementById("total").innerText = grandTotal.toFixed(2);
};

const showDetails=id=>{
  const url = `https://fakestoreapi.com/products/${id}`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => productsDetails(data));
}

// productsDetails 
const productsDetails=data=>{

  console.log(data);
  const image = data.image;
  const div = document.createElement("div");
  const divClear=document.getElementById("product-details");
  divClear.textContent="";
  div.classList.add("data");
  div.innerHTML = `<div class="single-product">
    <div>
  <img class="product-image" src=${image}></img>
    </div>
    <h3">${data.title}</h3>
    <p>Category: ${data.category}</p>
    <h2>Price: $ ${data.price}</h2>
    <p>Description : ${data.description} </p>
    `;
  document.getElementById("product-details").appendChild(div);

}