import { useEffect, useRef, useState } from "react";
import { Input } from "~/components/ui/input";
import { Button } from "./ui/button";
import { Pencil } from "lucide-react";
import { RightNowIn } from "./RightNowIn";

type TSearchProps = {
  onSubmit: (value: string) => void;
  defaultLocation: string | null;
};
export const SearchLocation = ({ onSubmit, defaultLocation }: TSearchProps) => {
  const [location, setLocation] = useState<string | null>(defaultLocation);
  const [isEditing, setIsEditing] = useState(!location);
  const inputRef = useRef(null);

  const handleEditing = (value: string) => {
    setLocation(value);
  };

  useEffect(() => {
    const onClickOutside = (event: MouseEvent) => {
      if (!!location && event.target !== inputRef.current) {
        setIsEditing(false);
      }
    };
    const onEnterClick = (event: KeyboardEvent) => {
      if (event.key === "Enter") {
        setIsEditing(false);
        if (location) {
          onSubmit(location);
        }
      }
    };

    window.addEventListener("mousedown", onClickOutside);
    window.addEventListener("keypress", onEnterClick);
    return () => {
      window.removeEventListener("mousedown", onClickOutside);
      window.removeEventListener("mousedown", onClickOutside);
    };
  }, [location]);

  if (isEditing) {
    return (
      <Input
        className="bg-slate-100 border-slate-400"
        placeholder="Search a location!"
        onChange={(e) => handleEditing(e.target.value)}
        ref={inputRef}
      />
    );
  }

  return (
    <RightNowIn>
      <div className="flex gap-5 items-center">
        <h1 className="text-6xl">{location}</h1>
        <Button className="p-2 size-10" onClick={() => (setIsEditing(true), onSubmit(""))}>
          <Pencil size={20} className="text-black shrink-0" />
        </Button>
      </div>
    </RightNowIn>
  );
};
