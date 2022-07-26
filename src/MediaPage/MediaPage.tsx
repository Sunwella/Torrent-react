import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getMedia, Media } from "./data";

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

    return (
        <p>{media?.id}</p>
    );
}
