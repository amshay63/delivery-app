// JavaScript code - 
// April 8, 2022 
// Inspired by 
// Scott Kellum April 8, 2022 
// https://codepen.io/scottkellum/pen/WWeXab 

let toggle = true;
const button = document.querySelector(".nav button");
const down = new Audio("./assets/down.mp3");
const up = new Audio("./assets/up.mp3");


var offsetStart = 0;
var offsetEnd = 0;

// button.addEventListener("mousedown", () => {
//   if (toggle)down.play();
// });


// button.addEventListener("mouseup", () => {
//   if (toggle) up.play();
//   });


  window.addEventListener('scroll', () => {
    document.documentElement.style.setProperty('--scroll', ( window.pageYOffset - offsetStart ) / (document.body.offsetHeight - offsetStart - offsetEnd - window.innerHeight ));
  }, false );
  

  let cart = [];
  let orders = [];
  let total = 0.00;
  
  function addItem(name, price) {
    cart.push({name: name, price: price});
    total += price;
    
    updateCart();
    updateReceipts();
  }

  function deleteItem(name) {
    for(let i = 0; i < cart.length; i++) {
      console.log(cart[i].name)
      console.log(name)

      if (cart[i].name == name) {
        
      }
    }
  }


  function updateReceipts() {
    var select = document.getElementById("receipt-dates");
    
    for(var i = 0; i < orders.length; i++) {
      var option = orders[i];
      var element = document.createElement("option");
      element.textContent = option.date;
      element.value = option.orderTotal;
      select.appendChild(element);
    }

  }
  
  function updateCart() {
    let cartItems = document.getElementById('cart-items');
    cartItems.innerHTML = '';
    
    cart.forEach(item => {
      let li = document.createElement('li');
      li.innerText = `${item.name} - $${item.price}`;
      let deleteButton = document.createElement('button');
      deleteButton.innerText = 'x';
      li.appendChild(deleteButton);
      cartItems.appendChild(li);
    });
    
    let totalDisplay = document.getElementById('total');
    totalDisplay.innerText = total.toFixed(2);
  }

  function findReceipt() {
    
    let selection = document.getElementById("receipt-dates");
    
    let output = document.getElementById("output");
    
    for (var i = 0; i < orders.length; i++) {
      console.log(orders[i].date)
      console.log(selection.textContent.replace(/\s/g, ''))

      if (orders[i].date.replace(/\s/g, '') == selection.textContent.replace(/\s/g, '')) {
        output.textContent = "Order Total: " + orders[i].orderTotal;
      }
    }
  }
  
  function checkout() {
    alert(`Thank you for your purchase! Your total is $${total.toFixed(2)}.`);
    let timestamp = new Date(Date.now()).toLocaleString();
    orders.push({ date: timestamp, orderTotal: total});
    console.log(orders)
    cart = [];
    total = 0.00;
    updateCart();
    updateReceipts();
  }