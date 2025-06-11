"use strict";

const dropArea = document.querySelector(".file-upload");
const dropAreaText = document.querySelector(".dropAreaText");
const inputAvatar = document.getElementById("input-avatar");
const avatarFileInfoText = document.querySelector(".info-p");
const img = avatarFileInfoText.querySelector("img");
const uploadedImgDisplayEl = document.getElementById("upload-img");
const imgBtnsDivEl = document.querySelector(".img-btns");

const inpNameEl = document.getElementById("input-name");
const inpEmailEl = document.getElementById("input-email");
const inpGitEl = document.getElementById("input-github");
const genTickBtnEl = document.querySelector(".btn-submit");

const fullNameEls = document.querySelectorAll(".full-name");
const emailEl = document.getElementById("email-address");
const githubEl = document.getElementById("github");
const photoEl = document.querySelector(".ticket-picture");

const ticketFormEl = document.querySelector(".main-form");
const ticketEl = document.querySelector(".ticket-page");

ticketFormEl.addEventListener("submit", function (e) {
  e.preventDefault();
});

dropArea.addEventListener("dragover", function (e) {
  e.preventDefault();
});

dropArea.addEventListener("drop", function (e) {
  e.preventDefault();
  checkFiles(e.dataTransfer.files);
});

inputAvatar.addEventListener("change", function (e) {
  e.preventDefault();
  checkFiles(e.target.files);
});

inpGitEl.addEventListener("input", function (e) {
  console.log(`now`);
  if (inpGitEl.value.startsWith("@")) {
    inpGitEl.parentElement.classList.remove("user-invalid");
  } else {
    inpGitEl.parentElement.classList.add("user-invalid");
  }
});

imgBtnsDivEl
  .querySelectorAll("button")[0]
  .addEventListener("click", function (e) {
    e.preventDefault();
    removeImage();
    resetMsg("Image removed. Upload your photo (JPG or PNG, max size: 500KB).");
  });

imgBtnsDivEl
  .querySelectorAll("button")[1]
  .addEventListener("click", function (e) {
    e.preventDefault();
    dropArea.click();
  });

genTickBtnEl.addEventListener("click", generateTicket);

function checkFiles(files) {
  if (files.length > 1) {
    errorMsg("Too many files!");
  } else {
    if (files[0].name.endsWith(".jpg") || files[0].name.endsWith(".png")) {
      if (files[0].size <= 500000) {
        inputAvatar.files = files;
        const imgLink = URL.createObjectURL(files[0]);
        uploadedImgDisplayEl.src = imgLink;
        dropAreaText.classList.add("hidden");
        imgBtnsDivEl.classList.remove("hidden");
        resetMsg(`File ${files[0].name} uploaded successfully!`);
      } else {
        errorMsg("File too large. Please upload a photo under 500KB.");
      }
    } else {
      errorMsg("Please only upload JPG or PNG files.");
    }
  }
}

function removeImage() {
  uploadedImgDisplayEl.src = "./assets/images/icon-upload.svg";
  inputAvatar.value = "";
  dropAreaText.classList.remove("hidden");
  imgBtnsDivEl.classList.add("hidden");
}

function errorMsg(msg) {
  avatarFileInfoText.textContent = "";
  avatarFileInfoText.appendChild(img);
  avatarFileInfoText.append(msg);
  img.style.filter =
    "invert(81%) sepia(63%) saturate(844%) hue-rotate(303deg) brightness(98%) contrast(106%)";
  avatarFileInfoText.style.color = "#ff6b6b";
  dropArea.style.borderColor = "#ff6b6b";
}

function resetMsg(msg) {
  avatarFileInfoText.textContent = "";
  img.style.filter = "";
  avatarFileInfoText.appendChild(img);
  avatarFileInfoText.append(msg);
  avatarFileInfoText.style.color = "#8784a4";
  dropArea.style.borderColor = "hsl(245, 15%, 58%)";
}

const randBigNumb = Math.trunc(Math.random() * 89999) + 10001;
const ticketNumber = document.querySelector(".ticket-number");

function generateTicket() {
  if (inputsValidity()) {
    ticketFormEl.classList.add("hidden");
    ticketEl.classList.remove("hidden");
    if (inpNameEl.value.length > 30) {
      fullNameEls[0].textContent = inpNameEl.value.slice(0, 30) + "...!";
    } else {
      fullNameEls[0].textContent = inpNameEl.value + "!";
    }

    fullNameEls[1].textContent = inpNameEl.value;
    emailEl.textContent = inpEmailEl.value;
    githubEl.textContent = inpGitEl.value;
    photoEl.src = uploadedImgDisplayEl.src;
    ticketNumber.textContent = `#0${randBigNumb}`;
  }
}

function inputsValidity() {
  if (!inputAvatar.value) {
    errorMsg("Upload your photo (JPG or PNG, max size: 500KB).");
  }
  if (!inpGitEl.value.startsWith("@")) {
    inpGitEl.parentElement.classList.add("user-invalid");
  }
  if (
    inputAvatar.value &&
    inpGitEl.value.startsWith("@") &&
    inpNameEl.value &&
    inpEmailEl.checkValidity()
  ) {
    return true;
  } else {
    return false;
  }
}
