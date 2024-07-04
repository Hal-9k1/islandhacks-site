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
    if (this.#initSyncTimestamp === undefined) {
      this.#initSyncTimestamp = Date.now();
      this.#update();
    } else if (Math.floor(this.#initSyncTimestamp / 1000) !== Math.floor(Date.now() / 1000)) {
      clearInterval(this.#pollSyncInterval);
      this.#update();
      setInterval(this.#update.bind(this), 1000);
    }
  }

  #update() {
    const now = Date.now();
    if (isNaN(this.#goalTimestamp) || this.#goalTimestamp < now) {
      this.#elem.innerText = "Event has passed";
      return;
    }

    const deltaMs = this.#goalTimestamp - now;
    const SECONDS_IN_MINUTE = 60;
    const MINUTES_IN_HOUR = 60;
    const HOURS_IN_DAY = 24;
    const MILLISECONDS_IN_SECOND = 1000;

    const deltaSec = Math.floor(deltaMs / MILLISECONDS_IN_SECOND);
    const deltaMin = Math.floor(deltaSec / SECONDS_IN_MINUTE);
    const deltaHr = Math.floor(deltaMin / MINUTES_IN_HOUR);
    const deltaDay = Math.floor(deltaHr / HOURS_IN_DAY);

    const sec = (deltaSec % SECONDS_IN_MINUTE).toString().padStart(2, '0');
    const min = (deltaMin % MINUTES_IN_HOUR).toString().padStart(2, '0');
    const hr = (deltaHr % HOURS_IN_DAY).toString().padStart(2, '0');
    const day = deltaDay.toString().padStart(2, '0');

    this.#elem.innerText = `${day}:${hr}:${min}:${sec}`;
  }
}

const eventTimeMs = new Date("2024-09-07T09:00:00-07:00").getTime();
new Countdown(document.getElementsByClassName("countdown")[0], eventTimeMs);