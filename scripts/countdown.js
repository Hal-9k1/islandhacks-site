class Countdown {
  #elem;
  #timeElems;
  #labelElems;
  #elemOrigClass;
  #goalTimestamp;
  #pollSyncInterval;
  #initSyncTimestamp;

  constructor(elem, goalTimestamp) {
    this.#elem = elem;
    this.#timeElems = elem.querySelectorAll(".countdown-element");
    this.#labelElems = elem.querySelectorAll(".countdown-label");
    if (this.#timeElems.length !== 4 || this.#labelElems.length !== 4) {
      throw new Error("Bad countdown element");
    }
    this.#elemOrigClass = elem.className;
    this.#goalTimestamp = goalTimestamp;
    this.#update();
    this.#pollSyncInterval = setInterval(this.#pollSync, 1);
  }

  #pollSync = () => {
    if (this.#initSyncTimestamp === undefined) {
      this.#initSyncTimestamp = Date.now();
      this.#update();
    } else if (Math.floor(this.#initSyncTimestamp / 1000) !== Math.floor(Date.now() / 1000)) {
      clearInterval(this.#pollSyncInterval);
      this.#update();
      setInterval(this.#update, 1000);
    }
  }

  #update = () => {
    const now = Date.now();
    if (isNaN(this.#goalTimestamp) || this.#goalTimestamp < now) {
      this.#elem.className = this.#elemOrigClass;
      this.#elem.innerText = "Happy hacking!";
      return;
    }

    this.#elem.className = this.#elemOrigClass + " countdown-enabled";

    const deltaMs = this.#goalTimestamp - now;
    const SECONDS_IN_MINUTE = 60;
    const MINUTES_IN_HOUR = 60;
    const HOURS_IN_DAY = 24;
    const MILLISECONDS_IN_SECOND = 1000;

    const deltaSec = Math.floor(deltaMs / MILLISECONDS_IN_SECOND);
    const deltaMin = Math.floor(deltaSec / SECONDS_IN_MINUTE);
    const deltaHr = Math.floor(deltaMin / MINUTES_IN_HOUR);
    const deltaDay = Math.floor(deltaHr / HOURS_IN_DAY);

    const sec = deltaSec % SECONDS_IN_MINUTE;
    const min = deltaMin % MINUTES_IN_HOUR;
    const hr = deltaHr % HOURS_IN_DAY;
    const day = deltaDay;

    this.#timeElems[0].innerText = day.toString().padStart(2, '0');
    this.#timeElems[1].innerText = hr.toString().padStart(2, '0');
    this.#timeElems[2].innerText = min.toString().padStart(2, '0');
    this.#timeElems[3].innerText = sec.toString().padStart(2, '0');

    this.#labelElems[0].innerText = day === 1 ? "day" : "days";
    this.#labelElems[1].innerText = hr === 1 ? "hr" : "hrs";
    this.#labelElems[2].innerText = min === 1 ? "min" : "mins";
    this.#labelElems[3].innerText = sec === 1 ? "sec" : "secs";
  }
}

const eventTimeMs = new Date("2024-09-07T09:00:00-07:00").getTime();
new Countdown(document.getElementsByClassName("countdown")[0], eventTimeMs);
