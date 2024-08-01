import { FC } from "react";

import { MdOutlineAdminPanelSettings } from "react-icons/md";

import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import Typography from "./ui/typography";

import { Channel, User } from "@/types/app";

type ChatItemProps = {
  id: string;
  content: string | null;
  user: User;
  timestamp: string;
  filrUrl: string | null;
  deleted: boolean;
  currentUser: User;
  isUpdated: boolean;
  socketUrl: string;
  socketQuery: Record<string, string>;
  channelData?: Channel;
};

const ChatItem: FC<ChatItemProps> = ({
  content,
  currentUser,
  deleted,
  id,
  isUpdated,
  socketQuery,
  socketUrl,
  timestamp,
  user,
  channelData,
  filrUrl,
}) => {
  return (
    <div className="relative group flex items-center hover:bg-black/5 px-1 py-2 rounded transition w-full">
      <div className="flex gap-x-2">
        <div className="cursor-pointer hover:drop-shadow-md transition">
          <Avatar>
            <AvatarImage
              src={user.avatar_url}
              alt={user.name ?? user.email}
              className="object-cover w-full h-full"
            />
            <AvatarFallback className="bg-neutral-700">
              <Typography variant="p" text={user.name?.slice(0, 2) ?? "UN"} />
            </AvatarFallback>
          </Avatar>
        </div>
        <div className="flex flex-col w-full">
          <div className="flex items-center gap-x-2">
            <Typography
              variant="p"
              text={user.name ?? user.email}
              className="font-semibold text-sm hover:underline cursor-pointer"
            />
            <MdOutlineAdminPanelSettings className="w-5 h-5" />
            <span className="text-xs">(edited)</span>
            <span>{timestamp}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatItem;
