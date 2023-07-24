
//прописати рефси (боді, на кнопки)
//створити слухача на кнопку старт 
    //в слухачі зробити кнопку страт неактивною
    //створити інтервал, який кожну секунду
    //буде міняти колір фона на боді
//створити слухача на кнопку стоп
    //у слухачі буде очищатись інтервал
    //кнопку старт зробити активною

const refs = {
  bodyEl: document.querySelector('body'),
  startBtn: document.querySelector('button[data-start]'),
  stopBtn: document.querySelector('button[data-stop]'),
};
let interval = null;

//слухач на кнопку старт: 
//1.запускає інтервал, який кожну секунду міняє колір фона body.
//2.кнопку старт робить неактивною
refs.startBtn.addEventListener('click', () => {
    interval = setInterval(changeColor, 1000);
    refs.startBtn.disabled = true;
})

//слухач на кнопку стоп очищає інтервал, кнопку старт робить активною
refs.stopBtn.addEventListener('click', () => {
    clearInterval(interval);
    refs.startBtn.disabled = false;
})
 
//метод міняю колір фона body
 function changeColor() {
    refs.bodyEl.style.backgroundColor = getRandomHexColor();
};

//метод отримує рандомний колір
function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}