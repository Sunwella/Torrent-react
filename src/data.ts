import axios from 'axios';

export interface Tracker {
    id: string
    icon: string
    title: string
}

export async function getTrackers(): Promise<Tracker[]> {
    let response = await axios.get('http://media.mkraust.ru/api/trackers');

	return response.data;
}
