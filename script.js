const hourEl = document.querySelector(".hour");
const minuteEl = document.querySelector(".minute");
const secondsEl = document.querySelector(".second");
const toggler = document.querySelector(".toggle");
const timeEl = document.querySelector(".time");
const dateEl = document.querySelector(".date");
const body = document.querySelector("html");
const quote = document.querySelector("#quote");
const quoteTime = document.querySelector("#quoteTime");
const author = document.querySelector("#author");

// toggler.addEventListener("click", () => {

//   if (body.classList.contains("dark")) {
//     body.classList.remove("dark");
//   } else {
//     body.classList.add("dark");
//     toggler.innerHTML = 'Light Mode'
//   }
// });

toggler.addEventListener("click", () => {
  body.classList.toggle("dark");
  if (body.classList.contains("dark")) {
    toggler.innerHTML = "revert";
  } else {
    toggler.innerHTML = "change Tone";
  }
});

const days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
const months = [
  "JAN",
  "FEB",
  "MAR",
  "APR",
  "MAY",
  "JUN",
  "JUL",
  "AUG",
  "SEP",
  "OCT",
  "NOV",
  "DEC",
];

const setTime = () => {
  const time = new Date();
  const hour = time.getHours();
  const minute = time.getMinutes();
  const hour12 = hour % 12;
  const seconds = time.getSeconds();
  const day = time.getDay();
  const date = time.getDate();
  const month = time.getMonth();
  const amPm = hour >= 12 ? "PM" : "AM";

  hourEl.style.transform = `translate(-50%, -100%) rotate(${scale(
    hour12,
    0,
    11,
    0,
    360
  )}deg)`;
  minuteEl.style.transform = `translate(-50%, -100%) rotate(${scale(
    minute,
    0,
    59,
    0,
    360
  )}deg)`;
  secondsEl.style.transform = `translate(-50%, -100%) rotate(${scale(
    seconds,
    0,
    59,
    0,
    360
  )}deg)`;

  timeEl.innerHTML = `${hour12} : ${
    minute < 10 ? `0${minute}` : minute
  } ${amPm}`;
  dateEl.innerHTML = `${days[day]}, ${months[month]} <span class= 'circle'>${date}</span>`;
  quoteTime.innerHTML = `${hour12 + 1} : ${
    minute < 10 ? `0${minute}` : minute
  } ${amPm}`;
};

function scale(number, inMin, inMax, outMin, outMax) {
  return ((number - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin;
}

setTime();

setInterval(setTime, 1000);

getQuote();

async function getQuote() {
  // fetch("https://quotes15.p.rapidapi.com/quotes/random/", {
  //   method: "GET",
  //   headers: {
  //     "x-rapidapi-key": "b5955c940amsh9ba067ff07dbc5ap17f2abjsn2acd75e2d6af",
  //     "x-rapidapi-host": "quotes15.p.rapidapi.com",
  //   },
  // })
  //   .then((response) => {
  //     console.log(response);
  //   })
  //   .catch((err) => {
  //     console.error(err);
  //   });

  let config = {
    method: "GET",
    headers: {
      "x-rapidapi-key": "b5955c940amsh9ba067ff07dbc5ap17f2abjsn2acd75e2d6af",
      "x-rapidapi-host": "quotes15.p.rapidapi.com",
      Accept: "application/JSON",
    },
  };
  const resp = await fetch(
    "https://quotes15.p.rapidapi.com/quotes/random/",
    config
  );
  const data = await resp.json();
  quote.innerHTML = data.content;
  author.innerHTML = `   ${data.originator.name}`;
}
setInterval(getQuote, 3600000);
