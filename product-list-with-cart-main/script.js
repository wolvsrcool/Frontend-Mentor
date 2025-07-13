"use strict";

const gridContEl = document.querySelector(`.grid-cont`);
let gridEls;

const cartContEl = document.querySelector(`.cart-cont`);
const cartAmmTextEl = cartContEl.querySelector(`.cart-amount`);
const cartOrdersEl = cartContEl.querySelector(`.orders`);
const orderTotalTextEl = cartContEl.querySelector(`.order-total span`);
const confirmOrderEl = cartContEl.querySelector(`.btn-confirm`);

const modalWrapperEl = document.querySelector(`.modal-wrapper`);
const modalEl = document.querySelector(`.final-order-modal`);
const finalOrdersEl = modalWrapperEl.querySelector(`.final-orders-cont`);
const modalTotalEl = document.querySelector(`.final-order-total span`);
const newOrderBtnEl = document.querySelector(`.btn-modal`);

const menuItems = [];

let order = [];

fetch("./data.json")
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    menuItems.push(...data);
    menuItems.forEach((item, id) => {
      const html = `
          <div class="menu-item" data-id=${id}>
          <div class="btn-cont">
            <div class="img-cont">
              <img src="${item.image.desktop}" class="main-img" alt="Image of ${
        item.name
      }" />
              <button class="btn btn-add"><img src="assets/images/icon-add-to-cart.svg" alt="">Add to Cart</button>
                <div class="btns-cont hidden">
                  <button class="dec"><img
                      src="assets/images/icon-decrement-quantity.svg"
                      alt=""/></button>
                  <p class="quantity">1</p>
                  <button class="inc"><img
                      src="assets/images/icon-increment-quantity.svg"
                      alt=""/></button>
                  </div>
      </div>
            </div>
            <div class="desc-cont">
              <p class="dessert-category">${item.category}</p>
              <p class="dessert-name">${item.name}</p>
              <p class="dessert-price">$${item.price.toFixed(2)}</p>
            </div>
          </div>`;
      gridContEl.insertAdjacentHTML(`beforeend`, html);
    });
    gridEls = document.querySelectorAll(`.menu-item`);
  });

function addElToOrder(id) {
  if (order.find((el) => el.id === id)) {
    order.find((el) => el.id === id).ammount++;
  } else {
    order.push({ id: id, ammount: 1 });
    addToCart(id);
  }
  updateOrder();
}

function removeElFromOrder(id) {
  const el = order.find((el) => el.id === id);
  el && el.ammount--;
  if (el.ammount <= 0) {
    gridContEl
      .querySelector(`.menu-item[data-id="${id}"] .btns-cont`)
      ?.classList.add(`hidden`);
    gridContEl
      .querySelector(`.menu-item[data-id="${id}"] .img-cont`)
      ?.classList.remove(`selected`);
    removeFromCart(el.id);
  }
  updateOrder();
}

function updateOrder() {
  order = order.filter((el) => el.ammount > 0);
  const totalItems = order.reduce((acc, el) => acc + el.ammount, 0);
  cartAmmTextEl.textContent = totalItems;
  if (totalItems > 0) {
    cartContEl.querySelector(`.empty-cart`).classList.add(`hidden`);
    cartContEl.querySelector(`.cart-content`).classList.remove(`hidden`);
  } else {
    cartContEl.querySelector(`.empty-cart`).classList.remove(`hidden`);
    cartContEl.querySelector(`.cart-content`).classList.add(`hidden`);
    cartOrdersEl.innerHTML = ``;
  }

  order.forEach((o) => {
    const el = cartOrdersEl.querySelector(`.order[data-id="${o.id}"]`);
    const price = menuItems[o.id].price;
    el.querySelector(`.ammount span`).textContent = o.ammount;
    el.querySelector(`.total span`).textContent = (o.ammount * price).toFixed(
      2
    );
  });

  const orderTotal = [...cartContEl.querySelectorAll(`.total`)].reduce(
    (acc, el) => acc + Number.parseFloat(el.firstElementChild.textContent),
    0
  );
  orderTotalTextEl.textContent = `$${orderTotal.toFixed(2)}`;
}

function addToCart(id) {
  const item = menuItems[id];
  const ammount = order.find((el) => el.id === id).ammount;
  const html = `
  <div class="order" data-id=${id}>
    <h3 class="order-name">${item.name}</h3>
    <div class="order-details">
      <p class="ammount"><span>${ammount}</span>x</p>
      <p class="price">@<span>${item.price.toFixed(2)}</span></p>
      <p class="total">$<span>${(item.price * ammount).toFixed(2)}</span></p>
    </div>
    <hr />
    <button class="btn-remove">
      <img src="assets/images/icon-remove-item.svg" alt="" />
    </button>
  </div>`;
  cartOrdersEl.insertAdjacentHTML(`beforeend`, html);
}

function removeFromCart(id) {
  cartOrdersEl.querySelector(`.order[data-id="${id}"`).remove();
}

gridContEl.addEventListener(`click`, function (e) {
  const targetEl = e.target.closest(`.menu-item`);
  const tragetId = Number(targetEl?.dataset.id);
  if (e.target.closest(`button`)?.classList.contains(`btn-add`)) {
    targetEl.querySelector(`.btns-cont`)?.classList.remove(`hidden`);
    targetEl.querySelector(`.img-cont`)?.classList.add(`selected`);
    addElToOrder(tragetId);
  } else if (e.target.closest(`button`)?.classList.contains(`inc`)) {
    addElToOrder(tragetId);
  } else if (e.target.closest(`button`)?.classList.contains(`dec`)) {
    removeElFromOrder(tragetId);
  }
  if (targetEl) {
    targetEl.querySelector(`.quantity`).textContent = order.find(
      (el) => el.id === tragetId
    )?.ammount;
  }
});

cartOrdersEl.addEventListener(`click`, function (e) {
  const targetEl = e.target.closest(`.order`);
  console.log(e.target);
  if (e.target.closest(`button`)?.classList.contains(`btn-remove`)) {
    const id = Number(targetEl.dataset.id);
    order.find((el) => el.id === id).ammount = 0;
    removeElFromOrder(id);
    updateOrder();
  }
});

confirmOrderEl.addEventListener(`click`, function (e) {
  window.scrollTo({ top: 0, behavior: "smooth" });
  modalWrapperEl.classList.remove(`hidden`);
  document.body.style.overflow = `hidden`;

  order.forEach((o) => {
    const item = menuItems[o.id];
    const html = `
    <div class="order-final">
      <div class="text-total">
        <div class="img-text">
          <img src="${item.image.thumbnail}" alt=""/>
          <div>
            <p class="order-name">${item.name}</p>
            <div class="ammount-price">
              <p class="ammount"><span>${o.ammount}</span>x</p>
              <p class="price">@$<span>${item.price.toFixed(2)}</span></p>
            </div>
          </div>
        </div>
        <p class="total">$<span>${(o.ammount * item.price).toFixed(
          2
        )}</span></p>
      </div>
      <hr />
    </div>
    `;
    finalOrdersEl.insertAdjacentHTML(`beforeend`, html);
  });
  const total = order.reduce(
    (acc, o) => acc + menuItems[o.id].price * o.ammount,
    0
  );
  modalTotalEl.textContent = `$${total.toFixed(2)}`;
});

newOrderBtnEl.addEventListener(`click`, function () {
  order.forEach((o) => {
    o.ammount = 0;
    removeElFromOrder(o.id);
  });
  order = [];
  updateOrder();
  modalWrapperEl.classList.add(`hidden`);
  document.body.style.overflow = `scroll`;
  finalOrdersEl.innerHTML = "";
});

window.addEventListener("resize", function (e) {
  const width = window.innerWidth;
  const height = window.innerHeight;

  if (width > 800) {
    gridEls.forEach((el, id) => {
      el.querySelector(`.main-img`).src = menuItems[id].image.desktop;
    });
  } else if (width <= 800 && width > 496) {
    gridEls.forEach((el, id) => {
      el.querySelector(`.main-img`).src = menuItems[id].image.tablet;
    });
  } else if (width <= 496) {
    gridEls.forEach((el, id) => {
      el.querySelector(`.main-img`).src = menuItems[id].image.mobile;
    });
  }

  if (height < modalEl.offsetHeight) {
    modalWrapperEl.classList.add(`modal-fix`);
  } else {
    modalWrapperEl.classList.remove(`modal-fix`);
  }
});
