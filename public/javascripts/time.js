var navTime = document.getElementById("nav_time");

function setupTime() {

    function updateTime() {
        navTime.innerText = getCurrentDate();
    }
    setInterval(updateTime, 1000);
}

function getCurrentDate() {
    const options = { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' };
    let currentDate = new Date().toLocaleDateString('en-CA', options);
    return currentDate;
}

setupTime();
