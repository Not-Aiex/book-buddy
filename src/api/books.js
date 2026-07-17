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

export async function getProfile(token) {
  console.log("Get profile: " + token);
  try {
    const response = await fetch(API + "/users/me", {
      method: "GET",
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    console.log("books token: " + token);
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

export async function reserveBook(token, bookId) {
  if (!token) {
    throw Error("You must be signed in to reserve a book.");
  }
  const response = await fetch(API + "/reservations", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
    body: JSON.stringify({ bookId }),
  });
  const result = await response.json();
  if (!response.ok) {
    console.log(result);
    console.log("response " + response);
    throw Error(result.message);
  }
  return result;
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
