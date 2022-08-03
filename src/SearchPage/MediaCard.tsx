import { Card } from "antd";
import { Link } from "react-router-dom";
import { SearchItem } from "./data";

export type MediaCardProps = SearchItem

export function MediaCard({ tracker_id, title, poster, id }: MediaCardProps) {
    return (
        <Link to={`/${tracker_id}/${id}`} key={id}>
            <Card
                style={{ width: 360, height: 520 }}
                cover={<img alt={title} src={poster} style={{ maxHeight: 440, objectFit: 'cover' }} />}
            >
                { title }
            </Card>
        </Link>
    )
}