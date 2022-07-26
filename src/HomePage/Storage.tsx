import { HddOutlined } from "@ant-design/icons";
import { Space } from "antd";

export interface StorageProps {
    available: string
    name: string
}

export function Storage({ available, name }: StorageProps) {
    const GB = 1073741824;
    const B = Number(available);
    let transformToGb = B/GB;

    return (
        <Space size='small' key={name}>
            <HddOutlined style={{ fontSize: 32 }} />
            <div>
                <div>{name}</div>
                <div>{transformToGb.toFixed(1)}ГБ доступно</div>
            </div>
        </Space>
    )
}