// const menuArray = require('./data');
import { menuArray } from "./data.js";

const menuItems = document.querySelector("#order-list");
const ordersPlacedContainer = document.querySelector("#orders-made-container");
const ordersMade = document.querySelector("#orders-made");
const orderBtn = document.querySelector("#order-btn")
const paymentForm = document.querySelector('#payment-form')
const payBtn = document.querySelector("#pay-btn")
// let foodOrders = ``;
let selectedProducts = [];
let allOrders = menuArray

orderBtn.addEventListener('click', function(){
  paymentForm.style.display = 'flex'
})

paymentForm.addEventListener('submit', function(e){
  e.preventDefault()
  

    const paymentFormData = new FormData(paymentForm);
    const firstName = paymentFormData.get("fullName");
   

  let thankYouMessage = `<div class="order-conclusion-message" id="order-conclusion-message">
        <p class="message-text">Thanks for coming ${firstName}. Your order is on the way!</p>
      </div>`;
  
     
      ordersPlacedContainer.style.display = "block";
      paymentForm.style.display = 'none'
      ordersPlacedContainer.innerHTML = thankYouMessage
       const orderMessage = document.querySelector(
              "#order-conclusion-message"
            );
            orderMessage.style.display = "block";
})


document.addEventListener("click", function (e) {
  if (e.target.dataset.choiceBtn) {
    getOrders(e.target.dataset.choiceBtn);
  } else if(e.target.dataset.deleteBtn){
      handleDeleteBtn(e.target.dataset.deleteBtn)
  }
});


// function getOrders(menuid) {
//   //let foodOrders = ``;
//   let totalPrice = 0
//   const menuObject = menuArray.filter(function (menu) {
//     return menu.id == menuid;
//   })[0];

//   selectedProducts.push(/* `m` is a variable that is being used to store the value of the `menuArray`
//   array. */
//   menuObject);

//   selectedProducts.forEach(function (cost) {
//    totalPrice += cost.price;
//  });
//  console.log(selectedProducts[0].price);

//   if (selectedProducts.length === 1) {
//     foodOrders += `<h1 class="order-title">Your Order</h1>
//         <div id="orders-container">

//         </div>
//         <div class="order-total-price">
//           <p>Total price</p>
//           <p class="total-price">$${totalPrice}</p>

//         </div>
//          <div class="complete-order-btn">
//               <button class="order-btn" id="order-btn">Complete Order</button>
//         </div>`;
//   }
//   ordersPlaced.innerHTML = foodOrders;
//   ordersPlaced.style.display = "block";

//   const orders_container = document.getElementById("orders-container");
//   let order_items = ``;
//   // menuObject.quantity++

//   selectedProducts.forEach((product) => {
//     order_items += `<div class="orders-made">
//           <p> <span class="order">${product.name}</span> </p>
//           <p id="delete-btn"> <span class="delete-btn">remove</span> </p>
//           <p class="order-price">$${product.price}</p>
//         </div>
//         `;
//   });

//   orders_container.innerHTML = order_items;

//   /*

//   foodOrders += `
//   <div class="complete-order-btn">
//               <button class="order-btn" id="order-btn">Complete Order</button>
//         </div>`;

//   ordersPlaced.style.display = "block";
//   ordersPlaced.innerHTML = foodOrders;
//   return menuObject;*/
// }

function getOrders(menuID) {

  const menuObject = allOrders.filter(function (menu) {
    return menu.id == menuID;
  })[0];

  renderOrders(menuObject)
  return menuObject;
}

function handleDeleteBtn(deleteID) {
     allOrders = allOrders.filter(function(menu){
      return menu.id !== deleteID
    })
    
  
}

function getMenuItems() {
  let menuItemsList = ``;

  allOrders.forEach(function (menu) {
    menuItemsList += `
    <div class="emoji">${menu.emoji}</div>
        <div class="order-content" id="${menu.id}">
          <h1 class="order-name">${menu.name}</h1>
          <p><span>${menu.ingredients}</span> </p>
          <p>${menu.price}</p>
        </div>
        <div class="icon-btn" id="icon-btn" data-choice-btn="${menu.id}">
          +
        </div>
      
     `;
  });
  return menuItemsList;
}

function renderOrders(ID) {

    let orderItems = ``;
    let totalPriceElement = document.getElementsByClassName("total-price")[0];
    let sum = 0;
   selectedProducts.push(ID);

   selectedProducts.forEach(function (order) {
     sum += order.price;
     orderItems += `
            <div style="display:flex; gap: 25px; border-bottom: 1px solid black">
             <p> <span class="order">${order.name}</span> </p>
            <p id="delete-btn"> <span class="delete-btn" data-delete-btn="${order.id}"> remove</span> </p>
            <p class="order-price">${order.price}</p>
            </div>

           
            
      
    `;
   });

   ordersMade.style.display = "flex";
   ordersMade.innerHTML = orderItems;
   totalPriceElement.innerHTML = "$" + sum;
   ordersPlacedContainer.style.display = "block";
    
}

// function getOrderItems(){
//   let orderItems = ``

//   orders.forEach(function(order){

//          orderItems += `
//            <h1 class="order-title">Your Order</h1>
//         <div class="orders-made">
//           <p> <span class="order">${order.name}</span> </p>
//           <p id="delete-btn"> <span class="delete-btn">remove</span> </p>
//           <p class="order-price">$${order.price}</p>
//         </div>
//         <div class="order-total-price">
//           <p>Total price</p>
//           <p class="total-price">$26</p>

//         </div>
//         <div class="complete-order-btn">
//               <button class="order-btn" id="order-btn">Complete Order</button>
//         </div>
//     `;

//   })
//   return orderItems
// }

function render() {
  menuItems.innerHTML = getMenuItems();

 }
render();
