"use client";

import { FC, useState } from "react";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import PlaceHolder from "@tiptap/extension-placeholder";
import axios from "axios";

import { FiPlus } from "react-icons/fi";
import { Send } from "lucide-react";

import MenuBar from "./menu-bar";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import ChatFileUpload from "./chat-file-upload";

import { Channel, User, Workspace } from "@/types/app";

type TextEditorProps = {
  apiUrl: string;
  type: "Channel" | "DirectMessage";
  channel?: Channel;
  workspaceData: Workspace;
  userData: User;
  recipientId?: string;
};

const TextEditor: FC<TextEditorProps> = ({
  apiUrl,
  type,
  channel,
  workspaceData,
  userData,
  recipientId,
}) => {
  const [content, setContent] = useState("");
  const [fileUploadModal, setFileUploadModal] = useState(false);

  const toggleFileUploadModal = () =>
    setFileUploadModal((prevState) => !prevState);

  const editor = useEditor({
    extensions: [
      StarterKit,
      PlaceHolder.configure({
        placeholder: `Message #${channel?.name ?? "USERNAME"}`,
      }),
    ],
    autofocus: true,
    content,
    onUpdate({ editor }) {
      setContent(editor.getText());
    },
  });

  const handleSend = async () => {
    if (content.length < 2) return;

    try {
      const payload = {
        content,
        type,
      };

      let endpoint = apiUrl;

      if (type === "Channel" && channel) {
        endpoint += `?channelId=${channel.id}&workspaceId=${workspaceData.id}`;
      } else if (type === "DirectMessage" && recipientId) {
        endpoint += `?recipientId=${recipientId}&workspaceId=${workspaceData.id}`;
      }

      await axios.post(endpoint, payload);

      setContent("");
      editor?.commands.setContent("");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="p-1 border dark:border-zinc-500 border-neutral-700 rounded-md relative overflow-hidden">
      <div className="sticky top-0 z-10">
        {editor && <MenuBar editor={editor} />}
      </div>
      <div className="h-[150px] pt-11 flex w-full flex-1">
        <EditorContent
          className="prose w-full h-full dark:text-white leading-[1.15px] overflow-y-hidden whitespace-pre-wrap"
          editor={editor}
        />
      </div>
      <div className="absolute top-3 z-10 right-3 bg-black dark:bg-white cursor-pointer transition-all duration-500 hover:scale-110 text-white grid place-content-center rounded-full w-6 h-6">
        <FiPlus
          onClick={toggleFileUploadModal}
          size={28}
          className="dark:text-black"
        />
      </div>

      <Button
        onClick={handleSend}
        disabled={content.length < 2}
        size="sm"
        className="absolute bottom-1 right-1"
      >
        <Send />
      </Button>

      <Dialog onOpenChange={toggleFileUploadModal} open={fileUploadModal}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>File Upload</DialogTitle>
            <DialogDescription>
              Upload a file to share with your team
            </DialogDescription>
          </DialogHeader>

          <ChatFileUpload
            userData={userData}
            workspaceData={workspaceData}
            channel={channel}
            recipientId={recipientId}
            toggleFileUploadModal={toggleFileUploadModal}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default TextEditor;
