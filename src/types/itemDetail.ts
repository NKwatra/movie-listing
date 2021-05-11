import { Item } from "./item";

export interface Cast {
  name: string;
  profile_path: string | null;
  character: string;
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
