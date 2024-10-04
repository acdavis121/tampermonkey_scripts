// ==UserScript==
// @name         Better YT Speed controls
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Allows finer control of YT playback speed
// @author       You
// @match        https://www.youtube.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=youtube.com
// @grant        none
// ==/UserScript==

(function () {
  "use strict";
  console.log("SPEED CONTROL START");
  const FONT_SIZE = "24px";
  const FONT_WEIGHT = "bold";
  const PAD = "0.5rem";
  let player = document.getElementsByTagName("video")[0];
  let myInterval = (window.myinterval = null);
  let myInterval2 = null;
  console.log("PLAYER:", player);

  const checkPlayer = () => {
    console.log("checkplayer", player, myInterval, window.myinterval);
    if (player) {
      clearInterval(myInterval);
      init();
      return;
    }
    player = document.getElementsByTagName("video")[0];
  };

  if (!player && !myInterval) {
    console.log("no player found");
    myInterval = setInterval(checkPlayer, 200);
  }

  const checkForControls = () => {
    const controls = document.getElementById("myspeedcontrols");
    if (!controls) init();
    else return;
  };

  const init = () => {
    const display = document.createElement("span");

    const pbrate = () => player.playbackRate.toFixed(2);

    const increase = () => {
      player.playbackRate += 0.1;
      display.textContent = pbrate();
      window.mypbrate = player.playbackRate;
    };
    const decrease = () => {
      player.playbackRate -= 0.1;
      display.textContent = pbrate();
      window.mypbrate = player.playbackRate;
    };

    const setSpeed = (speed) => {
      console.log(speed, parseFloat(speed).toFixed(1));
      player.playbackRate = parseFloat(speed).toFixed(1);
      display.textContent = pbrate();
      window.mypbrate = player.playbackRate;
    };

    const container = document.createElement("div");
    container.style.position = "absolute";
    container.style.top = 0;
    container.style.right = 0;
    container.style.minWidth = "10rem";
    container.style.maxWidth = "20rem";
    container.style.padding = PAD;
    container.style.zIndex = 10000;
    container.style.background = "#999";
    container.style.color = "#000";
    container.id = "myspeedcontrols";

    const controls = document.createElement("div");
    controls.style.padding = PAD;
    controls.style.display = "flex";
    controls.style.justifyContent = "space-between";
    controls.style.alignItems = "center";

    const incButton = document.createElement("button");
    incButton.style.padding = PAD;
    incButton.style.fontWeight = FONT_WEIGHT;
    incButton.style.fontSize = FONT_SIZE;
    incButton.textContent = "+";
    incButton.addEventListener("click", increase);

    const decButton = document.createElement("button");
    decButton.style.padding = PAD;
    decButton.style.fontWeight = FONT_WEIGHT;
    decButton.style.fontSize = FONT_SIZE;
    decButton.textContent = "-";
    decButton.addEventListener("click", decrease);

    display.style.fontSize = FONT_SIZE;
    display.style.fontWeight = FONT_WEIGHT;
    display.textContent = pbrate();

    const quickPicks = document.createElement("div");
    quickPicks.style.padding = PAD;
    for (let i = 0.25; i < 3; i += 0.25) {
      let btn = document.createElement("button");
      btn.addEventListener("click", (e) => setSpeed(e.target.textContent));
      btn.textContent = i.toFixed(2);
      quickPicks.appendChild(btn);
    }

    controls.appendChild(decButton);
    controls.appendChild(display);
    controls.appendChild(incButton);

    container.appendChild(controls);
    container.appendChild(quickPicks);

    document.body.appendChild(container);

    if (player && window.mypbrate) {
      player.playbackRate = window.mypbrate;
      display.textContent = pbrate();
    }

  };
  if (!myInterval2) {
    myInterval2 = setInterval(checkForControls, 100);
  }
})();
