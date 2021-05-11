import { Item } from "../item";
import { Data } from "./data";

export interface TVShowsListState extends Data {
  on_the_air: Item[];
  popular: Item[];
  top_rated: Item[];
}
