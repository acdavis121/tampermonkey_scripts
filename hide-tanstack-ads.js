// ==UserScript==
// @name         Hide tanstack ads
// @namespace    http://tampermonkey.net/
// @version      2024-08-21
// @description  hide the sidebar on tanstack documentation pages
// @author       You
// @match        https://tanstack.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=tanstack.com
// @grant        none
// ==/UserScript==

(function () {
  "use strict";
  const myint = setInterval(function () {
    const el = document.querySelector("#root > div > div:nth-child(5)");
    if (el && /our partners/i.test(el.textContent)) {
      el.remove();
      clearInterval(myint);
    }
  }, 1000);
  // Your code here...
})();
