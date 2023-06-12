import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app/App';
import MarvelService from './services/MarvelService';
import './assets/styles/style.scss';

const marvelService = new MarvelService();
const apiBase = process.env.API_BASE;
const apiKey = process.env.API_KEY;

console.log(apiBase, apiKey);

marvelService
  .getAllCharacters()
  .then((res) =>
    res.data.results.forEach((element: any) => {
      console.log(element.name);
    })
  )
  .catch((error) => console.error(error));

marvelService
  .getCharacter(1011052)
  .then((res) => console.log(res.data.results))
  .catch((error) => console.error(error));

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
