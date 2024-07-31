"use client";

import { FC } from "react";

import Sidebar from "./sidebar";
import InfoSection from "./info-section";
import ChatHeader from "./chat-header";
import Typography from "./ui/typography";
import TextEditor from "./text-editor";

import { Channel, User, Workspace } from "@/types/app";

type ChatGroupProps = {
  type: "Channel" | "DirectMessage";
  socketUrl: string;
  apiUrl: string;
  headerTitle: string;
  chatId: string;
  socketQuery: Record<string, string>;
  paramKey: "channelId" | "recipientId";
  paramValue: string;
  userData: User;
  currentWorkspaceData: Workspace;
  currentChannelData: Channel | undefined;
  userWorkspaceData: Workspace[];
  userWorkspaceChannels: Channel[];
  slug: string;
};

const ChatGroup: FC<ChatGroupProps> = ({
  apiUrl,
  chatId,
  headerTitle,
  paramKey,
  paramValue,
  socketQuery,
  socketUrl,
  type,
  currentChannelData,
  currentWorkspaceData,
  slug,
  userData,
  userWorkspaceChannels,
  userWorkspaceData,
}) => {
  return (
    <>
      <div className="h-[calc(100vh-256px)] overflow-y-auto [&::-webkit-scrollbar-thumb]:rounded-[6px] [&::-webkit-scrollbar-thumb]:bg-foreground/60 [&::-webkit-scrollbar-track]:bg-none [&::-webkit-scrollbar]:w-2">
        <Sidebar
          currentWorkspaceData={currentWorkspaceData}
          userData={userData}
          userWorkspacesData={userWorkspaceData as Workspace[]}
        />
        <InfoSection
          currentWorkspaceData={currentWorkspaceData}
          userData={userData}
          userWorkspaceChannels={userWorkspaceChannels}
          currentChannelId={
            type === "Channel" ? currentChannelData?.id : undefined
          }
        />
        <div className="p-4 relative w-full overflow-hidden">
          <ChatHeader title={headerTitle} chatId={chatId} userData={userData} />

          <div className="mt-10">
            <Typography text="Chat Content" variant="h4" />
          </div>
        </div>
      </div>

      <div className="m-4">
        <TextEditor
          apiUrl={socketUrl}
          channel={currentChannelData}
          type={type}
          userData={userData}
          workspaceData={currentWorkspaceData}
          recipientId={type === "DirectMessage" ? chatId : undefined}
        />
      </div>
    </>
  );
};

export default ChatGroup;
