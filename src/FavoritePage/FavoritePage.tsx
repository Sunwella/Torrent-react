import { Badge, Space, Spin, Typography } from "antd";
import { useEffect, useState } from "react";
import { MediaCard } from "../SearchPage/MediaCard";
import { FavoriteList, getFavoriteList } from "./data";

const { Title } = Typography;

export function FavoritePage() {
    const [favoritesList, setFavoritesList] = useState<FavoriteList[]>([]);

    const fetchFavoriteListHandler = async () => {
        const data = await getFavoriteList();
        setFavoritesList(data);
    }

    useEffect(() => {
        fetchFavoriteListHandler();
    }, [])

    if(!favoritesList) return <Spin size="large" />;
    
    return (
        <>
            <Title>Избранное</Title>
            { favoritesList.length > 0 &&
                <Space size='middle' style={{ display: 'flex', justifyContent: 'space-between' }} wrap>
                    { favoritesList.map(favorite => (
                        <>
                            { favorite.series_count
                                ? <Badge.Ribbon text={favorite.series_count}>
                                    <MediaCard key={favorite.id} {...favorite} />
                                </Badge.Ribbon>
                                : <MediaCard key={favorite.id} {...favorite} />
                            }
                        </>
                    ))}
                    
                </Space>
            }
            
        </>
    )
}