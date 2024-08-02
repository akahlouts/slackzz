import { FC, useEffect, useState } from "react";

import DotAnimatedLoader from "./dot-animated-loader";

import {
  LiveKitRoom,
  RoomAudioRenderer,
  VideoConference,
} from "@livekit/components-react";
import "@livekit/components-styles";

import { User } from "@/types/app";

type VideoChatProps = {
  chatId: string;
  userData: User;
};

const VideoChat: FC<VideoChatProps> = ({ chatId, userData }) => {
  const [token, setToken] = useState<string>("");

  useEffect(() => {
    const name = userData.name ?? userData.email;

    (async () => {
      try {
        const resp = await fetch(
          `/api/livekit?room=${chatId}&username=${name}`
        );
        const data = await resp.json();
        setToken(data.token);
      } catch (e) {
        console.error(e);
      }
    })();
  }, [chatId, userData.email, userData.name]);

  if (token === "") return <DotAnimatedLoader />;

  return (
    <LiveKitRoom
      video={true}
      audio={true}
      token={token}
      connect={true}
      serverUrl={process.env.NEXT_PUBLIC_LIVEKIT_URL}
      data-lk-theme="default"
    >
      <VideoConference />
      <RoomAudioRenderer />
    </LiveKitRoom>
  );
};

export default VideoChat;
