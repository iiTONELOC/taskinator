//Variables to access the button on the page and to access the un-ordered list items
var formE1 = document.querySelector("#task-form");
var tasksToDoE1 = document.querySelector("#tasks-to-do");
var taskIdCounter = 0;
var pageContentE1 = document.querySelector("#page-content");

// create task function
var taskFormHandler = function(event){
    event.preventDefault();

    var taskNameInput = document.querySelector("input[name='task-name']").value;
    var taskTypeInput = document.querySelector("select[name='task-type']").value;

    //validate user input
    if (!taskNameInput || !taskTypeInput){
        alert("You need to fill out the task form!");
        return false;
    }
    //c;ear the form
    formE1.reset();
    //package data as an object
    var taskDataObj = {
        name: taskNameInput,
        type: taskTypeInput
    };

    //send it as an argument to createTaskE1
    createTaskE1(taskDataObj); 
}

//function to create new task
var createTaskE1 = function(taskDataObj) {
    // create list item
var listItemEl = document.createElement("li");
listItemEl.className = "task-item";

// add task id as a custom attribute
listItemEl.setAttribute("data-task-id", taskIdCounter);

// create div to hold task info and add to list item
var taskInfoEl = document.createElement("div");
// give it a class name
taskInfoEl.className = "task-info";
// add HTML content to div
taskInfoEl.innerHTML = "<h3 class='task-name'>" + taskDataObj.name + "</h3><span class='task-type'>" + taskDataObj.type + "</span>";
listItemEl.appendChild(taskInfoEl);

var taskActionsE1 = createTaskActions(taskIdCounter);
listItemEl.appendChild(taskActionsE1);

// add entire list item to list
tasksToDoE1.appendChild(listItemEl);
// increase task counter for next unique id
taskIdCounter++;
}
// function to create and track tasks
var createTaskActions = function(taskId) {
    var actionContainerE1 = document.createElement("div");
    actionContainerE1.className = "task-actions";

    // create edit button
    var editButtonEl = document.createElement("button");
    editButtonEl.textContent = "Edit";
    editButtonEl.className = "btn edit-btn";
    editButtonEl.setAttribute("data-task-id", taskId);

    actionContainerE1.appendChild(editButtonEl);

    // create delete button
    var deleteButtonEl = document.createElement("button");
    deleteButtonEl.textContent = "Delete";
    deleteButtonEl.className = "btn delete-btn";
    deleteButtonEl.setAttribute("data-task-id", taskId);

    actionContainerE1.appendChild(deleteButtonEl);
    
    // adds the drop down
    var statusSelectE1 = document.createElement("select");
    statusSelectE1.className = "select-status";
    statusSelectE1.setAttribute("name", "status-change");
    statusSelectE1.setAttribute("data-task-id", taskId);
    var statusChoices = ["TO DO", "In-Progress", "Completed"];

    for (var i = 0; i < statusChoices.length; i++) {
        //create option element
        var statusOptionE1 = document.createElement('option');
        statusOptionE1.textContent =statusChoices[i];
        statusOptionE1.setAttribute("value", statusChoices[i]);
        //append tp select
        statusSelectE1.appendChild(statusOptionE1);
        
    }

    actionContainerE1.appendChild(statusSelectE1);

    return actionContainerE1;
};

//event listener for Add Task button click
formE1.addEventListener("submit", taskFormHandler);

var deleteTask = function(taskId){
    var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");
    taskSelected.remove();
};

var editTask = function(taskId) {
    // get task list item element
var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");

// get content from task name and type
var taskName = taskSelected.querySelector("h3.task-name").textContent;

var taskType = taskSelected.querySelector("span.task-type").textContent;

document.querySelector("input[name='task-name']").value = taskName;
document.querySelector("select[name='task-type']").value = taskType;
document.querySelector("#save-task").textContent = "Save Task";
formE1.setAttribute("data-task-id", taskId);
};

var taskButtonHandler = function(event){
     // get target element from event
    var targetEl = event.target;

  // edit button was clicked
    if (targetEl.matches(".edit-btn")) {
    var taskId = targetEl.getAttribute("data-task-id");
    editTask(taskId);
    } 
  // delete button was clicked
    else if (targetEl.matches(".delete-btn")) {
    var taskId = targetEl.getAttribute("data-task-id");
    deleteTask(taskId);
    }
};

pageContentE1.addEventListener("click", taskButtonHandler);

