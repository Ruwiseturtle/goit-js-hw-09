import Notiflix from 'notiflix';

const form = document.querySelector(".form");

form.addEventListener('submit', createPromises);

function createPromises(e) {
  e.preventDefault();
  const delay = Number(form.delay);

  for (let i = 1; i <= form.amount.value; i += 1) {
    
    createPromise(i, delay)
      .then(({ position, delay }) => {
        Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
        
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
      });
  }
  
};



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
