import { useEffect, useState } from 'react';
import {jwtDecode} from 'jwt-decode'; // Fix the import syntax

const UserIdFromToken = () => {
  const [id, setUserId] = useState(null); // Default to null for better initial state handling

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      console.log("No token found");
      return;
    }

    try {
      const decodedUser = jwtDecode(token);
      setUserId(decodedUser.user.id); // Set the user ID from the decoded token
    } catch (error) {
      console.error("Error decoding token", error);
    }
  }, []); // Dependency array as an empty array ensures this runs only once after the component mounts

  return id; // Return the user ID
};

export default UserIdFromToken;
