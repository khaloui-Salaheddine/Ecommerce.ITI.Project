document.addEventListener("DOMContentLoaded", () => {
  const slider = document.querySelector(".slider");
  const slides = document.querySelectorAll(".slide");
  let currentSlide = 0;

  function showSlide(index) {
    slides.forEach((slide, i) => {
      slide.style.transform = `translateX(${100 * (i - index)}%)`;
    });
  }

  function nextSlide() {
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
  }

  setInterval(nextSlide, 3000);

  const cartBtn = document.getElementById("cart_btn");
  const cart = document.getElementById("cart");
  const closeCart = document.getElementById("close-cart");
  const cartItems = document.getElementById("cart-items");
  const cartTotal = document.getElementById("cart-total");
  let cartContent = [];

  cartBtn.addEventListener("click", () => {
    cart.style.display = "block";
  });

  closeCart.addEventListener("click", () => {
    cart.style.display = "none";
  });

  document.querySelectorAll(".add-to-cart").forEach((button) => {
    button.addEventListener("click", () => {
      const productInfo = button.closest("li");
      const productName = productInfo
        .querySelector("p")
        .innerText.split(" - ")[0];
      const productPrice = parseFloat(
        productInfo
          .querySelector("p")
          .innerText.split(" - ")[1]
          .replace("LE ", "")
      );

      const product = {
        name: productName,
        price: productPrice,
      };

      cartContent.push(product);
      updateCart();
      showMessage("Item added to cart!");
    });
  });

  function updateCart() {
    cartItems.innerHTML = "";
    let total = 0;

    cartContent.forEach((product, index) => {
      const item = document.createElement("div");
      item.classList.add("cart-item");
      item.innerHTML = `
        <p>${product.name} - LE ${product.price.toFixed(2)}</p>
        <button class="remove-from-cart" data-index="${index}">Remove</button>
      `;
      cartItems.appendChild(item);
      total += product.price;
    });

    cartTotal.innerText = `Total: LE ${total.toFixed(2)}`;

    const checkoutBtn = document.getElementById("checkout-btn");

    checkoutBtn.addEventListener("click", () => {
      if (cartContent.length !== 0) {
        cartContent = [];
        updateCart();
        showMessage("Purchase successful!");
      }
    });

    function showMessage(message) {
      const messageDiv = document.createElement("div");
      messageDiv.classList.add("cart-message");
      messageDiv.innerText = message;

      document.body.appendChild(messageDiv);
      setTimeout(() => {
        messageDiv.remove();
      }, 3000);
    }

    document.querySelectorAll(".remove-from-cart").forEach((button) => {
      button.addEventListener("click", (event) => {
        const index = event.target.getAttribute("data-index");
        cartContent.splice(index, 1);
        updateCart();
        showMessage("Item removed from cart!");
      });
    });
  }

  function showMessage(message) {
    const messageDiv = document.createElement("div");
    messageDiv.classList.add("cart-message");
    messageDiv.innerText = message;

    document.body.appendChild(messageDiv);
    setTimeout(() => {
      messageDiv.remove();
    }, 3000);
  }

  const scrollTopBtn = document.getElementById("scrollTopBtn");

  window.addEventListener("scroll", () => {
    if (window.scrollY > 200) {
      scrollTopBtn.style.display = "block";
    } else {
      scrollTopBtn.style.display = "none";
    }
  });

  scrollTopBtn.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });

  const form = document.getElementById("registration_form");
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const phone = document.getElementById("phone").value;

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phonePattern = /^01[0125]\d{8}$/;

    if (!emailPattern.test(email)) {
      alert("Please enter a valid email address.");
      return;
    }

    if (!phonePattern.test(phone)) {
      alert("Please enter a valid phone number.");
      return;
    }

    alert("Registration successful!");
  });
});
