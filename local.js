let obj = [];

window.onload = () => {
    render();
    document.querySelector("#add-task").addEventListener("click", (e) => {
        let input = document.querySelector("input");
        addToLocalStorage(input.value);
    });
    if (!window.localStorage.getItem("data")) {
        window.localStorage.setItem(JSON.stringify(obj), "");
    } else {
        obj = JSON.parse(window.localStorage.getItem("data"));
    }
    render();
}
const render = () => {
    let items = window.localStorage.getItem("data");
    let ul = document.querySelector("#local-storage");
    while (ul.firstChild) {
        ul.firstChild.remove();
    }
    for (let item of obj) {
        let li = document.createElement("li");
        li.innerText = item;
        ul.appendChild(li);
    }
}

const addToLocalStorage = (item) => {
    obj.push(item);
    window.localStorage.setItem("data", JSON.stringify(obj));
    render();
}

const clearLocalStorageItems = () => {
    obj = [];
    window.localStorage.removeItem("data");
    render();
}

