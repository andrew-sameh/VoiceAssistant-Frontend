"use client";

import { useState } from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Loader2, CloudUpload, Trash, FileText } from "lucide-react";
import { useAtom } from "jotai";
import { documentsAtom } from "@/lib/store";
export default function UploadDialog({disabled}: {disabled: boolean}) {
  const [documents, setDocuments] = useAtom(documentsAtom);
  const [file, setFile] = useState<File | null>(null);
  const [open, setOpen] = useState(false);

  const [name, setName] = useState<string>("");
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = event.target.files;
    if (selectedFiles && selectedFiles.length > 0) {
      const selectedFile = selectedFiles[0];
      if (selectedFile.size <= 10 * 1024 * 1024) {
        setFile(selectedFile);
      } else {
        // Handle file size error
        console.error("File size exceeds 10MB limit.");
      }
    }
  };

  const handleUpload = async () => {
    // check the name and it must be more than 3 characters
    if (!name) {
      // Handle invalid name error
      console.error("Invalid name");
      return;
    }
    if (!file) return;
    setIsUploading(true);
    const baseUrl = process.env.NEXT_PUBLIC_API_URL;
    // Create a FormData object to hold the file
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch(
        `${baseUrl}/textfiles?name=${encodeURIComponent(name)}`,
        {
          method: "POST",
          headers: {
            accept: "application/json",
            // 'Content-Type': 'multipart/form-data' is automatically set by the browser
          },
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      setDocuments([...documents, data]);
      console.log("File uploaded successfully:", data);
      setOpen(false);
    } catch (error) {
      console.error("Error uploading file:", error);
    } finally {
      setFile(null);
      setIsUploading(false);
    }
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild disabled={disabled}>
        <Button variant="outline" disabled={disabled}>
          Upload Files
          {isUploading && <Loader2 className="ml-2 h-4 w-4 animate-spin" />}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Upload Files</DialogTitle>
          <DialogDescription>
            Drag and drop a file or click to select a file to upload.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="group relative flex h-32 cursor-pointer items-center justify-center rounded-md border-2 border-dashed border-muted transition-colors hover:border-primary">
            <div className="pointer-events-none z-10 text-center">
              <CloudUpload
                className={`mx-auto h-8 w-8 text-muted-foreground 
                    ${isUploading ? "animate-bounce" : ""}`}
              />
              <p className="mt-2 text-sm text-muted-foreground">
                Drag and drop a file here or click to select a file.
              </p>
              <p className="mt-2 text-sm text-muted-foreground">
                HTML, PDF, DOCX files only - Max 10MB
              </p>
            </div>
            <input
              type="file"
              accept=".html, .pdf, .docx"
              multiple={false}
              onChange={handleFileChange}
              className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
            />
          </div>
          <div className="grid gap-2">
            <div className="flex flex-col ">
              <p className="font-medium">Document Name:</p>
              <input
                type="text"
                placeholder="Document Name"
                className="w-full px-2 py-1 text-black"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="grid gap-2">
            <div className="flex items-center justify-between">
              <p className="font-medium">Selected File:</p>
              {/* <div className="flex items-center gap-2">
                <Button variant="ghost" size="icon" onClick={() => setFiles([])} disabled={files.length === 0}>
                  <Trash className="h-4 w-4" />
                  <span className="sr-only">Delete</span>
                </Button>
              </div> */}
            </div>
            <div className="grid gap-2">
              {file && (
                <div className="flex items-center justify-between rounded-md bg-muted/50 p-2">
                  <div className="flex items-center gap-2">
                    <FileText className="h-6 w-6 text-muted-foreground" />
                    <div>
                      <p className="font-medium">{file.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {(file.size / (1024 * 1024)).toFixed(2)} MB
                      </p>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => {
                      // const updatedFiles = [...files]
                      // updatedFiles.splice(index, 1)
                      setFile(null);
                    }}
                  >
                    <Trash className="h-4 w-4" />
                    <span className="sr-only">Remove</span>
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline" onClick={() => setFile(null)}>
              Cancel
            </Button>
          </DialogClose>
          <Button
            type="submit"
            disabled={file === null || !name}
            onClick={handleUpload}
            className={`${isUploading ? "loading" : ""}`}
          >
            Upload
            {isUploading && <Loader2 className="ml-2 h-4 w-4 animate-spin" />}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
