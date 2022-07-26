import axios from 'axios';

export interface StorageItem {
    name: string
    available: string
    total: string
    used: string
    usage_percent: string
}

export async function getStorages(): Promise<StorageItem[]> {
    let response = await axios.get('http://media.mkraust.ru/api/info/storage');
    return response.data;
}