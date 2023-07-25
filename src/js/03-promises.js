import Notiflix from 'notiflix';

const form = document.querySelector(".form");

form.addEventListener('submit', createPromises);

//ф-ція викликає ф-цію створення промісів стільки, скільки користувач вводе в поле amount 
function createPromises(e) {
  e.preventDefault();

  if (Number(form.delay.value) < 0 || Number(form.step.value) < 0 ||
    Number(form.amount.value) < 0) {
    Notiflix.Notify.failure(`❌ All values must be greater than 0`);
    return;
  }

  
  let delay = Number(form.delay.value);

  for (let i = 1; i <= form.amount.value; i += 1) {

    delay = i === 1 ? delay : delay + Number(form.step.value);

    createPromise(i, delay)
      .then(({ position, delay }) => {
        Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
        
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
      });
  }
  
};


//ф-цыя створює проміс
function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  const promiseObj = { position, delay };

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve(promiseObj);
      } else {
        reject(promiseObj);
      }
    }, delay);
  }); 
}
