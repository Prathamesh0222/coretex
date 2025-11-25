import axios from "axios";
import { Copy, Share2, Check } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

export const ShareButton = () => {
  const [shareUrl, setShareUrl] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const generateLink = async () => {
    try {
      const response = await axios.post("/api/share");

      if (response.data) {
        setShareUrl(response.data.data.shareUrl);
      }
    } catch (error) {
      toast.error("Failed to generate link");
      console.error("Failed to generate link", error);
    }
  };

  const copyToClipboard = async () => {
    if (shareUrl) {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
      toast.success("Link copied to clipboard!");
    }
  };

  return (
    <div>
      <Dialog>
        <DialogTrigger>
          <Share2 className="cursor-pointer" />
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Share your Second Brain</DialogTitle>
            <DialogDescription></DialogDescription>
          </DialogHeader>
          <Button onClick={generateLink}>Generate Sharable Link</Button>
          {shareUrl && (
            <div className="flex flex-col gap-4">
              <div className="relative">
                <Input className="pr-10" value={shareUrl ?? ""} readOnly />
                <button
                  onClick={copyToClipboard}
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-1 hover:bg-gray-100 rounded transition-colors"
                  disabled={!shareUrl}
                >
                  {copied ? (
                    <Check size={16} className="text-green-600" />
                  ) : (
                    <Copy size={16} className="text-gray-600" />
                  )}
                </button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};
