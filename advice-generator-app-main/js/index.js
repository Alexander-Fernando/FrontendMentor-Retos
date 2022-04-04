const urlApi = 'https://api.adviceslip.com/advice';

/*  DOOM ELEMENTS */
const button = document.querySelector('.card__cta');
const paragraph = document.querySelector('.card__paragraph');
const idSpan = document.querySelector('.card__id');

/*  EVENT LISTENER */
button.addEventListener('click', async () => {
  const quoteData = await getQuote(urlApi);
  addQuoteHtml(quoteData);
});

const getQuote = async (url) => {
  const response = await fetch(url);
  const data = await response.json();
  return data;
};

const addQuoteHtml = ({ slip: { advice, id } }) => {
  paragraph.textContent = `"${advice}"`;
  idSpan.textContent = id;
};
