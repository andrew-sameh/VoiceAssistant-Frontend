import axios from "axios";
export async function fetchReservations() {
  const baseUrl = process.env.API_URL;
  const response = await axios.get(`${baseUrl}/reservations`);

  if (response.status !== 200) {
    throw new Error("Failed to fetch reservations");
  }

  return response.data;
}
