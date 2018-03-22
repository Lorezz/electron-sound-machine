const { ipcRenderer, Menu, Tray } = require("electron");

var path = require("path");
var fs = require("fs");

function addSpeakerHole() {
    var div = document.createElement("div");
    div.className = "speaker-hole";
    document.getElementById("speaker-box").appendChild(div);
}

function addBt(html) {
    var div = document.createElement("div");
    div.className = "button-wrap";
    div.innerHTML = html;
    document.getElementById("buttons").appendChild(div);
}
//speaker
for (var i = 0; i < 40; i++) {
    addSpeakerHole();
}

let sounds = fs.readdirSync(__dirname + "/mp3/");
console.log("sounds", sounds);
var items = [];
var index = 0;
let keys = "1234567890qwertyuiopasdfghjklzxcvbnm".split("");
const alphabet = [...keys, ...["F1", "F2", "F3", "F4"]];
sounds.forEach(function(element) {
    if (element.indexOf(".mp3") > 0) {
        console.log(element);
        let name = element.split(".")[0];
        let bt = `
        <div class="button-sound" data-sound="${name}">
            <span class="button-icon"></span>
            <span class="button-shortcut">${alphabet[index]}</span>
        </div>
        `;
        addBt(bt);
        index++;
    }
});

var soundButtons = document.querySelectorAll(".button-sound");
var closeEl = document.querySelector(".close");
var settingsEl = document.querySelector(".settings");
var trayIcon = null;
var trayMenu = null;
for (var i = 0; i < soundButtons.length; i++) {
    var soundButton = soundButtons[i];
    var soundName = soundButton.attributes["data-sound"].value;
    prepareButton(soundButton, soundName);
}

function prepareButton(buttonEl, soundName) {
    buttonEl.querySelector("span").style.backgroundImage =
        'url("img/icons/' + soundName + '.svg")';

    var audio = new Audio(__dirname + "/mp3/" + soundName + ".mp3");
    buttonEl.addEventListener("click", function() {
        audio.currentTime = 0;
        audio.play();
    });
}

closeEl.addEventListener("click", function() {
    ipcRenderer.send("close-main-window");
});

settingsEl.addEventListener("click", function() {
    ipcRenderer.send("open-settings-window");
});

ipcRenderer.on("global-shortcut", (event, arg) => {
    console.log("global-shortcut", arg);
    var event = new MouseEvent("click");
    soundButtons[arg].dispatchEvent(event);
});
