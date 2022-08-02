import { Badge, Card } from "antd";
import { Link } from "react-router-dom";
import { SearchItem } from "./data";

export function MediaCard({ tracker_id, title, poster, series_count, id }: SearchItem) {
    return (
        <Link to={`/${tracker_id}/${id}`} key={id}>
            {series_count !== null
                ? <Badge.Ribbon text={series_count}>
                    <Card
                        style={{ width: 360, height: "fit-content" }}
                        cover={<img alt={title} src={poster} style={{ maxHeight: 440 }} />}
                    >
                        { title }
                    </Card>
                </Badge.Ribbon> 
                : <Card
                    style={{ width: 360, height: 'fit-content' }}
                    cover={<img alt={title} src={poster} style={{ maxHeight: 440 }} />}
                >
                    { title }
                </Card>
            }
            
        </Link>
    )
}