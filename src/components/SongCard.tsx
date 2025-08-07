import { formatIndianViewCount, formatTime } from "@/lib/utils";
import Image from "next/image";
import React from "react";
import { Badge } from "./ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "./ui/button";
import SongPlayer from "./SongPlayer";
const SongCard = ({ song }: { song: Song }) => {
  const getHighestImage = (images: ImageQuality[]) => {
    // Return the last image (highest quality) or a placeholder
    return images?.[images.length - 1]?.url || "/placeholder.png";
  };

  return (
    // 1. Main Container: Changed to flex-col on mobile, sm:flex-row for larger screens
    <div className="flex flex-col sm:flex-row flex-1 border items-start gap-4 p-3 sm:p-4 rounded-xl bg-background shadow-sm">
      {/* 2. Image Container: Added flex-shrink-0 to prevent shrinking in flex-row */}
      <div className="relative w-full sm:w-36 flex-shrink-0 aspect-square overflow-hidden rounded-md">
        <Image
          priority
          src={getHighestImage(song.image)}
          alt={song.name}
          fill
          // 3. Image Sizes: Optimized for better performance
          sizes="(max-width: 639px) 90vw, 144px"
          className="object-cover"
        />
      </div>

      <div className="flex flex-col flex-1 min-w-0 w-full space-y-2 text-balance">
        {/* 4. Typography: Responsive font size for the title */}
        <h2 className="text-base sm:text-lg font-semibold truncate">{song.name}</h2>

        <Badge variant="secondary" className="text-xs self-start">
          {song.label}
        </Badge>

        <div className="flex flex-wrap items-center gap-2">
          <Badge className="text-xs py-0.5 px-2">
            {formatIndianViewCount(song.playCount)}
          </Badge>
          <Badge variant="outline" className="text-xs py-0.5 px-2">
            {formatTime(song.duration)}
          </Badge>
        </div>
        
        {/* The Dialog is inherently responsive, so no changes needed here */}
        <Dialog>
          <DialogTrigger asChild>
            <Button className="text-xs px-3 self-start mt-1" variant={"outline"} size={"sm"}>
              Open in Player
            </Button>
          </DialogTrigger>
          <DialogContent showCloseButton>
            <DialogHeader>
              <DialogTitle>{song.name}</DialogTitle>
              <DialogDescription hidden>{song.name} By {song.label}</DialogDescription>
            </DialogHeader>
            <SongPlayer song={song}/>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default SongCard;  