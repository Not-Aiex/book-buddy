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
    // if (!token) {
    //   throw Error("You are not signed in.");
    //   return;
    // }
    console.log("token is: " + token);
    const syncReservations = async () => {
      const data = await getProfile(token);
      const res = await getReservations(token);
      setProfile(data);
      setReservations(res);
      //   try {
      //     console.log("profile token: " + token);
      //     const data = await getProfile(token);
      //     console.log("here" + data);
      //     setProfile(data);
      //   } catch (error) {
      //     console.log("Failed to load profile");
      //     setError(error.message);
      //   }
      //   try {
      //     const data = await getReservations(token);
      //     setReservations(data);
      //   } catch (error) {
      //     console.log("Failed to load reservations");
      //     setError(error.message);
      //   }
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
          {reservations.map((reservation) => (
            <li key={reservation.id}>
              <p>
                {reservation.title} written by {reservation.author}
              </p>
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
