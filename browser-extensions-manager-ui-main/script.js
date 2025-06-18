"use strict";

const changeThemeBtnEl = document.querySelector(".btn-theme");
const bodyEl = document.querySelector("body");
const logoEl = document.querySelector(".logo");
const filterButtonsEls = document.querySelectorAll(".filter-btn");
const extensionsEls = document.querySelectorAll(".extension");
const removeBtnEls = document.querySelectorAll(".actions button");
const modal = ` <div class="confirm-removal">
                  <p>Are you sure?</p>
                  <div>
                    <button>Yes</button>
                    <button>No</button>
                  </div>
                </div>`;

changeThemeBtnEl.addEventListener("click", function () {
  bodyEl.classList.toggle("light");
  changeThemeBtnEl.classList.toggle("rotate");
  if (bodyEl.classList.contains("light")) {
    logoEl.src = "assets/images/logo.svg";
    changeThemeBtnEl.children[0].src = "assets/images/icon-moon.svg";
  } else {
    logoEl.src = "assets/images/logo-white.svg";
    changeThemeBtnEl.children[0].src = "assets/images/icon-sun.svg";
  }
});

for (let i = 0; i < filterButtonsEls.length; i++) {
  filterButtonsEls[i].addEventListener("click", function () {
    for (let x = 0; x < filterButtonsEls.length; x++) {
      filterButtonsEls[x].classList.remove("active");
    }
    filterButtonsEls[i].classList.add("active");
    if (i === 0) {
      for (let x = 0; x < extensionsEls.length; x++) {
        extensionsEls[x].style.display = "flex";
      }
    } else if (i === 1) {
      for (let x = 0; x < extensionsEls.length; x++) {
        extensionsEls[x].style.display = "none";
        if (extensionsEls[x].querySelector(`input[name='isActive']`).checked) {
          extensionsEls[x].style.display = "flex";
        }
      }
    } else if (i === 2) {
      for (let x = 0; x < extensionsEls.length; x++) {
        extensionsEls[x].style.display = "none";
        if (!extensionsEls[x].querySelector(`input[name='isActive']`).checked) {
          extensionsEls[x].style.display = "flex";
        }
      }
    }
    closeModals();
  });
}

for (let i = 0; i < removeBtnEls.length; i++) {
  removeBtnEls[i].addEventListener("click", function () {
    closeModals();
    removeBtnEls[i].insertAdjacentHTML("afterend", modal);
    const modalEl = extensionsEls[i].querySelector(".confirm-removal");
    const modalBtnsEl = extensionsEls[i].querySelectorAll(
      ".confirm-removal button"
    );
    for (let x = 0; x < modalBtnsEl.length; x++) {
      modalBtnsEl[x].addEventListener("click", function () {
        if (x === 0) {
          extensionsEls[i].remove();
        } else if (x === 1) {
          modalEl.remove();
        }
      });
    }
  });
}

function closeModals() {
  const modalEls = document.querySelectorAll(".confirm-removal");
  for (let i = 0; i < modalEls.length; i++) {
    modalEls[i].remove();
  }
}
