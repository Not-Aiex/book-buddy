import { useEffect, useState } from "react";
import { useAuth } from "./AuthContext";

import { Link, useNavigate } from "react-router";
import { getProfile, getReservations, returnBook } from "../api/books";

export default function Profile() {
  const { token } = useAuth();
  const [profile, setProfile] = useState();
  const [error, setError] = useState(null);
  const [reservations, setReservations] = useState([]);
  useEffect(() => {
    if (!token) {
      throw Error("You are not signed in.");
      return;
    }
    console.log("token is: " + token);
    const syncReservations = async () => {
      const data = await getProfile(token);
      const res = await getReservations(token);
      setProfile(data);
      setReservations(res);
    };
    syncReservations();
  }, [token]);

  if (!token) {
    return <p>You are not signed in.</p>;
  }
  if (error) {
    return <p>{error}</p>;
  }
  return (
    <div>
      <h1>Welcome, {profile?.firstname}</h1>
      <p>Your email on file with us is {profile?.email}</p>
      <h3>Your reservations</h3>
      {reservations.length === 0 ? (
        <p>You don't have any reserved books.</p>
      ) : (
        <ul>
          <li className="headerreservations" id="headerreservations">
            <p id="headerreservations">Cover image</p>
            <p id="headerreservations">Book title</p>
            <p id="headerreservations">Author</p>
            <p id="headerreservations">Return</p>
          </li>
          {reservations.map((reservation) => (
            <li className="reservations" key={reservation.id}>
              <img id="reservationimage" src={reservation.coverimage} />
              <Link className="bookListing" to={"/books/" + reservation.bookid}>
                {reservation.title}
              </Link>
              <p id="reservationimage">{reservation.author}</p>
              <button
                onClick={async () => {
                  await returnBook(token, reservation.id);
                  setReservations((returned) =>
                    returned.filter(
                      (tempBook) => tempBook.id !== reservation.id,
                    ),
                  );
                }}
              >
                Return book
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
