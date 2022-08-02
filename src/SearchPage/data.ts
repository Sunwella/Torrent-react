import axios from 'axios';
import { Tracker } from '../data';

export interface SearchItem {
    id: string
    url: string
    tracker_id: string
    title: string
    original_title: string
    poster: string
    series_count?: string
    is_favorite: string
    created_at: string
    updated_at: string
    added_to_favorites_at: string
}

export async function searchMedia (trackerId: Tracker['id'] , searchQuery: string): Promise<SearchItem[]> {
    let response = await axios.get('http://media.mkraust.ru/api/search', {
        params: {
            tracker_id: trackerId,
            search_query: searchQuery,
            offset: 0
        }
    });
    return response.data;
}