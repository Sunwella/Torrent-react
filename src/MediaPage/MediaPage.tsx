import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getMedia, Media } from "./data";

import { Typography, Card, Space, Row, Col, Tag, Badge, Spin } from 'antd';
import { ImageCard } from "./ImageCard";
import { AudioOutlined, DesktopOutlined, DownloadOutlined, FileOutlined } from "@ant-design/icons";

const { Title } = Typography;


export function MediaPage() {
    const [media, setMedia] = useState<Media>();
    const { mediaId } = useParams();

    const fetchMediaHandler = async () => {
        const data = await getMedia(mediaId as string);
        setMedia(data);
    };

    useEffect(() => {
        fetchMediaHandler();
    }, []);

    if (!media) return <Spin size="large" />;

    return (
        <>
            <Title>{media.title}</Title>
            <Row gutter={[48, 0]}>
                <Col span={9}>
                {media.series_count
                    ? <Badge.Ribbon text={media.series_count}>
                        <ImageCard {...media} />
                    </Badge.Ribbon>
                    : <ImageCard {...media} />
                }
                </Col>
                <Col span={15}>
                    <Space size='middle' direction='vertical' style={{ width: '100%'}}>
                        {media.torrents.map(torrent => (
                            <Card title={media.name} key={torrent.id}>
                                <p><AudioOutlined /> {torrent.voice_acting}</p>
                                <Tag color="#55acee"> <DesktopOutlined /> {torrent.quality}</Tag>
                                <Tag color="#55acee"><FileOutlined /> {torrent.size}</Tag>
                                <Tag color="#55acee"><DownloadOutlined /> {torrent.downloads}</Tag>
                            </Card>
                        ))}
                    </Space>
                </Col>
            </Row>
        </>
    );
}
