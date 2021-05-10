import { Item } from "../item";
import { Data } from "./data";

export interface MovieListState extends Data {
  now_playing: Item[];
  popular: Item[];
  top_rated: Item[];
  upcoming: Item[];
}
