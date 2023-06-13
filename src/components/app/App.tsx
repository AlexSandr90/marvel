import CharInfo from '../charInfo/CharInfo';
import CharList from '../charList/CharList';
import Header from '../header/Header';
import RandomChar from '../randomChar/RandomChar';
import './app.scss';

import decoration from '../../assets/img/vision.png';
import { useState } from 'react';

const App = () => {
  const [selectedChar, setSelectedChar] = useState<string | number>('');

  const onChartSelected = (id: string | number) => {
    setSelectedChar(id);
  };

  return (
    <div className="app">
      <Header />

      <main>
        <RandomChar />
        <div className="char__content">
          <CharList onChartSelected={onChartSelected} />
          <CharInfo char={selectedChar} />
        </div>
        <img className="bg-decoration" src={decoration} alt="vidion" />
      </main>
    </div>
  );
};

export default App;
