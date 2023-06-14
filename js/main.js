// Variables
var startTime;
var running = false;
var timerInterval;
var elapsedTime = 0;
var subtractedTime = 0; // Variable to store subtracted time

// Function to start or stop the timer
function startStopTimer() {
    if (running) {
        stopTimer();
    } else {
        startTimer();
    }
}

// Function to stop the timer
function stopTimer() {
    running = false;
    clearInterval(timerInterval);
    elapsedTime = Date.now() - startTime;
    document.getElementById("startStopButton").innerHTML = "Start";
    document.getElementById("startStopButton").removeEventListener("click", startStopTimer);
    document.getElementById("startStopButton").addEventListener("click", startStopTimer);

    if (isWithinTimeRange()) {
        subtractedTime += elapsedTime - (30 * 60 * 1000); // Subtract 30 minutes
    }

    saveTime();
}

// Function to save the time and generate a file
function saveTime() {
    var currentHour = new Date().getHours();
    var currentMinutes = new Date().getMinutes();
    var aftensmad = "Nej";

    if (currentHour === 10 && currentMinutes >= 0 && currentMinutes <= 30) {
        aftensmad = "Ja";
    }

    var name = document.querySelector(".nameInput").value;
    var time = formatTime(elapsedTime - subtractedTime); // Subtract subtractedTime from elapsed time
    var fileContent = "Navn: " + name + "\nTid: " + time + "\nAftensmad: " + aftensmad;

    var date = new Date();
    var month = ("0" + (date.getMonth() + 1)).slice(-2);
    var day = ("0" + date.getDate()).slice(-2);
    var year = date.getFullYear();
    var formattedDate = month + "-" + day + "-" + year;
    var filename = name + " Network-Timer " + formattedDate + ".txt";

    var link = document.createElement("a");
    link.href = "data:text/plain;charset=utf-8," + encodeURIComponent(fileContent);
    link.download = filename;
    link.style.display = "none";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

// Function to start the timer
function startTimer() {
    startTime = Date.now() - elapsedTime;
    running = true;
    timerInterval = setInterval(updateTimer, 10);
    document.getElementById("startStopButton").innerHTML = "Stop & Save";
    document.getElementById("startStopButton").removeEventListener("click", startStopTimer);
    document.getElementById("startStopButton").addEventListener("click", startStopTimer);
}

// Function to update the timer display
function updateTimer() {
    var currentTime = Date.now();
    elapsedTime = currentTime - startTime - subtractedTime; // Subtract subtractedTime from elapsed time

    var milliseconds = Math.floor((elapsedTime % 1000) / 10);
    var seconds = Math.floor((elapsedTime / 1000) % 60);
    var minutes = Math.floor((elapsedTime / (1000 * 60)) % 60);
    var hours = Math.floor((elapsedTime / (1000 * 60 * 60)) % 24);

    var timeString =
        (hours < 10 ? "0" + hours : hours) +
        ":" +
        (minutes < 10 ? "0" + minutes : minutes) +
        ":" +
        (seconds < 10 ? "0" + seconds : seconds) +
        "." +
        (milliseconds < 10 ? "0" + milliseconds : milliseconds);

    document.getElementById("time").innerHTML = timeString;
}

// Function to check if current time is within the range of 10:00 to 10:30
function isWithinTimeRange() {
    var currentHour = new Date().getHours();
    var currentMinutes = new Date().getMinutes();

    return currentHour === 10 && currentMinutes >= 0 && currentMinutes <= 30;
}

// Function to format time in HH:MM:SS format
function formatTime(time) {
    var milliseconds = Math.floor((time % 1000) / 10);
    var seconds = Math.floor((time / 1000) % 60);
    var minutes = Math.floor((time / (1000 * 60)) % 60);
    var hours = Math.floor((time / (1000 * 60 * 60)) % 24);

    return (
        (hours < 10 ? "0" + hours : hours) +
        ":" +
        (minutes < 10 ? "0" + minutes : minutes) +
        ":" +
        (seconds < 10 ? "0" + seconds : seconds) +
        "." +
        (milliseconds < 10 ? "0" + milliseconds : milliseconds)
    );
}

// Start the timer when the webpage loads
startTimer();
