import { DataManager } from "./dataManager";
import { PageManager } from "./pageManager";

const dataManager = new DataManager("http://localhost:5500");
const pageManager = new PageManager(document.querySelector("main"));
