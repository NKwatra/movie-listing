export type ItemCardProps = {
  /** a reference id for movie/show */
  id: number;
  /** relative path of poster */
  poster_path: string | null;
  /** release date for movie  */
  release_date: string | undefined;
  /** overview description of movie/show */
  overview: string;
  /** average rating on a scale of 10 */
  vote_average: number;
  /** date of airing of first episode for show */
  first_air_date: string | undefined;
  /** callback executed when the card for movie/show is clicked */
  onClick: () => void;
};
