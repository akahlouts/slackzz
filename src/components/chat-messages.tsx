import { FC } from "react";
import { format } from "date-fns";

import { useChatFetcher } from "@/hooks/use-chat-fetcher";

import ChatItem from "./chat-item";
import DotAnimatedLoader from "./dot-animated-loader";

import { Channel, User, Workspace } from "@/types/app";

const DATE_FORMAT = "d MMM yyy, HH:mm";

type ChatMessagesProps = {
  userData: User;
  name: string;
  chatId: string;
  apiUrl: string;
  socketUrl: string;
  socketQuery: Record<string, string>;
  paramKey: "channelId" | "recipientId";
  paramValue: string;
  type: "Channel" | "DirectMessage";
  workspaceData: Workspace;
  channelData?: Channel;
};

const ChatMessages: FC<ChatMessagesProps> = ({
  apiUrl,
  chatId,
  name,
  paramKey,
  paramValue,
  socketQuery,
  socketUrl,
  type,
  userData,
  workspaceData,
  channelData,
}) => {
  const queryKey =
    type === "Channel" ? `channel:${chatId}` : `direct_message:${chatId}`;

  const { data, status, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useChatFetcher({
      apiUrl,
      queryKey,
      pageSize: 10,
      paramKey,
      paramValue,
    });

  if (status === "pending") {
    return <DotAnimatedLoader />;
  }

  if (status === "error") {
    return <div>Error Occured</div>;
  }

  const renderMessages = () =>
    data.pages.map((page) =>
      page.data.map((message) => (
        <ChatItem
          key={message.id}
          currentUser={userData}
          user={message.user}
          content={message.content}
          filrUrl={message.file_url}
          deleted={message.is_deleted}
          id={message.id}
          timestamp={format(new Date(message.created_at), DATE_FORMAT)}
          isUpdated={message.updated_at !== message.created_at}
          socketUrl={socketUrl}
          socketQuery={socketQuery}
          channelData={channelData}
        />
      ))
    );

  return (
    <div className="flex-1 flex flex-col py-4 overflow-y-auto">
      <div className="flex flex-col-reverse mt-auto">{renderMessages()}</div>
    </div>
  );
};

export default ChatMessages;
