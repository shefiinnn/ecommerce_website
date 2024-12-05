document.addEventListener('DOMContentLoaded', function() {
    const cartContainer = document.querySelector('.cart-container');
    const subtotalElement = document.getElementById('subtotal');
    const totalElement = document.getElementById('total');
    const shippingCost = 20.00;
    const taxes = 15.00;
  
    // Retrieve the cart from localStorage
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
  
    // Function to render cart items
    function renderCartItems() {
      cartContainer.innerHTML = ''; // Clear the container first
  
      let subtotal = 0;
  
      // Loop through each cart item and display it
      cart.forEach((item, index) => {
        const itemTotal = item.price * item.quantity;
        subtotal += itemTotal;
  
        // Create the cart item HTML dynamically
        cartContainer.innerHTML += `
          <div class="cart-item" data-index="${index}">
            <div class="item-details">
              <p>${item.name} (Size: ${item.size})</p>
            </div>
            <div class="item-price">
              <p class="price">$${item.price.toFixed(2)}</p>
              <div class="quantity">
                <button class="btn-decrease">-</button>
                <span class="item-count">${item.quantity}</span>
                <button class="btn-increase">+</button>
              </div>
              <button class="btn-remove">Remove</button>
            </div>
          </div>
        `;
      });
  
      // Calculate and display subtotal, taxes, and total
      const total = subtotal + shippingCost + taxes;
      subtotalElement.textContent = `$${subtotal.toFixed(2)}`;
      totalElement.textContent = `$${total.toFixed(2)}`;
    }
  
    // Function to update cart item quantity and remove items
    function updateCart() {
      // Event delegation to handle click events on dynamically created buttons
      cartContainer.addEventListener('click', (e) => {
        const itemElement = e.target.closest('.cart-item');
        const itemIndex = itemElement.getAttribute('data-index');
        const item = cart[itemIndex];
  
        if (e.target.classList.contains('btn-decrease')) {
          if (item.quantity > 1) {
            item.quantity--;
          }
        } else if (e.target.classList.contains('btn-increase')) {
          item.quantity++;
        } else if (e.target.classList.contains('btn-remove')) {
          // Remove the item from the cart
          cart.splice(itemIndex, 1);
        }
  
        // Save the updated cart to localStorage
        localStorage.setItem('cart', JSON.stringify(cart));
  
        // Re-render the cart items
        renderCartItems();
      });
    }
  
    // Initialize the cart rendering and updates
    renderCartItems();
    updateCart();
  });
  