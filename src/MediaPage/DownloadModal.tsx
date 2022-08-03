import { Modal } from "antd";
import { Torrent, downloadTorrent } from "./data";

interface DownloadModalProps {
    torrentId: Torrent['id']
    visible: boolean
    onClose: () => void
}

export function DownloadModal({ torrentId, visible, onClose }: DownloadModalProps) {
    async function startDownload() {
        await downloadTorrent(torrentId);
        onClose();
    }

    return (
        <Modal
          title="Загрузка" 
          visible={visible}
          onOk={startDownload}
          okText="Загрузить"
          onCancel={onClose}
          cancelText="Отмена"
        >
            <p>Вы уверены что хотите начать загрузку выбранного торрента?</p>
        </Modal>
    )
}