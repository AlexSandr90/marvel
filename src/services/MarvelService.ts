class MarvelService {
  _apiBase = 'https://gateway.marvel.com:443/v1/public/';
  _apiKey = '0ec8aa36fb65000bb74b18cb883ebf5e';

  // apiBase = process.env.API_BASE;
  // apiKey = process.env.API_KEY;

  getResource = async (url: string) => {
    let res = await fetch(url);

    if (!res.ok) {
      throw new Error(`Could not fetch ${url}, status: ${res.status}`);
    }

    return await res.json();
  };

  getAllCharacters = async () => {
    const res = await this.getResource(
      `${this._apiBase}characters?limit=9&offset=210&apikey=${this._apiKey}`
    );

    return res.data.results.map(this._transformCharacter);
  };

  getCharacter = async (id: number) => {
    const res = await this.getResource(
      `${this._apiBase}characters/${id}?apikey=${this._apiKey}`
    );
    return await this._transformCharacter(res.data.results[0]);
  };

  _transformCharacter = (char: any) => {
    let comicsInfo = {} as { homepage: string; wiki: string };

    char.urls.forEach(({ type, url }: { type: string; url: string }) => {
      if (type === 'detail') {
        comicsInfo.homepage = url;
      }
      if (type === 'comiclink') {
        comicsInfo.wiki = url;
      }
    });

    return {
      name: char.name,
      description: char.description,
      thumbnail: `${char.thumbnail.path}.${char.thumbnail.extension}`,
      homepage: comicsInfo.homepage,
      wiki: comicsInfo.wiki,
      id: char?.id,
    };
  };
}

export default MarvelService;
