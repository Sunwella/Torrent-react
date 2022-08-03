import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getMedia, Media } from "./data";

import { Typography, Card, Space, Row, Col, Tag, Badge, Spin } from 'antd';
import { ImageCard } from "./ImageCard";
import { AudioOutlined, DesktopOutlined, DownloadOutlined, FileOutlined } from "@ant-design/icons";
import { DownloadModal } from "./DownloadModal";

const { Title } = Typography;


export function MediaPage() {
    const [media, setMedia] = useState<Media>();
    const [visible, setVisible] = useState(false);
    const { mediaId } = useParams();

    const fetchMediaHandler = async () => {
        const data = await getMedia(mediaId as string);
        setMedia(data);
    };

    useEffect(() => {
        fetchMediaHandler();
    }, []);

    function openModal() {
        setVisible(true);
    }

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
                            <>
                                <Card key={torrent.id} onClick={openModal}>
                                    <p><AudioOutlined /> {torrent.voice_acting}</p>
                                    <Tag color="#55acee" icon={<DesktopOutlined />}>{torrent.quality}</Tag>
                                    <Tag color="#55acee" icon={<FileOutlined />}>{torrent.size}</Tag>
                                    <Tag color="#55acee" icon={<DownloadOutlined />}>{torrent.downloads}</Tag>
                                </Card>
                                <DownloadModal torrentId={torrent.id} visible={visible} onClose={() => setVisible(false)} />
                            </>
                        ))}
                    </Space>
                </Col>
            </Row>
        </>
    );
}
