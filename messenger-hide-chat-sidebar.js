// ==UserScript==
// @name         messenger-hide-chat-sidebar
// @namespace    http://tampermonkey.net/
// @version      2024-09-14
// @description  hide the 'chats' left sidebar to open a single convo 'fullwidth'
// @author       You
// @match        https://www.facebook.com/messages/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=facebook.com
// @grant        none
// ==/UserScript==

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

function injectCss(id, css) {
  const existing = document.querySelector(`head > link#${id}`);
  if (existing) return;

  const link = document.createElement("link");
  link.id = id;
  link.rel = "stylesheet";
  link.textContent = css;
  document.head.appendChild(link);
}

(async function () {
  "use strict";
  const css = `
    [aria-label="Threads list"] {
      width: 4rem !important;
    }
  `;
  injectCss('hide-chat-sidebar', css);
})();

async function getElement(selector, timeout = 30000, interval = 200) {
  let el = document.querySelector(selector);
  if (el) return el;

  const timer = setTimeout(() => {
    throw new Error(
      `timeout finding element '${selector}' after ${timeout / 1000}s`
    );
  }, timeout);

  while (!el) {
    el = document.querySelector(selector);
    if (el) {
      clearTimeout(timer);
      return el;
    }
    sleep(interval);
  }
}
