import { api } from "./api";

/**
Adds a new room to the database.
@param photo - The photo of the room.
@param roomType - The type of the room.
@param roomPrice - The price of the room.
@returns Whether the room was added successfully.
 */
export async function addRoom(
  photo: File,
  roomType: string,
  roomPrice: string
): Promise<boolean> {
  try {
    const formData = new FormData();

    formData.append("photo", photo);
    formData.append("roomType", roomType);
    formData.append("roomPrice", roomPrice.toString());

    const response = await api.post("/rooms/add/new-room", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response.status === 201;
  } catch (error) {
    console.error("Error adding room:", error);
    return false;
  }
}

/**
Gets the available room types.
@returns An array of room types.
 */
export async function getRoomTypes() {
    try {
        const response = await api.get("/rooms/room-types");
        return response.data;
    } catch (error) {
        console.error("Error getting room types:", error);
        return [];
    }
}