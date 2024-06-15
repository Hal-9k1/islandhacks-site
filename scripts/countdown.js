class Countdown {
  #elem;
  #goalTimestamp;
  #pollSyncInterval;
  #initSyncTimestamp;
  constructor(elem, goalTimestamp) {
    this.#elem = elem;
    this.#goalTimestamp = goalTimestamp;
    this.#update();
    this.#pollSyncInterval = setInterval(this.#pollSync.bind(this), 1);
  }
  #pollSync() {
    if (this.#initSyncTimestamp == undefined) {
      this.#initSyncTimestamp = Date.now();
      this.#update();
    } else if (Math.floor(this.#initSyncTimestamp / 1000) != Math.floor(Date.now() / 1000)) {
      clearInterval(this.#pollSyncInterval);
      this.#update();
      setInterval(this.#update.bind(this), 1000);
    }
  }
  #update() {
    let deltaMs = Math.max(0, this.#goalTimestamp - Date.now());
    let deltaSec = Math.floor(deltaMs / 1000);
    let deltaMin = Math.floor(deltaSec / 60);
    let deltaHr = Math.floor(deltaMin / 60);
    let deltaDay = Math.floor(deltaHr / 24);
    let sec = (deltaSec % 60).toString().padStart(2, '0');
    let min = (deltaMin % 60).toString().padStart(2, '0');
    let hr = (deltaHr % 24).toString().padStart(2, '0');
    let day = deltaDay.toString().padStart(2, '0');
    this.#elem.innerText = `${day}:${hr}:${min}:${sec}`;
  }
}

const eventTimeMs = new Date("2024-09-07T09:00:00-07:00").getTime();

new Countdown(document.getElementsByClassName("countdown")[0], eventTimeMs);
