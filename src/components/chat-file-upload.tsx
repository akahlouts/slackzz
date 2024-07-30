"use client";

import { FC, useState } from "react";
import { useForm } from "react-hook-form";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { v4 as uuid } from "uuid";

import { Card, CardContent } from "./ui/card";
import Typography from "./ui/typography";
import { Form, FormControl, FormField, FormItem, FormLabel } from "./ui/form";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { toast } from "sonner";

import { File } from "lucide-react";

import { Channel, User, Workspace } from "@/types/app";

type ChatFileUploadProps = {
  userData: User;
  workspaceData: Workspace;
  channel: Channel;
};

const formSchema = z.object({
  file: z
    .instanceof(FileList)
    .refine((files) => files?.length === 1, "File is required")
    .refine((files) => {
      const file = files?.[0];

      return (
        file?.type === "application/pdf" || file?.type.startsWith("image/")
      );
    }, "File must be an image or a PDF"),
});

const ChatFileUpload: FC<ChatFileUploadProps> = ({
  channel,
  userData,
  workspaceData,
}) => {
  const [isUploading, setIsUploading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      file: undefined,
    },
  });

  const imageRef = form.register("file");

  async function handleUpload(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  return (
    <Card>
      <CardContent className="p-6 space-y-4">
        <div className="border border-dashed border-gray-200 rounded-lg flex flex-col gap-1 p-6 items-center">
          <File className="w-12 h-12" />
          <span className="text-sm font-medium text-gray-500">
            <Typography text="Drag and drop your files here" variant="p" />
          </span>
        </div>

        <div className="space-y-2 text-sm">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleUpload)}
              className="space-y-8"
            >
              <FormField
                control={form.control}
                name="file"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="file" className="text-sm font-medium">
                      File
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="file"
                        accept="image/*,application/pdf"
                        {...imageRef}
                        placeholder="Choose a file"
                        onChange={(event) =>
                          field.onChange(event.target?.files)
                        }
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              <Button type="submit" disabled={isUploading} size="lg">
                <Typography text="Upload" variant="p" />
              </Button>
            </form>
          </Form>
        </div>
      </CardContent>
    </Card>
  );
};

export default ChatFileUpload;
