import { Queue } from "./queue";

const onMouseMove = (e: MouseEvent) => {
    const customEvent: LogMouseEvent = generateMouseEvent(e);
    moveQueue.enqueue(customEvent);
    console.log(`MouseMove: ${JSON.stringify(customEvent, null, 2)}`)
  };
const onMouseClick = (e: MouseEvent) => {
    const customEvent: LogMouseEvent = generateMouseEvent(e);
    // @ts-ignore
    const customClickEvent: LogClickEvent = {...customEvent, targetId: e.target.id, lastEvents: moveQueue.toArray()};
    console.log(`MouseClick: ${JSON.stringify(customClickEvent, null, 2)}`);
  };

const generateMouseEvent = (e: MouseEvent) => {
   return {
        x: e.screenX,
        y: e.screenY,
        timestamp: e.timeStamp
    };
}

window.addEventListener("mousemove", onMouseMove);
window.addEventListener("click", onMouseClick);

const lastWebSdkStorageStr = window.localStorage.getItem('WebSdkStorage');
if(lastWebSdkStorageStr != null) {
    const lastWebSdkStorage: WebSdkStorage = JSON.parse(lastWebSdkStorageStr);
    console.log(`The time that passed since the last init time is ${Date.now() - lastWebSdkStorage.lastInitTimestamp} milliseconds`);
}
const webSdkStorage: WebSdkStorage = { lastInitTimestamp: Date.now() };
window.localStorage.setItem('WebSdkStorage', JSON.stringify(webSdkStorage))
const moveQueue = new Queue<LogMouseEvent>();
