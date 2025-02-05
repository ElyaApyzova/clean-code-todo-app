//Document is the DOM can be accessed in the console with document.window.
// Tree is from the top, html, body, p etc.

//Problem: User interaction does not provide the correct results.
//Solution: Add interactivity so the user can manage daily tasks.
//Break things down into smaller steps and take each step at a time.


// Event handling, user interaction is what starts the code execution.

const taskInput = document.getElementById("new-task");
const addButton = document.querySelector(".add-button");
const incompleteTaskHolder = document.getElementById("incomplete-tasks");
const completedTasksHolder = document.getElementById("completed-tasks");

const createNewTaskElement = function (taskString) {
  const listItem = document.createElement("li");
  listItem.className = "task-list__item";

  const checkBox = document.createElement("input");
  checkBox.type = "checkbox";

  const label = document.createElement("label");
  label.innerText = taskString;
  label.className = "task-list__label";

  const editInput = document.createElement("input");
  editInput.type = "text";
  editInput.className = "task-list__input";

  const editButton = document.createElement("button");
  editButton.innerText = "Edit";
  editButton.className = "task-list__edit-button";

  const deleteButton = document.createElement("button");
  deleteButton.className = "task-list__delete-button";

  const deleteButtonImg = document.createElement("img");
  deleteButtonImg.src = "./assets/images/remove.svg";
  deleteButtonImg.alt = "Delete";
  deleteButtonImg.className = "task-list__delete-icon";
  deleteButton.appendChild(deleteButtonImg);

  listItem.appendChild(checkBox);
  listItem.appendChild(label);
  listItem.appendChild(editInput);
  listItem.appendChild(editButton);
  listItem.appendChild(deleteButton);

  return listItem;
};

const addTask = function () {
  if (!taskInput.value) return;

  const listItem = createNewTaskElement(taskInput.value);
  incompleteTaskHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskCompleted);

  taskInput.value = "";
};

const editTask = function () {
  const listItem = this.parentNode;
  const editInput = listItem.querySelector("input[type=text]");
  const label = listItem.querySelector(".task-list__label");
  const editButton = listItem.querySelector(".task-list__edit-button");

  const isEditMode = listItem.classList.contains("edit-mode");

  if (isEditMode) {
    label.innerText = editInput.value;
    editButton.innerText = "Edit";
  } else {
    editInput.value = label.innerText;
    editButton.innerText = "Save";
  }

  listItem.classList.toggle("edit-mode");
};

const deleteTask = function () {
  const listItem = this.parentNode;
  const ul = listItem.parentNode;
  ul.removeChild(listItem);
};

const taskCompleted = function () {
  const listItem = this.parentNode;
  completedTasksHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskIncomplete);
};

const taskIncomplete = function () {
  const listItem = this.parentNode;
  incompleteTaskHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskCompleted);
};

const bindTaskEvents = function (taskListItem, checkBoxEventHandler) {
  const checkBox = taskListItem.querySelector("input[type=checkbox]");
  const editButton = taskListItem.querySelector(".task-list__edit-button");
  const deleteButton = taskListItem.querySelector(".task-list__delete-button");

    editButton.onclick = editTask;
    deleteButton.onclick = deleteTask;
    checkBox.onchange = checkBoxEventHandler;
};

addButton.addEventListener("click", addTask);

for (let i = 0; i < incompleteTaskHolder.children.length; i++) {
  bindTaskEvents(incompleteTaskHolder.children[i], taskCompleted);
}

for (let i = 0; i < completedTasksHolder.children.length; i++) {
  bindTaskEvents(completedTasksHolder.children[i], taskIncomplete);
}
