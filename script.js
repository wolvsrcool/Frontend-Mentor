"use strict";

// TODO
// Fix inputs being checked after pressing back in browser

const gridContEl = document.querySelector(".grid-container");
const gridItemEls = document.querySelectorAll(".grid-item");
const openFilterMenuBtnEl = document.querySelector(".filter-menu-btn");
const rstFunnyBtnEl = document.querySelector(".reset-btn");
const filterMenuEl = document.querySelector(".filter-menu");
const inputsEl = document.querySelectorAll("input[type='checkbox']");
const chosenNameEl = document.querySelector(".chosen-name");
const chosenInfoEl = document.querySelector(".chosen-info");
const inputBlockerEl = document.querySelector(".input-blocker");

const allTechArr = [".html", ".js"];
const allLevelsArr = [".newbie", ".junior", ".intermediate"];

let filterTechArr = [];
let filterLevelsArr = [];

window.addEventListener("pageshow", function (e) {
  if (e.persisted) {
    location.reload();
  }
});

let currentlyDisplayed;

openFilterMenuBtnEl.addEventListener("click", function () {
  if (filterMenuEl.style.right != "0px") {
    filterMenuEl.style.right = "0px";
    openFilterMenuBtnEl.querySelector(".icon").name = "close-outline";
  } else {
    filterMenuEl.style.right = "-200%";
    openFilterMenuBtnEl.querySelector(".icon").name = "menu-outline";
  }
  openFilterMenuBtnEl.classList.toggle("active");
});

for (let i = 0; i < inputsEl.length; i++) {
  inputsEl[i].addEventListener("click", function () {
    if (i === 0) {
      toggleInArr(".html", filterTechArr);
    } else if (i === 1) {
      toggleInArr(".js", filterTechArr);
    } else if (i === 2) {
      toggleInArr(".newbie", filterLevelsArr);
    } else if (i === 3) {
      toggleInArr(".junior", filterLevelsArr);
    } else if (i === 4) {
      toggleInArr(".intermediate", filterLevelsArr);
    }
    filterElements();
  });
}

function toggleInArr(item, arr) {
  if (arr.includes(item)) {
    const index = arr.indexOf(item);
    arr.splice(index, 1);
  } else {
    arr.push(item);
  }
}

function filterElements() {
  let toDisplay;
  const filterTech = allTechArr.filter(
    (element) => !filterTechArr.includes(element)
  );
  const filterLevels = allLevelsArr.filter(
    (element) => !filterLevelsArr.includes(element)
  );
  if (filterTech.length && filterTechArr.length) {
    toDisplay = Array.from(gridItemEls).filter(
      (item) => !item.querySelector(`${filterTech}`)
    );

    if (toDisplay.length === 0) {
      toDisplay = Array.from(gridItemEls).filter((item) =>
        item.querySelector(`${filterTechArr}`)
      );
    }
  }
  if (toDisplay === undefined) {
    toDisplay = gridItemEls;
  }
  if (filterLevels.length && filterLevelsArr.length) {
    toDisplay = Array.from(toDisplay).filter(
      (item) => !item.querySelector(`${filterLevels}`)
    );

    if (toDisplay.length === 0) {
      toDisplay = Array.from(toDisplay).filter((item) =>
        item.querySelector(`${filterLevelsArr}`)
      );
    }
  }
  displayGridEl(toDisplay);
  currentlyDisplayed = toDisplay;
}

function displayGridEl(elsToDisplay) {
  for (let i = 0; i < gridItemEls.length; i++) {
    if (
      gridItemEls[i].style.display !== "none" &&
      !Array.from(elsToDisplay).includes(gridItemEls[i])
    ) {
      shrinkDown(gridItemEls[i], 400);
      setTimeout(function () {
        gridItemEls[i].style.display = "none";
      }, 390);
    } else if (
      gridItemEls[i].style.display === "none" &&
      Array.from(elsToDisplay).includes(gridItemEls[i])
    ) {
      gridItemEls[i].style.display = "block";
      shrinkUp(gridItemEls[i], 400);
    }
  }
}

function makeItemFunny(funControl = 0) {
  const scale = 1 + Math.random() / 10 - 0.1 * funControl;
  const skew = Math.random() * (4 - 2);
  const translateY = Math.random() * 20 - 10;
  const transformStr = `scale(${scale}) skew(${skew}deg) translateY(${translateY}px)`;
  return transformStr;
}

function funnyAnimate(item, duration, funnyState) {
  const animation = item.animate(
    [
      {
        transform: `${item.style.transform}`,
      },
      {
        transform: `${funnyState}`,
      },
    ],
    {
      duration: duration,
      iterations: 1,
    }
  );
  setTimeout(function () {
    item.style.transform = funnyState;
  }, duration - 5);
  return animation;
}

let animations = new Array(gridItemEls.length);
let isAnimating = [];

gridItemEls.forEach((el, i) => {
  isAnimating.push(false);

  el.addEventListener("mouseenter", function () {
    if (!gridItemEls[i].classList.contains("selected")) {
      if (isAnimating[i] === false) {
        const funnyState = makeItemFunny();
        animations[i] = funnyAnimate(el, 200, funnyState);
        isAnimating[i] = true;
        animations[i].finished.then(() => (isAnimating[i] = false));
      }
    }
  });
  el.addEventListener("mouseleave", function () {
    if (isAnimating[i] == false) {
      const funnyState = makeItemFunny();
      animations[i] = funnyAnimate(el, 200, funnyState);
      isAnimating[i] = true;
      animations[i].finished.then(() => (isAnimating[i] = false));
    }
  });
});

function shrinkDown(elem, duration) {
  elem.animate(
    [
      { opacity: "1", transform: "scale(1)" },
      { opacity: "0", transform: "scale(0)" },
    ],
    {
      duration: duration,
      iterations: 1,
    }
  );
}

function shrinkUp(elem, duration) {
  elem.animate(
    [
      { opacity: "0", transform: "scale(0)" },
      { opacity: "1", transform: "scale(1)" },
    ],
    {
      duration: duration,
      iterations: 1,
    }
  );
}

for (let i = 0; i < gridItemEls.length; i++) {
  gridItemEls[i].style.display = "block";
  shrinkUp(gridItemEls[i], 400);
}

gridContEl.addEventListener(`click`, function (e) {
  e.preventDefault();
  const gridItem = e.target.closest(`.grid-item`);
  console.log(gridItem);
  animateSelection(gridItem);
});

rstFunnyBtnEl.addEventListener("click", function () {
  for (let i = 0; i < gridItemEls.length; i++) {
    const curTrans = gridItemEls[i].style.transform;
    gridItemEls[i].style.transform = "";
    gridItemEls[i].animate(
      [
        {
          transform: `${curTrans}`,
          opacity: "0.6",
        },
        {
          transform: "",
          opacity: "0.9",
        },
        {
          transform: "scale(0.9)",
          opacity: "0.95",
        },
        {
          transform: "",
          opacity: "1",
        },
      ],
      {
        duration: 600,
        iterations: 1,
      }
    );
  }
});

function animateSelection(selectedItem) {
  for (let i = 0; i < gridItemEls.length; i++) {
    if (gridItemEls[i] !== selectedItem) {
      shrinkDown(gridItemEls[i], 300);
      setTimeout(function () {
        gridItemEls[i].style.opacity = "0";
      }, 290);
    }
  }
  openFilterMenuBtnEl.style.display = "none";
  filterMenuEl.style.display = "none";
  rstFunnyBtnEl.style.display = "none";
  inputBlockerEl.style.display = "block";

  window.scrollTo({ top: 0, behavior: "instant" });
  document.querySelector("body").style.overflow = "hidden";
  selectedItem.classList.add("selected");
  selectedItem.style.opacity = "0.8";

  setTimeout(function () {
    selectedItem.style.transform = "";

    let pos = selectedItem.getBoundingClientRect();
    selectedItem.style.position = "absolute";
    selectedItem.style.left = `${pos.left}px`;
    selectedItem.style.top = `${pos.top}px`;
    selectedItem.animate(
      [
        {
          top: `${pos.top}px`,
          left: `${pos.left}px`,
          opacity: "0.8",
          transform: "scale(1)",
        },
        {
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%) scale(1.25)",
          opacity: "0.9",
        },
        {
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%) scale(1.5)",
          opacity: "1",
        },
        {
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%) scale(1.75)",
          opacity: "1",
        },
      ],
      { duration: 1100, iterations: 1 }
    );
  }, 290);

  chosenNameEl.textContent = selectedItem.querySelector(".name").textContent;
  chosenNameEl.style.display = "block";
  chosenNameEl.animate(
    [
      {
        fontSize: "0rem",
        padding: "0",
        letterSpacing: "0px",
        opacity: "0.6",
      },
      {
        padding: `${chosenNameEl.style.padding}`,
        fontSize: `${chosenNameEl.style.fontSize}`,
        letterSpacing: `${chosenNameEl.style.letterSpacing}`,
        opacity: "1",
      },
    ],
    {
      duration: 600,
      iterations: 1,
    }
  );

  chosenInfoEl.innerHTML = selectedItem.querySelector(".tags").innerHTML;
  chosenInfoEl.style.display = "flex";
  chosenInfoEl.animate(
    [
      {
        fontSize: "0rem",
        padding: "0",
        letterSpacing: "0px",
      },
      {
        padding: `${chosenNameEl.style.padding}`,
        fontSize: `${chosenInfoEl.style.fontSize}`,
        letterSpacing: `${chosenInfoEl.style.letterSpacing}`,
      },
    ],
    {
      duration: 600,
      iterations: 1,
    }
  );

  setTimeout(function () {
    window.location.href = selectedItem.querySelector("a").href;
  }, 1000);
}

function showEl(entires) {
  entires.forEach((e) => {
    if (e.isIntersecting) {
      e.target.classList.remove(`hidden`);
      observerLoad.unobserve(e.target);
    }
    console.log(e);
  });
}

const observerLoad = new IntersectionObserver(showEl, {
  root: null,
  threshold: 0.1,
});

gridItemEls.forEach((el) => {
  el.classList.add(`hidden`);
  observerLoad.observe(el);
});
