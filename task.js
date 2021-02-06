let tasks = [];
let modifiable = true;
let taskIndex = 0;

const renderTaskList = () => {
    let tl = document.querySelector("#task-list");
    while (tl.firstChild) {
        tl.firstChild.remove();
    }
    for (let i = 0; i < tasks.length; i++) {
        let li = document.createElement("li");
        li.innerText = tasks[i];

        let bt = document.createElement("button")
        bt.onclick = deleteTask;
        if (!modifiable) {
            bt.disabled = true;
        }
        bt.innerText = "Delete"

        li.appendChild(bt);

        li.setAttribute("index", i);
        tl.appendChild(li);
    }
}
const deleteTask = (e) => {
    tasks.splice(e.target.parentNode.getAttribute("index"), 1);
    renderTaskList();
}

const addTask = () => {
    let input = document.querySelector("#task-input");
    if (input.value != "") {
        tasks.push(input.value);
        input.value = "";
        renderTaskList();
    }
}

const toggleTaskView = () => {
    if (modifiable) {
        document.querySelector("#toggle-task-view").innerText = "End Task View";
        taskIndex = 0;
        renderTaskCycler();
    } else {
        document.querySelector("#toggle-task-view").innerText = "Start Task View";
        clearRenderTaskCycler();
    }
    modifiable = !modifiable;
    document.querySelector("#add-task").disabled = !modifiable;
    document.querySelector("#populate").disabled = !modifiable;
    renderTaskList();
}

const renderTaskCycler = () => {
    let taskCycler = document.querySelector("#task-cycler");
    clearRenderTaskCycler()
    if (taskIndex >= tasks.length) {
        let p = document.createElement("p");
        p.innerText = "No more tasks.";
        taskCycler.appendChild(p);
    } else {
        taskCycler.appendChild(constructTask("Current Task", taskIndex));
        if (taskIndex < tasks.length - 1) {
            taskCycler.appendChild(constructTask("Next Task", taskIndex + 1));
        }
        let nextTaskButton = document.createElement("button");
        nextTaskButton.onclick = nextTaskView;
        nextTaskButton.innerText = "Finished Task";

        taskCycler.appendChild(nextTaskButton);
    }
}

const clearRenderTaskCycler = () => {
    let taskCycler = document.querySelector("#task-cycler");
    while (taskCycler.firstChild) {
        taskCycler.firstChild.remove();
    }
}

const constructTask = (message, index) => {
    let taskDisplay = document.createElement("p");
    taskDisplay.innerHTML = `<b>${message}:</b> ${tasks[index]}`;
    return taskDisplay;
}

const nextTaskView = () => {
    taskIndex++;
    renderTaskCycler();
}

window.onload = () => {
    renderTaskList();
}

const populate = () => {
    tasks = ["Do CSE110 Lab", "Finish Project Pitch", "Document Code", "Attempt CSE 101 Homework", "Apply to Internships", "Send Email", "Study for Databases Exam"];
    renderTaskList();
}