import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const refs = {
  inputCalendar: document.querySelector('input#datetime-picker'),
  startBtn: document.querySelector('button[data-start]'),
  days: document.querySelector('.timer [data-days]'),
  hours: document.querySelector('.timer [data-hours]'),
  minutes: document.querySelector('.timer [data-minutes]'),
  seconds: document.querySelector('.timer [data-seconds]'),
  reset: document.querySelector('button[data-reset]'),
};

//робимо кнопку start одразу неактивною
refs.startBtn.disabled = true; //кнопку старт робимо неактивною
refs.reset.disabled = true;   //кнопку reset робимо неактивною
let futureData = null;         //вибрана дата в календарі в мілісекундах
let timerId = null;            //таймер 


const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
      futureData = selectedDates[0].getTime();
      checkData(selectedDates[0]);      
  },
};

// const flatpickr = require('flatpickr');
flatpickr('input[type="text"]', options);

//при клікі на кнопку запускаємо таймер, який кожну секунду
//запускає ф-цію, яка рахує, скільки часу залишилось
refs.startBtn.addEventListener('click', () => {
  timerId = setInterval(countdown, 1000);
  refs.startBtn.disabled = true;
  refs.inputCalendar.disabled = true;
  refs.reset.disabled = false; //кнопку reset робимо активною
})

//ф-ція рахує, скільки залишилось часу (різниця між датою в календарі та поточною датою) в мілісекундах
//переводе мілісекунди в дні, години, хвилини, секунди 
//записує ці дані у відповідні рефси
function countdown() {
  const differentCurrentTime = convertMs(futureData - Date.now()); 
  
  let days = addLeadingZero(differentCurrentTime.days);
  let hours = addLeadingZero(differentCurrentTime.hours);
  let minutes = addLeadingZero(differentCurrentTime.minutes);
  let seconds = addLeadingZero(differentCurrentTime.seconds);

  if (days === "00" && hours === "00"
      && minutes === "00" && seconds === "00") {
    clearTimeout(timerId);    

    refs.reset.disabled = true;
    refs.inputCalendar.disabled = false;
 }
  
  refs.days.textContent = days;
  refs.hours.textContent = hours;
  refs.minutes.textContent = minutes;
  refs.seconds.textContent = seconds;
}

//якщо значення дати та часу введенні меньші або рівні за поточні, 
//то виводимо повідомлення та блокуємо кнопку start
function checkData(data) {
  if (timerId != null) {
    clearDataRefs(); //якщо є дані, очищаємо і якщо запущений таймер - зупиняємо
  } 
  
  if (data <= Date.now()) {
      Notiflix.Notify.failure('Please choose a date in the future');
      refs.startBtn.disabled = true;
    } else {
        refs.startBtn.disabled = false;
    }
}

//ф-ція очищає дані (дні, години, хвилини, секунди).
//Потрібна, коли користувач перевибирає календар
function clearDataRefs() {
  clearTimeout(timerId);
  refs.days.textContent = "00";
  refs.hours.textContent = "00";
  refs.minutes.textContent = "00";
  refs.seconds.textContent = "00";
}

//ф-ція переводить мілісекунди в дні, години, хвилини, секунди
function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

//============для кнопки reset============

refs.reset.addEventListener('click', dataReset);

function dataReset() {
  clearTimeout(timerId);
  refs.inputCalendar.textContent = "";

  refs.days.textContent = '00';
  refs.hours.textContent = '00';
  refs.minutes.textContent = '00';
  refs.seconds.textContent = '00';

  refs.reset.disabled = true;
  refs.inputCalendar.disabled = false;
}