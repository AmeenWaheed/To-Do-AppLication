let input = document.querySelector("#input");
let add = document.querySelector("#add");
let tasks = document.querySelector(".tasks");
let btn = document.getElementById("btn");

// Craete Array to store tasks
let arrTasks = [];

if (window.localStorage.getItem("tasks")) {
    arrTasks = JSON.parse(window.localStorage.getItem("tasks"));
}
getData();
// tasks Click event
tasks.addEventListener('click', function (e) {
    if (e.target.classList.contains("del")) {
        delTask(e.target.parentElement.getAttribute("data-id"));
        e.target.parentElement.remove();
    }

    if (e.target.classList.contains("task")) {
        e.target.classList.add("done");
        completedTask(e.target.getAttribute("data-id"));
    }
})

// Add click event to free input value
add.onclick = function () {
    // check input value
    if (input.value !== "") {
        addTask(input.value);
        input.value = "";
    }
};

// Function To add Tasks into array 
function addTask(evenTask) {
    let task = {
        id: Date.now(),
        title: evenTask,
        completed : false,
    };

    
    
    // Push task object to array
    arrTasks.push(task);
    
    // Add element to page
    addElement(arrTasks);
    
    //  Add Element to localStorage
    addLocal(arrTasks);
}

function addElement(arrTasks) {
    tasks.innerHTML = "";
    arrTasks.forEach(element => {
        let div = document.createElement("div");
        div.className = "task";
        div.setAttribute("data-id", element.id);
        div.innerHTML = element.title;

        if (element.completed) {
            div.className = "task done";
        }

        let span = document.createElement("span");
        span.className = "del";
        span.innerHTML = "Delete";
        
        // Add span to div
        div.appendChild(span);
        // Add div to tasks
        tasks.appendChild(div);
    });
}

function addLocal(arrTasks) {
    window.localStorage.setItem("tasks", JSON.stringify(arrTasks));
}

function delTask(taskid) {
    arrTasks = arrTasks.filter((task) => task.id != taskid);
    addLocal(arrTasks);
}

function completedTask(completed) {
    for (let i = 0; i < arrTasks.length;i++) {
        if (arrTasks[i].id == completed) {
            arrTasks[i].completed == false ? arrTasks[i].completed = true : arrTasks[i].completed = false;
        }
        
    }
    addLocal(arrTasks);
}

function getData() {
    let data = window.localStorage.getItem("task");
    if (data) {
        let tasksData = JSON.parse(data);
        addElement(tasksData);
    }
}

btn.onclick = function () {
    localStorage.clear();
    tasks.innerHTML = localStorage.getItem("tasks");
}
