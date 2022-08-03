import axios from "axios";
import { SearchItem } from "../SearchPage/data";

export type FavoriteList = SearchItem

export async function getFavoriteList() {
    let response = await axios.get('http://media.mkraust.ru/api/favorites/list');

    return response.data;
}