export type Character = {
  name: string;
  participatingShows: number;
  participatingVideoGames: number;
  allies: number;
  enemies: string;
};

export type CharacterKey = keyof Character;
