import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { fetchReservations } from "./action";
// import Image from "next/image";
interface Reservation {
  id: number;
  name: string;
  number: string;
  people_count: number;
  date: string;
  time: string;
  room: string;
  movie_name: string;
  movie_desc: string;
  movie_image: string;
  status: string;
  snack_package: boolean;
  created_at: string;
}

export default async function Page() {
  const reservations: Reservation[] = await fetchReservations();

  return (
    <div className="px-2 mx-auto">
      <Table className="">
        <TableHeader>
          <TableRow>
            <TableHead>Reservation ID</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Phone</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Time</TableHead>
            <TableHead>Party Size</TableHead>
            <TableHead>Room</TableHead>
            <TableHead>Snacks Package</TableHead>
            <TableHead>Movie</TableHead>
            <TableHead>Image</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Creation Date</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {reservations.length === 0 ? (
            <TableRow>
              <TableCell colSpan={12} className="text-center">
                No reservations yet
              </TableCell>
            </TableRow>
          ) : (
            reservations.map((reservation) => (
              <TableRow key={reservation.id}>
                <TableCell>{reservation.id}</TableCell>
                <TableCell>{reservation.name}</TableCell>
                <TableCell>{reservation.number}</TableCell>
                <TableCell>{reservation.date}</TableCell>
                <TableCell>{reservation.time}</TableCell>
                <TableCell>{reservation.people_count}</TableCell>
                <TableCell>{reservation.room}</TableCell>
                <TableCell>
                  {reservation.snack_package ? "Yes" : "No"}
                </TableCell>
                <TableCell>{reservation.movie_name}</TableCell>
                <TableCell>
                  <a
                    href={reservation.movie_image}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {/* Only show the image it the src is avialable */}
                    {reservation.movie_image && reservation.movie_image !=="string" && (
                      <img
                        src={reservation.movie_image}
                        alt={reservation.movie_name}
                        width={64}
                        height={64}
                        className="w-16 h-16 object-cover"
                      />
                    )}
                 
                  </a>
                </TableCell>
                <TableCell>
                  {reservation.status.charAt(0).toUpperCase() +
                    reservation.status.slice(1)}
                </TableCell>
                <TableCell>
                  {new Date(reservation.created_at).toLocaleString()}
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}
