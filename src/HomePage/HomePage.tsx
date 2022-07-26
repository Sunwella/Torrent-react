import { useState, useCallback, useEffect } from 'react';

import { Card, Space } from 'antd';

import { getStorages, StorageItem } from './data';
import { Storage } from './Storage';

export function HomePage() {
  const [storages, setStorages] = useState<StorageItem[]>([]);

  const fetchInfoStorageHandler = useCallback(async () => {
    const data = await getStorages();
    setStorages(data);
  }, []);

  useEffect(() => {
    fetchInfoStorageHandler();
  }, [fetchInfoStorageHandler]);

  const storageItems = storages.map((storage) => {
    return (
      <Storage {...storage} />
    )
  })

  return (
    <Card title="Хранилище" style={{ width: 300 }}>
        <Space direction='vertical' size='large'>
            {storageItems}
        </Space>
    </Card>
  )
}