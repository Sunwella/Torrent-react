import axios from 'axios';
import { SearchItem } from '../SearchPage/data';

export interface Torrent {
    id: number
    name: string
    url: string
    content_type: string
    voice_acting: string
    quality: string
    size: string
    media_id: string
    season: number[] | string[]
    downloads: number
}

export interface Media {
    id: string
    name: string
    url: string
    tracker_id: string
    title: string
    original_title: string
    poster: string
    series_count?: string
    is_favorite: number
    created_at: string
    updated_at: string
    added_to_favorites_at: string
    torrents: Torrent[]

}


export async function getMedia(mediaId: SearchItem['id']): Promise<Media> {
    let response = await axios.get('http://media.mkraust.ru/api/media', {
        params: {
            id: mediaId,
        }
    });

    return response.data;
}

export async function addFavorite(id: SearchItem['id']) {
     await axios.post('http://media.mkraust.ru/api/favorites/add', {id});
}

export async function removeFavorite(id: SearchItem['id']) {
    await axios.post('http://media.mkraust.ru/api/favorites/remove', {id});
}