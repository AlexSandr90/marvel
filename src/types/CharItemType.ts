export type CharItemType = {
  name: string;
  description: string;
  thumbnail: string;
  homepage: string;
  wiki: string;
  id?: string;
  comics?: { resourceURI: string; name: string }[];
};
