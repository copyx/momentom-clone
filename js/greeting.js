const nameForm = document.querySelector(".name-form");
const greeting = document.querySelector(".greeting");
const greetingText = document.querySelector(".greeting__text");

const USER_LS = "currentUser";
const SHOWING_CN = "showing";

function saveName(name) {
  localStorage.setItem(USER_LS, name);
}

function onSubmitNameForm(event) {
  event.preventDefault();
  const name = event.target.name.value;

  paintGreeting(name);
  saveName(name);
}

function onClickEditBtn(event) {
  askForName();
}

function askForName() {
  nameForm.classList.add(SHOWING_CN);
  greeting.classList.remove(SHOWING_CN);
}

function paintGreeting(text) {
  greetingText.innerText = `Hello ${text} :)`;
  nameForm.classList.remove(SHOWING_CN);
  greeting.classList.add(SHOWING_CN);
}

function loadName() {
  const currentUser = localStorage.getItem(USER_LS);
  if (currentUser === null) {
    askForName();
  } else {
    paintGreeting(currentUser);
  }
}

function init() {
  const greetingEditBtn = document.querySelector(".greeting__edit-btn");

  greetingEditBtn.addEventListener("click", onClickEditBtn);
  nameForm.addEventListener("submit", onSubmitNameForm);
  loadName();
}

init();
