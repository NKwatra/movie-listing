import { Item } from "./item";

export interface Cast {
  /** real name of actor/actress */
  name: string;
  /** relative path for profile image */
  profile_path: string | null;
  /** character played in the movie/show */
  character: string;
  /** a reference id for this person */
  id: number;
}

export interface ItemDetail extends Omit<Item, "media_type"> {
  genres: { name: string }[];
  runtime: number | undefined;
  episode_run_time: number[];
  title: string | undefined;
  name: string | undefined;
  tagline: string;
  cast: Cast[];
}
