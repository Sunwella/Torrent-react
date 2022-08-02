import { GlobalOutlined, StarOutlined } from "@ant-design/icons";
import { Card } from "antd";
import { addFavorite, Media, removeFavorite } from "./data";

export function ImageCard({ id, title, poster, is_favorite }: Media) {

    async function changeFavorite(id: string, isFavorite: number) {
        if(isFavorite) {
            await removeFavorite(id);
        } else {
            await addFavorite(id);
        }
    }

    return (
        <Card
            bordered={false}
            bodyStyle={{ padding: 0}}
            cover={<img alt={title} src={poster} />}
            actions={[
                <StarOutlined key="favorite" onClick={() => changeFavorite(id, is_favorite)} />,
                <GlobalOutlined key="edit" />,
            ]}
        />
    )
}