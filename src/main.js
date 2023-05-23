const search = document.getElementById('search');
const input = document.getElementById('input');
const valores = document.getElementById('valores');

const createTitle = (base) => {
  const newH2 = document.createElement('h3');
  newH2.innerHTML = `Valores referentes a 1 ${base}`;
  valores.appendChild(newH2);
};

const listElements = (obj) => {
  valores.innerHTML = '';
  createTitle(obj.base);
  const objList = Object.entries(obj.rates);
  objList.forEach((objts) => {
    console.log(objts);
    const newDiv = document.createElement('div');
    const newH3 = document.createElement('h3');
    const newP = document.createElement('p');
    [newH3.innerHTML, newP.innerHTML] = objts;
    newDiv.appendChild(newH3);
    newDiv.appendChild(newP);
    valores.appendChild(newDiv);
  });
};

search.addEventListener('click', () => {
  fetch(`https://api.exchangerate.host/latest?base=${input.value}`)
    .then((response) => response.json())
    .then((response) => listElements(response));
});
