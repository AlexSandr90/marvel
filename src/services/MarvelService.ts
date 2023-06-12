class MarvelService {
  _apiBase = 'https://gateway.marvel.com:443/v1/public/';
  _apiKey = '0ec8aa36fb65000bb74b18cb883ebf5e';

  // apiBase = process.env.API_BASE;
  // apiKey = process.env.API_KEY;

  getSource = async (url: string) => {
    let res = await fetch(url);

    if (!res.ok) {
      throw new Error(`Could not fetch ${url}, status: ${res.status}`);
    }

    return await res.json();
  };

  getAllCharacters = () => {
    return this.getSource(
      `${this._apiBase}characters?limit=9&offset=210&apikey=${this._apiKey}`
    );
    // return this.getSource(
    //   `https://gateway.marvel.com:443/v1/public/characters?apikey=0ec8aa36fb65000bb74b18cb883ebf5e`
    // );
  };

  getCharacter = (id: number) => {
    return this.getSource(
      `${this._apiBase}characters/${id}?apikey=${this._apiKey}`
    );
  };
}

export default MarvelService;
