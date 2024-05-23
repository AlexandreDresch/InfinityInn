import { ChangeEvent, useEffect, useState } from "react";
import { getRoomTypes } from "../../service/room-api";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

interface Props {
  handleRoomInputChange: (value: string) => void;
  newRoom: {
    roomType: string;
  };
}

export default function RoomTypeSelector({
  handleRoomInputChange,
  newRoom,
}: Props) {
  const [roomTypes, setRoomTypes] = useState<string[]>([]);
  const [showNewRoomTypeInput, setShowNewRoomTypeInput] =
    useState<boolean>(false);
  const [newRoomType, setNewRoomType] = useState<string>("");

  useEffect(() => {
    getRoomTypes().then((roomTypes) => setRoomTypes(roomTypes));
  }, []);

  function handleNewRoomTypeChange(e: ChangeEvent<HTMLInputElement>): void {
    setNewRoomType(e.target.value);
  }

  function handleAddNewRoomType(): void {
    if (newRoomType.trim() !== "") {
      setRoomTypes([...roomTypes, newRoomType.trim()]);
      setShowNewRoomTypeInput(false);
      setNewRoomType("");
    }
  }

  return (
    <>
      {roomTypes.length > 0 && (
        <div className="flex flex-col">
          <Label className="block text-sm font-medium leading-6 text-gray-900">
            Room Type:
          </Label>
          <Select
            value={newRoom.roomType}
            onValueChange={(value) => {
              if (value === "Add New") {
                setShowNewRoomTypeInput(true);
              } else {
                handleRoomInputChange(value);
              }
            }}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Room Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Add New">Add New</SelectItem>
              {roomTypes.map((roomType) => (
                <SelectItem key={roomType} value={roomType}>
                  {roomType}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          {showNewRoomTypeInput && (
            <div className="flex flex-col">
              <Label
                htmlFor="newRoomType"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                New Room Type:
              </Label>
              <Input
                type="text"
                id="newRoomType"
                name="newRoomType"
                value={newRoomType}
                onChange={handleNewRoomTypeChange}
                placeholder="Enter new room type"
              />
              <div className="mt-2 flex justify-between text-white">
                <Button
                  onClick={handleAddNewRoomType}
                  className="rounded bg-red-500 px-4 pt-1"
                >
                  Cancel
                </Button>

                <Button
                  onClick={handleAddNewRoomType}
                  className="rounded bg-green-500 px-4 pt-1"
                >
                  Add
                </Button>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
}
