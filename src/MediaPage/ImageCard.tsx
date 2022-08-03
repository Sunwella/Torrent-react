import { GlobalOutlined, StarFilled, StarOutlined } from "@ant-design/icons";
import { Card } from "antd";
import { useState } from "react";
import { addFavorite, Media, removeFavorite } from "./data";

export type ImageCardProps = Media

export function ImageCard({ id, title, poster, is_favorite, url }: ImageCardProps) {
    const [favorite, setFavorite] = useState(is_favorite);

    async function changeFavorite(id: string, isFavorite: number) {
        if(isFavorite) {
            await removeFavorite(id);
            setFavorite(0);
        } else {
            await addFavorite(id);
            setFavorite(1);
        }
    }

    function isFavorite() {
       return !favorite 
       ? <StarOutlined key="favorite" onClick={() => changeFavorite(id, favorite)} />
       : <StarFilled key="favorite" onClick={() => changeFavorite(id, favorite)} style={{ color: '#55acee'}} />
    } 

    return (
        <Card
            bordered={false}
            bodyStyle={{ padding: 0}}
            cover={<img alt={title} src={poster} />}
            actions={[
                isFavorite(),
                <a href={url} target="_blank"><GlobalOutlined key="edit" /></a>,
            ]}
        />
    )
}