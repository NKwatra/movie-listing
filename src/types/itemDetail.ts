import { Item } from "./item";

export interface ItemDetail extends Omit<Item, "media_type"> {
  genres: { name: string }[];
  runtime: number | undefined;
  episode_run_time: number[];
  title: string | undefined;
  name: string | undefined;
  tagline: string;
}
