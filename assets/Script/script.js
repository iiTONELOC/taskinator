//Variables to access the button on the page and to access the un-ordered list items
var formE1 = document.querySelector("#task-form");
var tasksToDoE1 = document.querySelector("#tasks-to-do");

// create task function
var createTaskHandler = function(event){
    event.preventDefault();

    var listItemE1 = document.createElement("li");
    listItemE1.className="task-item";
    listItemE1.textContent="This is a new task.";
    tasksToDoE1.appendChild(listItemE1);
    
   
}

//event listener for Add Task button click
formE1.addEventListener("submit", createTaskHandler);

