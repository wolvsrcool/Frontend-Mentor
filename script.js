"use strict";

const gridContEl = document.querySelector(".grid-container");
const gridItemEls = document.querySelectorAll(".grid-item");
const openFilterMenuBtnEl = document.querySelector(".filter-menu-btn");
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

gridItemEls.forEach((el, i) => {
  setTimeout(() => {
    shrinkUp(el, 400);
  }, i * 50);
});

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

function randomFloat(min, max) {
  return parseFloat((Math.random() * (max - min) + min).toFixed(3));
}

function makeItemFunny(funControl = 1) {
  const scale = randomFloat(1.0, 1.05);
  const skew = randomFloat(-1, 1);
  const translateY = randomFloat(-5, -15);
  const translateX = randomFloat(-5, 5);
  const transformStr = `scale(${scale}) skew(${skew}deg) translateY(${translateY}px) translateX(${translateX}px)`;
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
  animation.finished.then(() => (item.style.transform = funnyState));
  return animation;
}

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
  const animation = elem.animate(
    [
      { opacity: "0", transform: "scale(0)" },
      { opacity: "1", transform: "scale(1)" },
    ],
    {
      duration: duration,
      iterations: 1,
    }
  );
  return animation;
}

function showEl(entries) {
  entries.forEach((e, i) => {
    if (e.isIntersecting) {
      setTimeout(() => {
        e.target.classList.remove(`hidden`);
        observerLoad.unobserve(e.target);
      }, i * 50);
    }
  });
}

const observerLoad = new IntersectionObserver(showEl, {
  root: null,
  threshold: 0.15,
});

gridItemEls.forEach((el) => {
  observerLoad.observe(el);
});

let animations = new Array(gridItemEls.length);

function animateEnter(i, el) {
  const funnyState = makeItemFunny();
  animations[i] = funnyAnimate(el, 300, funnyState);
}

function animateLeave(i, el) {
  const state = `scale(1) skew(0deg) translateY(0px) translateX(0px)`;
  animations[i] = funnyAnimate(el, 300, state);
}

gridItemEls.forEach((el, i) => {
  el.addEventListener("mouseover", function () {
    if (!el.classList.contains("selected")) {
      if (animations[i]) animations[i].finished.then(() => animateEnter(i, el));
      else animateEnter(i, el);
    }
  });
  el.addEventListener("mouseleave", function () {
    if (animations[i]) animations[i].finished.then(() => animateLeave(i, el));
    else animateLeave(i, el);
  });
});

gridContEl.addEventListener(`click`, function (e) {
  e.preventDefault();
  const gridItem = e.target.closest(`.grid-item`);
  gridItem && animateSelection(gridItem);
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
