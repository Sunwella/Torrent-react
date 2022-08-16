import axios from "axios";
import { Media, Torrent } from "../MediaPage/data";



export interface DownloadList {
    hash: string
    name: string
    download_speed_in_bytes_per_second: string
    estimate_in_seconds: string
    size_in_bytes: string
    state_original: string
    progress: string
    media: Media
    torrent: Torrent
}

export async function getDownloadList() {
    let response = await axios.get('http://media.mkraust.ru/api/download/list');
    
    return response.data;
}


export async function pauseDownload(hash: DownloadList['hash']) {
    return await axios.post('http://media.mkraust.ru/api/download/pause', { hash });
}

export async function resumeDownload(hash: DownloadList['hash']) {
    return await axios.post('http://media.mkraust.ru/api/download/resume', { hash });
}

export async function deleteDownload(hash: DownloadList['hash']) {
    return await axios.post('http://media.mkraust.ru/api/download/delete', { hash });
}

