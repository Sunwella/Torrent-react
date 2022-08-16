import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { downloadTorrent, getMedia, Media, Torrent } from "./data";

import { Typography, Card, Space, Row, Col, Tag, Badge, Spin, Popconfirm } from 'antd';
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

    async function startDownload(torrentId: Torrent['id']) {
        await downloadTorrent(torrentId);
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
                            <Popconfirm
                                placement="top"
                                title='Начать загрузку файла?'
                                onConfirm={() => startDownload(torrent.id)}
                                okText="Да"
                                cancelText="Нет"
                            >
                                <Card hoverable key={torrent.id}>
                                    <p><AudioOutlined /> {torrent.voice_acting}</p>
                                    <Tag color="#55acee" icon={<DesktopOutlined />}>{torrent.quality}</Tag>
                                    <Tag color="#55acee" icon={<FileOutlined />}>{torrent.size}</Tag>
                                    <Tag color="#55acee" icon={<DownloadOutlined />}>{torrent.downloads}</Tag>
                                </Card>
                                
                            </Popconfirm>
                        ))}
                    </Space>
                </Col>
            </Row>
        </>
    );
}
