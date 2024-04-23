import { useState, ChangeEvent, FormEvent } from "react";
import { addRoom } from "../../service/room-api";
import RoomTypeSelector from "../../components/shared/room-type-selector";
import Heading from "../../components/shared/heading";

interface NewRoom {
  photo: File | null;
  roomType: string;
  roomPrice: string;
}

export default function AddRoom() {
  const [newRoom, setNewRoom] = useState<NewRoom>({
    photo: null,
    roomType: "",
    roomPrice: "",
  });
  const [imagePreview, setImagePreview] = useState<string>("");
  const [successMessage, setSuccessMessage] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");

  function handleRoomInputChange(e: ChangeEvent<HTMLInputElement>): void {
    setNewRoom({
      ...newRoom,
      [e.target.name]: e.target.value,
    });
  }

  function handleImageChange(e: ChangeEvent<HTMLInputElement>): void {
    const file = e.target.files && e.target.files[0];
    setNewRoom({
      ...newRoom,
      photo: file || null,
    });
    setImagePreview(file ? URL.createObjectURL(file) : "");
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>): Promise<void> {
    e.preventDefault();

    try {
      if (!newRoom.photo) {
        setErrorMessage("Please select a photo.");
        return;
      }

      const success = await addRoom(
        newRoom.photo,
        newRoom.roomType,
        newRoom.roomPrice
      );

      if (success) {
        setSuccessMessage("Room added successfully!");
        setNewRoom({
          photo: null,
          roomType: "",
          roomPrice: "",
        });
        setImagePreview("");
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      setErrorMessage(error.message);
    }
  }

  return (
    <>
      <Heading title="Add Room" />
      <section className="flex justify-center gap-10 bg-white text-black p-10 h-auto">
        <div className="z-50">
          <form onSubmit={handleSubmit}>
            <div className="col-span-full">
              <label
                htmlFor="cover-photo"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Room Photo
              </label>
              <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                <div className="text-center">
                  <svg
                    className="mx-auto h-12 w-12 text-gray-300"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M1.5 6a2.25 2.25 0 012.25-2.25h16.5A2.25 2.25 0 0122.5 6v12a2.25 2.25 0 01-2.25 2.25H3.75A2.25 2.25 0 011.5 18V6zM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0021 18v-1.94l-2.69-2.689a1.5 1.5 0 00-2.12 0l-.88.879.97.97a.75.75 0 11-1.06 1.06l-5.16-5.159a1.5 1.5 0 00-2.12 0L3 16.061zm10.125-7.81a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0z"
                      clip-rule="evenodd"
                    />
                  </svg>
                  <div className="mt-4 flex text-sm leading-6 text-gray-600">
                    <label
                      htmlFor="file-upload"
                      className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                    >
                      <span>Upload a file</span>
                      <input
                        id="file-upload"
                        name="file-upload"
                        type="file"
                        accept="image/*"
                        className="sr-only"
                        onChange={handleImageChange}
                      />
                    </label>
                    <p className="pl-1">or drag and drop</p>
                  </div>
                  <p className="text-xs leading-5 text-gray-600">
                    PNG, JPG, GIF up to 10MB
                  </p>
                </div>
              </div>
            </div>
            <div>
              <label htmlFor="roomType">Room Type:</label>
              <RoomTypeSelector
                handleRoomInputChange={handleRoomInputChange}
                newRoom={newRoom}
              />
            </div>
            <div>
              <label htmlFor="roomPrice">Room Price:</label>
              <input
                type="number"
                id="roomPrice"
                name="roomPrice"
                value={newRoom.roomPrice}
                onChange={handleRoomInputChange}
              />
            </div>
            <button type="submit">Add Room</button>
          </form>
          {successMessage && <p>{successMessage}</p>}
          {errorMessage && <p>{errorMessage}</p>}
        </div>

        {imagePreview && (
          <img
            src={imagePreview}
            alt="Room Preview"
            style={{ maxWidth: "400px" }}
          />
        )}
      </section>
    </>
  );
}
