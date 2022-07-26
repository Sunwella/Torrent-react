import axios from 'axios';
import { SearchItem } from '../SearchPage/data';

export interface Media {
    id: string
    url: string
    tracker_id: string
    title: string
    original_title: string
    poster: string
    series_count: string
    is_favorite: string
    created_at: string
    updated_at: string
    added_to_favorites_at: string
}

export async function getMedia(mediaId: SearchItem['id']): Promise<Media> {
    let response = await axios.get('http://media.mkraust.ru/api/media', {
        params: {
            id: mediaId,
        }
    });

    return response.data;
}