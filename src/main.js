import Swal from 'sweetalert2';

const search = document.getElementById('search');
const input = document.getElementById('input');
const valores = document.getElementById('valores');
const valoresContainer = document.getElementById('valores-container');

const testValues = (base) => {
  if (input.value === '') {
    // Swal.fire('Ops...', 'Você precisa passar uma moeda!', 'error');
    throw new Error('Você precisa passar uma moeda!');
  }
  if (input.value !== base) {
    // Swal.fire('Ops...', 'Moeda não existente!', 'error');
    throw new Error('Moeda não existente!');
  }
};

const createTitle = (base) => {
  const newH2 = document.createElement('h2');
  newH2.innerHTML = `Valores referentes a 1 ${base}`;
  valores.prepend(newH2);
};

const listElements = (obj) => {
  testValues(obj.base);
  valoresContainer.innerHTML = '';

  const objList = Object.entries(obj.rates);
  objList.forEach((objts) => {
    const newDiv = document.createElement('div');
    const newH3 = document.createElement('h3');
    const newP = document.createElement('p');
    [newH3.innerHTML, newP.innerHTML] = objts;
    newP.innerHTML = objts[1].toFixed(2);
    newDiv.appendChild(newH3);
    newDiv.appendChild(newP);
    valoresContainer.appendChild(newDiv);
  });
  createTitle(obj.base);
};

search.addEventListener('click', () => {
  fetch(`https://api.exchangerate.host/latest?base=${input.value}`)
    .then((response) => response.json())
    .then((response) => listElements(response))
    .catch((error) => {
      Swal.fire('OPS...', `${error.message}`, 'error');
    });
});
