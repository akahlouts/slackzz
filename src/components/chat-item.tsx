import { FC } from "react";
import Link from "next/link";
import Image from "next/image";

import { MdOutlineAdminPanelSettings } from "react-icons/md";

import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import Typography from "./ui/typography";

import { Channel, User } from "@/types/app";
import { useChatFile } from "@/hooks/use-chat-file";

type ChatItemProps = {
  id: string;
  content: string | null;
  user: User;
  timestamp: string;
  fileUrl: string | null;
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
  fileUrl,
}) => {
  const { publicUrl, fileType } = useChatFile(fileUrl!);

  const isSuperAdmin = currentUser.id === channelData?.user_id;
  const isRegulator =
    channelData?.regulators?.includes(currentUser.id) ?? false;
  const isOwner = currentUser.id === user.id;
  const canDeleteMessage = !deleted && (isOwner || isSuperAdmin || isRegulator);
  const canEditMessage = !deleted && isOwner && !fileUrl;
  const isPdf = fileType === "pdf" && fileUrl;
  const isImage = fileType === "image" && fileUrl;
  // const isLoading =

  const FilePreview = () => (
    <>
      {isImage && (
        <Link
          href={publicUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="relative aspect-square rounded-md mt-2 overflow-hidden border flex items-center bg-secondary h-28 w-48"
        >
          <Image
            src={publicUrl}
            alt={content ?? ""}
            fill
            className="object-cover"
          />
        </Link>
      )}
      {isPdf && (
        <div className="flex flex-col items-center justify-center gap-2 px-2 py-1 border rounded-md shadow bg-white dark:bg-gray-800">
          <Typography
            variant="p"
            text="shared a file"
            className="text-lg font-semibold text-gray-700 dark:text-gray-200"
          />
          <Link
            href={publicUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:text-blue-800 hover:underline transition-colors duration-300 ease-in-out"
          >
            View PDF
          </Link>
        </div>
      )}
    </>
  );

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
          <FilePreview />
        </div>
      </div>
    </div>
  );
};

export default ChatItem;
