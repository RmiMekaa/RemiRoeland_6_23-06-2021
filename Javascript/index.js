/* global page */

import { PageManager } from "./pageManager.js";

window.pageManager = new PageManager(document.querySelector("body"), "http://localhost:5500");