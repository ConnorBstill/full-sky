import { Pencil } from "lucide-react";

import { Button } from "~/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";

import { Textarea } from "../ui/textarea";

export default function WritePostDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          <Pencil /> Write
        </Button>
      </DialogTrigger>
      <DialogContent className="flex flex-col justify-between sm:max-w-[425px] lg:min-h-[700px] lg:min-w-[500px]">
        <DialogHeader className="h-1/6">
          <DialogTitle>Write post</DialogTitle>
        </DialogHeader>

        <div className="flex flex-1">
          <Textarea
            id="post-textarea"
            className="flex-1"
            placeholder="Write here"
            maxLength={3000}
          />
        </div>

        <DialogFooter className="h-1/6">
          <Button type="submit">Publish post</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
