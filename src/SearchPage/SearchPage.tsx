import { Card, Input, Space, Tabs, Badge, Empty } from "antd";
import { Tracker } from "../data";
import { MediaCard } from "./MediaCard";
import { SearchItem, searchMedia } from "./data";
import { useState } from "react";
import { useTrackers } from "../context/trackers";

const { TabPane } = Tabs;
const { Search } = Input;


export function SearchPage() {
    const trackers = useTrackers();
    const [currentTracker, setCurrentTracker] = useState('anidub');
    const [searchingResults, setSearchingResults] = useState<Record<Tracker['id'], SearchItem[]>>({});
    
    async function onSearch(trackerId: Tracker['id'], value: string) {
        let searchQuery = value;
        const data = await searchMedia(trackerId, searchQuery);
        setSearchingResults({ ...searchingResults, [trackerId]: data });
    };

    return (
        <Space direction="vertical" size="middle" style={{ display: 'flex' }}>
            <Tabs activeKey={currentTracker} onChange={setCurrentTracker}>
                {trackers.map((tracker) => (
                    <TabPane tab={tracker.title} key={tracker.id} />
                ))}
            </Tabs>
            <Search 
                placeholder="Введите название" 
                onSearch={(val) => onSearch(currentTracker, val)} 
                size='large' 
                enterButton 
                allowClear 
            />
            { currentTracker in searchingResults && searchingResults[currentTracker].length > 0 
                ?   <Space size='middle' style={{ display: 'flex', justifyContent: 'space-between' }} wrap>
                        { searchingResults[currentTracker].map((media) => (
                            <Badge.Ribbon text={media.series_count}>
                                <MediaCard key={media.id} {...media} />
                            </Badge.Ribbon>
                        ))}
                    </Space>
                :   <Empty description='Файлы не найдены' />
            }
        </Space>
    )
}