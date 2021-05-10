import { Item } from "../item";
import { Data } from "./data";

export interface HomePageState extends Data {
  items: Item[];
}
