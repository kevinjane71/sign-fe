import React, { useEffect, useState } from 'react';

export default function SecureImage({ src, alt, ...props }) {
  const [blobUrl, setBlobUrl] = useState(null);

  useEffect(() => {
    let isMounted = true;
    const fetchImage = async () => {
      setBlobUrl(null);
      try {
        const token = JSON.parse(localStorage.getItem('user'))?.accessToken;
        const res = await fetch(src, {
          headers: { Authorization: `Bearer ${token}` }
        });
        if (!res.ok) throw new Error('Image fetch failed');
        const blob = await res.blob();
        if (isMounted) setBlobUrl(URL.createObjectURL(blob));
      } catch (e) {
        if (isMounted) setBlobUrl(null);
      }
    };
    if (src) fetchImage();
    return () => { isMounted = false; if (blobUrl) URL.revokeObjectURL(blobUrl); };
    // eslint-disable-next-line
  }, [src]);

  if (!blobUrl) return <div style={{width: '100%', height: '100%', background: '#f3f3f3'}} />;
  return <img src={blobUrl} alt={alt} {...props} />;
} 