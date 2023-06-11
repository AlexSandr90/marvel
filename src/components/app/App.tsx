import CharInfo from '../charInfo/CharInfo';
import CharList from '../charList/CharList';
import Header from '../header/Header';
import RandomChar from '../randomChar/RandomChar';
import './app.scss';

import decoration from '../../assets/img/vision.png';

const App = () => {
  return (
    <div className="app">
      <Header />

      <main>
        <RandomChar />
        <div className="char__content">
          <CharList />
          <CharInfo />
        </div>
        <img className="bg-decoration" src={decoration} alt="vidion" />
      </main>
    </div>
  );
};

export default App;
