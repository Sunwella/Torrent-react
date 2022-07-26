import { Badge, Card } from "antd";
import { Link } from "react-router-dom";
import { SearchItem } from "./data";

export function MediaCard({ tracker_id, title, poster, series_count, id }: SearchItem) {
    return (
        <Link to={`/${tracker_id}/${id}`} key={id}>
            <Badge.Ribbon text={series_count}>
                <Card
                    style={{ width: 360, height:520 }}
                    cover={<img alt="poster" src={poster} style={{ maxHeight: 440 }} />}
                >
                    { title }
                </Card>
            </Badge.Ribbon> 
        </Link>
    )
}