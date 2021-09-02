import { DataManager } from "./dataManager.js";
import { PageManager } from "./pageManager.js";

const dataManager = new DataManager("https://rmimekaa.github.io/RemiRoeland_6_23-06-2021/data.json");
globalThis.pageManager = new PageManager(dataManager);