//Variables to access the button on the page and to access the un-ordered list items
var formE1 = document.querySelector("#task-form");
var tasksToDoE1 = document.querySelector("#tasks-to-do");
var taskIdCounter = 0;
var pageContentE1 = document.querySelector("#page-content");
var taskInProgressE1 = document.querySelector("#tasks-in-progress");
var tasksCompletedE1 = document.querySelector("#tasks-completed");
var tasks=[];


//CompleteEdit function
var completeEditTask = function(taskName, taskType, taskId) {
    //find matching task list item
    var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");

    // set new values
    taskSelected.querySelector("h3.task-name").textContent = taskName;
    taskSelected.querySelector("span.task-type").textContent = taskType;

    // loop through tasks array and task object with new content
for (var i = 0; i < tasks.length; i++) {
    if (tasks[i].id === parseInt(taskId)) {
        tasks[i].name = taskName;
        tasks[i].type = taskType;
    }
};



    alert("Task Updated");
    formE1.removeAttribute("data-task-id");
    document.querySelector("#save-task").textContent = "Add Task";
    };

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

    var isEdit = formE1.hasAttribute("data-task-id");
    

    // has data attribute, so get task id and call function to complete edit process
    if (isEdit) {
    var taskId = formE1.getAttribute("data-task-id");
    completeEditTask(taskNameInput, taskTypeInput, taskId);
    } 
    // no data attribute, so create object as normal and pass to createTaskEl function
    else {
    var taskDataObj = {
        name: taskNameInput,
        type: taskTypeInput,
        status: "to do"
    };
    createTaskE1(taskDataObj);
    }
}

//function to create new task
var createTaskE1 = function(taskDataObj) {
    // create list item
var listItemEl = document.createElement("li");
listItemEl.className = "task-item";

// add task id as a custom attribute
listItemEl.setAttribute("data-task-id", taskIdCounter);
listItemEl.setAttribute("draggable", "true");

// create div to hold task info and add to list item
var taskInfoEl = document.createElement("div");
// give it a class name
taskInfoEl.className = "task-info";
// add HTML content to div
taskInfoEl.innerHTML = "<h3 class='task-name'>" + taskDataObj.name + "</h3><span class='task-type'>" + taskDataObj.type + "</span>";
listItemEl.appendChild(taskInfoEl);
taskDataObj.id=taskIdCounter;
tasks.push(taskDataObj);

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
    var statusChoices = ["TO DO", "In Progress", "Completed"];

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
    // create new array to hold updated list of tasks
var updatedTaskArr = [];

// loop through current tasks
for (var i = 0; i < tasks.length; i++) {
  // if tasks[i].id doesn't match the value of taskId, let's keep that task and push it into the new array
    if (tasks[i].id !== parseInt(taskId)) {
    updatedTaskArr.push(tasks[i]);
    }
}

// reassign tasks array to be the same as updatedTaskArr
tasks = updatedTaskArr;

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

//status update handler
var taskStatusChangeHandler = function(event) {
    // get the task item's id
    var taskId = event.target.getAttribute("data-task-id");

    // get the currently selected options value and convert to lowercase
    var statusValue = event.target.value.toLowerCase();

    // find the parent task item element based on the id
    var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");

    if (statusValue === "to do"){
        tasksToDoE1.appendChild(taskSelected);
    }
    else if (statusValue === "in progress") {
        taskInProgressE1.appendChild(taskSelected);
    }
    else if (statusValue === "completed") {
        tasksCompletedE1.appendChild(taskSelected);
    }

    // update task's in tasks array
for (var i = 0; i < tasks.length; i++) {
    if (tasks[i].id === parseInt(taskId)) {
        tasks[i].status = statusValue;
    }
    }

};

//drag function
var dragTaskHandler = function(event) {
    var taskId = event.target.getAttribute("data-task-id");
    event.dataTransfer.setData("text/plain", taskId);
    var getId = event.dataTransfer.getData("text/plain");
    console.log("getId:", getId, typeof getId);
}
    
    
//drop zone
var dropZoneDragHandler = function(event) {
    var taskListE1 =  event.target.closest(".task-list");
    if (taskListE1) {
        event.preventDefault();
        taskListE1.setAttribute("style", "background: rgba(68, 233, 255, 0.7); border-style: dashed;");
        
    }
}

//drop task
var dropTaskHandler = function(event) {
    var id = event.dataTransfer.getData("text/plain");
    var draggableElement = document.querySelector("[data-task-id= '" + id + "']");
    var dropZoneE1 = event.target.closest(".task-list");
    var statusType = dropZoneE1.id;
    //set task status on drop zone
    var statusSelectE1 = draggableElement.querySelector("select[name='status-change']");
    if (statusType === "tasks-to-do"){
        statusSelectE1.selectedIndex = 0;
    }
    else if (statusType === "tasks-in-progress") {
        statusSelectE1.selectedIndex = 1;
    }
    else if (statusType === "tasks-completed") {
        statusSelectE1.selectedIndex = 2;
    }
    dropZoneE1.removeAttribute("style");
    dropZoneE1.appendChild(draggableElement);
    // loop through tasks array to find and update the updated task's status
for (var i = 0; i < tasks.length; i++) {
    if (tasks[i].id === parseInt(id)) {
        tasks[i].status = statusSelectEl.value.toLowerCase();
    }
    }
}

// on drag-drop
var dragLeaveHandler = function(event){
    var taskListE1 = event.target.closest(".task-list");
    if (taskListE1) {
        taskListE1.removeAttribute("style");
    }
}
pageContentE1.addEventListener("click", taskButtonHandler);

pageContentE1.addEventListener("change", taskStatusChangeHandler);

pageContentE1.addEventListener("dragstart", dragTaskHandler);

pageContentE1.addEventListener("dragover", dropZoneDragHandler);

pageContentE1.addEventListener("drop", dropTaskHandler);

pageContentE1.addEventListener("dragleave",dragLeaveHandler);

