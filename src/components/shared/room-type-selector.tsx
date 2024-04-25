import { ChangeEvent, useEffect, useState } from "react";
import { getRoomTypes } from "../../service/room-api";

interface Props {
  handleRoomInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
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
          <label
            htmlFor="roomType"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Room Type:
          </label>
          <select
            id="roomType"
            name="roomType"
            value={newRoom.roomType}
            onChange={(e) => {
              if (e.target.value === "Add New") {
                setShowNewRoomTypeInput(true);
              } else {
                handleRoomInputChange;
              }
            }}
          >
            <option value="">Select a Room Type</option>
            <option value="Add New">Add New</option>
            {roomTypes.map((roomType) => (
              <option key={roomType} value={roomType}>
                {roomType}
              </option>
            ))}
          </select>
          {showNewRoomTypeInput && (
            <div>
              <label htmlFor="newRoomType">New Room Type:</label>
              <input
                type="text"
                id="newRoomType"
                name="newRoomType"
                value={newRoomType}
                onChange={handleNewRoomTypeChange}
                placeholder="Enter new room type"
              />
              <button onClick={handleAddNewRoomType}>Add Room Type</button>
            </div>
          )}
        </div>
      )}
    </>
  );
}
