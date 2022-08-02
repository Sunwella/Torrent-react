import { GlobalOutlined, StarOutlined } from "@ant-design/icons";
import { Card } from "antd";
import { Media } from "./data";

export function ImageCard({ title, poster }: Media) {
    return (
        <Card
            bordered={false}
            bodyStyle={{ padding: 0}}
            cover={<img alt={title} src={poster} />}
            actions={[
                <StarOutlined key="favorite" />,
                <GlobalOutlined key="edit" />,
            ]}
        />
    )
}