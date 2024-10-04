// ==UserScript==
// @name         YT ad skipper
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to skip youtube ads
// @author       You
// @match        https://www.youtube.com/watch*
// @match        https://www.youtube.com/shorts*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=youtube.com
// @grant        none
// ==/UserScript==

(function () {
  "use strict";

  // Your code here...
  const ad_elem_selectors = [
    "ytd-merch-shelf-renderer",
    "#player-ads",
    "ytd-ad-slot-renderer",
    //"ytd-engagement-panel-section-list-renderer",
  ];

  let myInterval = null;

  let video = document.querySelector("video");

  console.log("video", video);

  let player = document.querySelector("#movie_player");

  console.log("player", player);

  const attrObserver = new MutationObserver((mutations) => {
    mutations.forEach((mu) => {
      //console.log(mu);
      if (mu.type !== "attributes" || mu.attributeName !== "class") return;

      // console.log("class was modified!", player.classList, player.classList.contains('ad-showing') );

      if (player.classList.contains("ad-showing")) {
        console.log("curtime", JSON.stringify(video.currentTime));
        console.log("duration", JSON.stringify(video.duration));
        console.log("skip");
        // console.log('pbrate', video.playbackRate);
        video.currentTime = video.duration;
        document.querySelector(".ytp-ad-skip-button")?.click();
        const buttons = document.querySelectorAll(".video-ads button");
        console.log("buttons", buttons);
        buttons.forEach((b) => /skip/.test(b.className) && b.click());
        if (window.mypbrate) video.playbackRate = window.mypbrate;
      }
    });
  });

  const check = () => {
    video = document.getElementsByTagName("video")[0];
    player = document.getElementById("movie_player");
    console.log("video", video);
    console.log("player", player);
    if (!video || !player) {
      setTimeout(check, 100);
      return;
    }
    console.log("player", player);
    attrObserver.observe(player, { attributes: true });
  };

  if (!video || !player) {
    check();
  } else {
    console.log("player", player);
    attrObserver.observe(player, { attributes: true });
  }

  const checkForAd = () => {
    const ad = document.querySelectorAll(ad_elem_selectors.join(","));
    // console.log("ad", ad);
    ad.length && ad.forEach((a) => a.parentElement.removeChild(a));
    // ad && ad.parentElement.removeChild(ad);
  };

  if (!myInterval) myInterval = setInterval(checkForAd, 1000);
})();
