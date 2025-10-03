// =========================
// Custom Datepicker Script
// =========================

// ==== DOM REFERENCES ====
// Always declare variables with const or let
const calendar = document.querySelector("#calendar_main");
const input = document.querySelector("#date");
const calHeader = document.querySelector("#calendar_header");
const calHeaderTitle = document.querySelector("#calendar_header span");
const calDays = document.querySelector("#cal_days");

// ==== CONSTANTS ====
// Days and months labels
const days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
const months = ["January","February","March","April","May","June","July","August","September","October","November","December"];

// Calculate the number of milliseconds in a day
const oneDay = 60 * 60 * 24 * 1000;

// Current day timestamp (adjusted for timezone)
const todayTimestamp = Date.now() - (Date.now() % oneDay) + new Date().getTimezoneOffset() * 60 * 1000;

// Keep track of selected day
let selectedDay = todayTimestamp;

// ==== HELPER FUNCTIONS ====

// Get number of days in a specific month
const getNumberOfDays = (year, month) => {
  return 40 - new Date(year, month, 40).getDate();
};

// Generate details for a specific day cell
const getDayDetails = (args) => {
  let date = args.index - args.firstDay;
  let day = args.index % 7;
  let prevMonth = args.month - 1;
  let prevYear = args.year;

  // Handle previous year if month < 0
  if (prevMonth < 0) {
    prevMonth = 11;
    prevYear--;
  }

  let prevMonthNumberOfDays = getNumberOfDays(prevYear, prevMonth);

  let _date = (date < 0 ? prevMonthNumberOfDays + date : date % args.numberOfDays) + 1;
  let month = date < 0 ? -1 : date >= args.numberOfDays ? 1 : 0;
  let timestamp = new Date(args.year, args.month, _date).getTime();

  return {
    date: _date,
    day,
    month,
    timestamp,
    dayString: days[day]
  };
};

// Generate an array of all days in a given month grid
const getMonthDetails = (year, month) => {
  let firstDay = new Date(year, month).getDay();
  let numberOfDays = getNumberOfDays(year, month);
  let monthArray = [];
  let rows = 6; // ⚡ changed from 5 to 6 → some months need 6 weeks
  let index = 0;
  let cols = 7;

  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      let currentDay = getDayDetails({
        index,
        numberOfDays,
        firstDay,
        year,
        month
      });
      monthArray.push(currentDay);
      index++;
    }
  }
  return monthArray;
};

// ==== STATE MANAGEMENT ====
// Current year and month
let date = new Date();
let year = date.getFullYear();
let month = date.getMonth();
let monthDetails = getMonthDetails(year, month);

// Check if a day is today
const isCurrentDay = (day, cell) => {
  if (day.timestamp === todayTimestamp) {
    cell.classList.add("active", "isCurrent");
  }
};

// Check if a day is selected
const isSelectedDay = (day, cell) => {
  if (day.timestamp === selectedDay) {
    cell.classList.add("active", "isSelected");
  }
};

// ==== HEADER ====
// Get month name
const getMonthStr = (month) => months[Math.max(Math.min(11, month), 0)] || "Month";

// Set calendar header text
const setHeader = (year, month) => {
  calHeaderTitle.innerHTML = months[month] + " " + year;
};
setHeader(year, month);

// Handle navigation arrows (previous/next month)
const setHeaderNav = (offset) => {
  month = month + offset;
  if (month === -1) {
    month = 11;
    year--;
  } else if (month === 12) {
    month = 0;
    year++;
  }
  monthDetails = getMonthDetails(year, month);
  return { year, month, monthDetails };
};

// ==== DATE STRING & INPUT ====
// Convert timestamp to readable string
const getDateStringFromTimestamp = (timestamp) => {
  let dateObject = new Date(timestamp);
  let month = dateObject.getMonth();
  let date = dateObject.getDate();
  return `${getMonthStr(month)} ${date}, ${dateObject.getFullYear()}`;
};

// Update input value
const setDateToInput = (timestamp) => {
  let dateString = getDateStringFromTimestamp(timestamp);
  input.value = dateString;
};
setDateToInput(todayTimestamp);

// ==== RENDER DAYS HEADER ====
// Add short labels for days (Su, Mo, Tu, ...)
for (let i = 0; i < days.length; i++) {
  let div = document.createElement("div");
  let span = document.createElement("span");

  div.classList.add("cell_wrapper");
  span.classList.add("cell_item");
  span.innerText = days[i].slice(0, 2);

  div.appendChild(span);
  calDays.appendChild(div);
}

// ==== RENDER CALENDAR BODY ====
// Build and render month cells
const setCalBody = (monthDetails) => {
  for (let i = 0; i < monthDetails.length; i++) {
    let div = document.createElement("div");
    let span = document.createElement("span");

    div.classList.add("cell_wrapper", "cal_date");

    // Only display current month days
    if (monthDetails[i].month === 0) {
      div.classList.add("current");
      isCurrentDay(monthDetails[i], div);
      isSelectedDay(monthDetails[i], div);

      // ⚡ Selection logic improved
      div.addEventListener("click", () => {
        // Remove previous selection
        document.querySelectorAll(".isSelected").forEach(el => {
          el.classList.remove("active", "isSelected");
        });

        // Add new selection
        selectedDay = monthDetails[i].timestamp;
        setDateToInput(selectedDay);
        div.classList.add("active", "isSelected");
      });
    }

    span.classList.add("cell_item");
    span.innerText = monthDetails[i].date;

    div.appendChild(span);
    calendar.appendChild(div);
  }
};
setCalBody(monthDetails);

// ==== UPDATE CALENDAR WHEN NAVIGATING ====
const updateCalendar = (btn) => {
  let newCal, offset;
  if (btn.classList.contains("back")) {
    offset = -1;
  } else if (btn.classList.contains("front")) {
    offset = 1;
  }
  newCal = setHeaderNav(offset);
  setHeader(newCal.year, newCal.month);
  calendar.innerHTML = "";
  setCalBody(newCal.monthDetails);
};

// Attach events to navigation buttons
document.querySelectorAll(".cal-btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    updateCalendar(btn);
  });
});

// ==== TOGGLE CALENDAR VISIBILITY ====
input.addEventListener("click", () => {
  document.querySelector('#date_picker_calendar').classList.toggle('hidden');
  document.querySelector('#date_picker_input').classList.toggle('showCal'); // ⚡ fixed toggle
  input.classList.toggle("onFocus");
});
