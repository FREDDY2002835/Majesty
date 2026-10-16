import { useState, useEffect } from "react";
import { avatarSrc } from "../api";

// Shows the photo; if it is missing/broken, falls back to the first letter
export default function Avatar({ src, name }) {
  const [failed, setFailed] = useState(false);
  const url = avatarSrc(src);
  useEffect(() => setFailed(false), [src]);
  if (!url || failed) return <>{name?.charAt(0).toUpperCase()}</>;
  return (
    <img
      src={url}
      alt=""
      onError={() => setFailed(true)}
      style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
    />
  );
}
