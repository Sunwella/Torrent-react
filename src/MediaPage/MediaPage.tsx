import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getMedia, Media } from "./data";

import { Typography, Image, Card, Space, Row, Col, Tag } from 'antd';

const { Title } = Typography;


export function MediaPage() {
    const [media, setMedia] = useState<Media>();
    const { trackerId, mediaId } = useParams();

    const fetchMediaHandler = async () => {
        const data = await getMedia(mediaId as string);
        setMedia(data);
    };

    useEffect(() => {
        fetchMediaHandler();
    }, []);

    return (
        <>
            <Title>{media?.title}</Title>
            <Row>
                <Col flex={1}>
                    <Image src={media?.poster} />
                </Col>
                <Col flex={3}>
                    <Space size='middle' direction='vertical' style={{ width: '100%'}}>
                        {media?.torrents.map(torrent => (
                            <Card key={torrent.id}>
                                <p>{torrent.voice_acting}</p>
                                <Tag color="#55acee">{torrent.quality}</Tag>
                                <Tag color="#55acee">{torrent.size}</Tag>
                            </Card>
                        ))}
                    </Space>
                </Col>
            </Row>
        </>
    );
}
