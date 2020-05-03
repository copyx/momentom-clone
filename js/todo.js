const todoForm = document.querySelector(".todo__form");
const input = todoForm.querySelector("input");
const pendingList = document.querySelector(".todo__pending-list");
const finishedList = document.querySelector(".todo__finished-list");

const toDoList = [];

const TODO_LIST_LS = "todo-list";

function saveToDoList() {
  localStorage.setItem(TODO_LIST_LS, JSON.stringify(toDoList));
}

function toggleToDo(id) {
  toDoList.forEach((toDo) => {
    if (toDo.id === id) {
      toDo.isCompleted = !toDo.isCompleted;
    }
  });
  saveToDoList();
}

function onClickToggleBtn(event) {
  event.preventDefault();
  const toggleBtn = event.target;
  const toDoElement = toggleBtn.parentElement;
  const iconElement = toggleBtn.querySelector("i");

  if (toDoElement.classList.contains("completed")) {
    pendingList.appendChild(toDoElement);
  } else {
    finishedList.appendChild(toDoElement);
  }

  toDoElement.classList.toggle("completed");
  iconElement.classList.toggle("fa-square");
  iconElement.classList.toggle("fa-check-square");

  toggleToDo(parseInt(toDoElement.id, 10));
}

function onClickRemoveBtn(event) {
  const toDoElement = event.target.parentElement;
  toDoElement.remove();

  const id = parseInt(toDoElement.id, 10);
  const index = toDoList.findIndex((toDo) => toDo.id === id);
  toDoList.splice(index, 1);

  saveToDoList();
}

function createTodoToggleBtn(isCompleted) {
  const toggleBtn = document.createElement("button");
  toggleBtn.classList.add("todo-item__toggle-btn");
  toggleBtn.addEventListener("click", onClickToggleBtn);

  const icon = document.createElement("i");
  icon.classList.add("far");
  icon.classList.add(isCompleted ? "fa-check-square" : "fa-square");
  toggleBtn.appendChild(icon);

  return toggleBtn;
}

function createTodoRemoveBtn() {
  const removeBtn = document.createElement("button");
  removeBtn.classList.add("todo-item__remove-btn");
  removeBtn.addEventListener("click", onClickRemoveBtn);

  const icon = document.createElement("i");
  icon.classList.add("far");
  icon.classList.add("fa-trash-alt");
  removeBtn.appendChild(icon);

  return removeBtn;
}

function createToDoElement(toDoObj) {
  const toDoElement = document.createElement("li");
  toDoElement.innerText = toDoObj.text;
  toDoElement.id = toDoObj.id;
  toDoElement.classList.add("todo-item");

  if (toDoObj.isCompleted) {
    toDoElement.classList.add("completed");
  }

  const toggleBtn = createTodoToggleBtn(toDoObj.isCompleted);
  toDoElement.prepend(toggleBtn);

  const removeBtn = createTodoRemoveBtn();
  toDoElement.appendChild(removeBtn);

  return toDoElement;
}

function addToDo(toDoObj) {
  toDoList.push(toDoObj);
  saveToDoList();

  const toDoElement = createToDoElement(toDoObj);
  (toDoObj.isCompleted ? finishedList : pendingList).appendChild(toDoElement);
}

function onSubmitTodo(event) {
  event.preventDefault();

  const toDoObj = {
    id: new Date().getTime(),
    text: input.value,
    isCompleted: false,
  };

  addToDo(toDoObj);
  todoForm.reset();
}

function init() {
  const loadedToDoList = JSON.parse(localStorage.getItem(TODO_LIST_LS));

  if (loadedToDoList !== null) {
    loadedToDoList.forEach((toDoObj) => {
      addToDo(toDoObj);
    });
  }

  todoForm.addEventListener("submit", onSubmitTodo);
}

init();
