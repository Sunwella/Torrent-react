import { ClockCircleOutlined, DashboardOutlined, DeleteOutlined } from "@ant-design/icons";
import { Card, Popconfirm, Progress, Space, Switch, Typography } from "antd";
import { useEffect, useState } from "react";
import { DownloadList, getDownloadList, pauseDownload, resumeDownload, deleteDownload } from "./data";


const { Title, Text } = Typography;

export function DownloadPage() {
    const [downloadsList, setDownloadsList] = useState<DownloadList[]>([]);

    const fetchDownloadHandler = async () => {
        const data = await  getDownloadList();
        setDownloadsList(data);
    };

    useEffect(() => {
        fetchDownloadHandler();
        let interval = setInterval(() => fetchDownloadHandler(), 1500);
        
        return () => {
            clearInterval(interval);
        }
    }, []);

    async function onChange(state: DownloadList['state_original'], hash: DownloadList['hash']) {
        if(state !== 'pausedDL') {
            await pauseDownload(hash);
        } else {
            await resumeDownload(hash);
        }
    }

    function checkedSwitch(state: DownloadList['state_original']) {
        return state !== 'pausedDL';
    }

    async function deleteFile(hash: DownloadList['hash']) {
        await deleteDownload(hash);
    }

    function formatBytes(speed: DownloadList['download_speed_in_bytes_per_second'], decimals = 2) {
        const bytes = Number(speed);
        if (bytes === 0) return '0 B/s';
    
        const k = 1024;
        const dm = decimals < 0 ? 0 : decimals;
        const sizes = ['B/s', 'KB/s', 'MB/s', 'GB/s', 'TB/s', 'PB/s', 'EB/s', 'ZB/s', 'YB/s'];
    
        const i = Math.floor(Math.log(bytes) / Math.log(k));
    
        return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
    }

    function formatSeconds(seconds: DownloadList['estimate_in_seconds']) {
        const secondsNum = Number(seconds);
        if(secondsNum  === 8640000) {
            return '∞';
        } else if (secondsNum < 3600) {
            const hm = new Date(secondsNum * 1000).toISOString().substring(14, 19);
            const arr = hm.split(':');
            return arr[0] + ' мин ' + arr[1] + ' сек';
        } else {
            const ms = new Date(secondsNum * 1000).toISOString().substring(11, 16);
            const arr = ms.split(':');
            return arr[0] + ' ч ' + arr[1] + ' мин';
        }
    }
    

    return (
        <>
            <Title>Загрузки</Title>
                <Space size='middle' direction='vertical' style={{ width: '100%' }}>
                    { downloadsList.map(download => (
                        <Card key={download.name} title={download.media.title}>
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16 }}>
                                <Switch 
                                    defaultChecked 
                                    onChange={() => onChange(download.state_original, download.hash)}
                                    checked={checkedSwitch(download.state_original)}
                                />
                                <Text type='secondary'>{download.torrent.quality}</Text>
                                <DashboardOutlined style={{ fontSize: 24, color: '#55acee'}} />
                                {formatBytes(download.download_speed_in_bytes_per_second)}
                                <ClockCircleOutlined style={{ fontSize: 24, color: '#55acee'}} />
                                {formatSeconds(download.estimate_in_seconds)}
                                <Progress 
                                    percent={Number(download.progress) * 100} 
                                    strokeWidth={16} 
                                    style={{ flex: 1 }}
                                    showInfo={false}
                                />
                                <Popconfirm
                                    placement="topRight"
                                    title='Удалить загружаемый файл?'
                                    onConfirm={() => deleteFile(download.hash)}
                                    okText="Да"
                                    cancelText="Нет"
                                >
                                    <DeleteOutlined style={{ fontSize: 24, color: 'red'}} />
                                </Popconfirm>
                            </div>
                        </Card>
                    ))}
                </Space>
        </>
    )
}