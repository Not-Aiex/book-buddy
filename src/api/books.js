const API = import.meta.env.VITE_API;

export async function getBooks() {
  try {
    const response = await fetch(API + "/books");
    const result = await response.json();
    return result;
  } catch (error) {
    console.error(error);
    return [];
  }
}

export async function getBook(id) {
  try {
    const response = await fetch(API + "/books/" + id);
    const result = await response.json();
    return result;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function getReservations(token) {
  if (!token) {
    throw Error("You must be signed in to get your reservations list.");
  }
  const response = await fetch(API + "/reservations", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  });
  if (!response.ok) {
    const result = await response.json();
    throw Error(result.message);
  }
  const result = await response.json();
  return result;
}

export async function reserveBook(token, id) {
  if (!token) {
    throw Error("You must be signed in to reserve a book.");
  }
  const response = await fetch(API + "/reservations", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
    body: JSON.stringify(id),
  });
  if (!response.ok) {
    const result = await response.json();
    throw Error(result.message);
  }
}

export async function returnBook(token, id) {
  if (!token) {
    throw Error("You must be signed in to return a book.");
  }
  const response = await fetch(API + "/reservations/" + id, {
    method: "DELETE",
    headers: { Authorization: "Bearer " + token },
  });
  if (!response.ok) {
    const result = await response.json();
    throw Error(result.message);
  }
}
