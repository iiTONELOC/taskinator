//Variables to access the button on the page and to access the un-ordered list items
var buttonE1 = document.querySelector("#save-task");
var tasksToDoE1 = document.querySelector("#tasks-to-do");

// create task function
var createTaskHandler = function(){
    var listItemE1 = document.createElement("li");
    listItemE1.className="task-item";
    listItemE1.textContent="This is a new task.";
    tasksToDoE1.appendChild(listItemE1);
}

//event listener for Add Task button click
buttonE1.addEventListener("click", createTaskHandler);

