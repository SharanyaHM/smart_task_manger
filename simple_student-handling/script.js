const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

displayTasks();

addBtn.addEventListener("click", () => {

  const taskText = taskInput.value.trim();

  if(taskText === "") return;

  const task = {
    text: taskText,
    completed: false
  };

  tasks.push(task);

  saveTasks();

  displayTasks();

  taskInput.value = "";
});

function displayTasks(){

  taskList.innerHTML = "";

  tasks.forEach((task, index) => {

    const li = document.createElement("li");

    if(task.completed){
      li.classList.add("completed");
    }

    li.innerHTML = `
      <span>${task.text}</span>

      <div>
        <button onclick="toggleTask(${index})">✔</button>

        <button onclick="deleteTask(${index})">🗑</button>
      </div>
    `;

    taskList.appendChild(li);
  });
}

function toggleTask(index){

  tasks[index].completed = !tasks[index].completed;

  saveTasks();

  displayTasks();
}

function deleteTask(index){

  tasks.splice(index,1);

  saveTasks();

  displayTasks();
}

function saveTasks(){

  localStorage.setItem("tasks", JSON.stringify(tasks));
}