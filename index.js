console.log("started");
let time = 0;
let status = "work";
let pomos_done = 0;
let cycles_done = 0;

let next_id = 0;


const max_times = {
    "work": 5000,
    "short break": 3000,
    "long break": 6000,
}
const updateUI = (time) => {
    document.getElementById("cycle").innerText = time;
    document.getElementById("status").innerHTML = status;
    document.getElementById("status").setAttribute("class", status.charAt(0));
    document.getElementById("max-cycle").innerText = max_times[status];
    document.getElementById("pomos-done").innerText = pomos_done;
    document.getElementById("cycles-done").innerText = cycles_done;
}

const renderHistory = (comp_cycles, comp_pomos) => {
    let item = `<tr><td>${next_id++}</td><td>${comp_cycles}</td><td>${comp_pomos}</td></tr>`;
    document.getElementsByTagName("tbody")[0].innerHTML += item;
}

let intervalId = null;
let start_time = null;

const start = () => {
    document.getElementById("begin").classList.add("none");
    document.getElementById("end").classList.remove("none");
    if (intervalId == null) {
        start_time = new Date().getTime();
        intervalId = setInterval(() => {
            let time = new Date().getTime() - start_time;
            updateUI(time);
            if (time >= max_times[status]) {
                time = 0;
                start_time = new Date().getTime();
                switch (status) {
                    case "work":
                        pomos_done++;
                        status = "short break";
                        break;
                    case "short break":
                        if (pomos_done == 4) {
                            status = "long break";
                        } else {
                            status = "work";
                        }
                        break;
                    case "long break":
                        cycles_done++;
                        pomos_done = 0;
                        status = "work";
                        break;
                }
            }
        }, 50);
    }
};

const end = () => {
    document.getElementById("begin").classList.remove("none");
    document.getElementById("end").classList.add("none");
    if (intervalId) {
        clearInterval(intervalId);
        intervalId = null;
        start_time = null;
        renderHistory(cycles_done, pomos_done);
        cycles_done = 0;
        pomos_done = 0;
        status = "work";
        updateUI(0);
    }
}

window.onload = () => {
    updateUI(0);
}