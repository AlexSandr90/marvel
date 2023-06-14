import CharInfo from '../charInfo/CharInfo';
import CharList from '../charList/CharList';
import Header from '../header/Header';
import RandomChar from '../randomChar/RandomChar';
import './app.scss';

import decoration from '../../assets/img/vision.png';
import { useState } from 'react';
import ErrorBoundary from '../errorBoundary/ErrorBoundary';

const App = () => {
  const [selectedChar, setSelectedChar] = useState<number | null>(null);

  const onChartSelected = (id: number) => {
    setSelectedChar(id);
  };

  return (
    <div className="app">
      <Header />

      <main>
        <ErrorBoundary>
          <RandomChar />
        </ErrorBoundary>
        <div className="char__content">
          <ErrorBoundary>
            <CharList onChartSelected={onChartSelected} />
          </ErrorBoundary>
          <ErrorBoundary>
            <CharInfo charId={selectedChar} />
          </ErrorBoundary>
        </div>
        <img className="bg-decoration" src={decoration} alt="vidion" />
      </main>
    </div>
  );
};

export default App;
