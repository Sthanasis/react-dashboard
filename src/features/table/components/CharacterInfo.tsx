import { CharacterPreview } from '@/types/characterPreview';

interface CharacterInfoProps {
  character: CharacterPreview;
  showTitle: string;
  videoGameTitle: string;
  emptyMessage: string;
}

const CharacterInfo = ({
  character,
  showTitle,
  videoGameTitle,
  emptyMessage,
}: CharacterInfoProps) => (
  <section className="grid grid-cols-2 gap-2">
    <div className="flex flex-col items-center col-span-2 gap-2">
      <span className="text-lg w-full text-center font-bold flex justify-center">
        <p className="m-auto">{character.name}</p>
      </span>
      <img
        className="rounded-full size-48 p-1 border-2 border-primary overflow-hidden"
        src={character.image}
        alt={`${character.name}portrait`}
      />
    </div>
    <div>
      <h1 className="text-sm text-center font-bold">{showTitle}</h1>
      {character.tvShows.length > 0 ? (
        <ul>
          {character.tvShows.map((show) => (
            <li key={show}>{show}</li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-400 text-center">{emptyMessage}</p>
      )}
    </div>
    <div>
      <h1 className="text-sm text-center font-bold">{videoGameTitle}</h1>
      {character.videoGames.length > 0 ? (
        <ul className="flex flex-col gap-1">
          {character.videoGames.map((game) => (
            <li key={game}>{game}</li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-400 text-center">{emptyMessage}</p>
      )}
    </div>
  </section>
);

export default CharacterInfo;
