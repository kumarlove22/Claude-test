interface User {
  id: number;
  name: string;
  email: string;
  username: string;
}

interface FetchUserOptions {
  baseUrl?: string;
}

/**
 * Fetches a single user by ID from the API.
 * @param userId - The numeric ID of the user to fetch
 * @param options - Optional configuration including a custom base URL
 * @returns A promise resolving to the User object
 * @throws Error with a user-friendly message if the request fails
 */
async function fetchUserById(
  userId: number,
  options: FetchUserOptions = {}
): Promise<User> {
  const baseUrl = options.baseUrl ?? "https://jsonplaceholder.typicode.com";
  const url = `${baseUrl}/users/${userId}`;

  let response: Response;
  try {
    response = await fetch(url);
  } catch {
    throw new Error("Unable to reach the server. Please check your internet connection.");
  }

  if (response.status === 404) {
    throw new Error(`User with ID ${userId} was not found.`);
  }

  if (!response.ok) {
    throw new Error(`Failed to fetch user data. Server responded with status ${response.status}.`);
  }

  const user: User = await response.json();
  return user;
}

/**
 * Fetches all users from the API.
 * @param options - Optional configuration including a custom base URL
 * @returns A promise resolving to an array of User objects
 * @throws Error with a user-friendly message if the request fails
 */
async function fetchAllUsers(options: FetchUserOptions = {}): Promise<User[]> {
  const baseUrl = options.baseUrl ?? "https://jsonplaceholder.typicode.com";
  const url = `${baseUrl}/users`;

  let response: Response;
  try {
    response = await fetch(url);
  } catch {
    throw new Error("Unable to reach the server. Please check your internet connection.");
  }

  if (!response.ok) {
    throw new Error(`Failed to fetch users. Server responded with status ${response.status}.`);
  }

  const users: User[] = await response.json();
  return users;
}

export { fetchUserById, fetchAllUsers, User, FetchUserOptions };
