import { useState } from "react";
import toast from "react-hot-toast";
import { useAuthContext } from "../context/AuhContext";
const useSignup = () => {
  const [loading, setLoading] = useState(false);
  const { setAuthUser } = useAuthContext(); // Correctly destructure the context

  const signup = async ({ fullName, userName, password, confirmPassword, gender }) => {
    const success = handleInputErrors({ fullName, userName, password, confirmPassword, gender });
    if (!success) return;

    setLoading(true);
    try {
      const res = await fetch("http://localhost:8000/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        credentials: "include",
        body: JSON.stringify({ fullName, userName, password, confirmPassword, gender })
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "An error occurred during signup");
      }
      toast.success("Account created successfully!");

      localStorage.setItem("chat-user", JSON.stringify(data));
      setAuthUser(data);

    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return { loading, signup };
};

export default useSignup;

function handleInputErrors({ fullName, userName, password, confirmPassword, gender }) {
  if (!fullName || !userName || !password || !confirmPassword || !gender) {
    toast.error("All fields are required");
    return false;
  }
  
  if (password !== confirmPassword) {
    toast.error("Passwords do not match");
    return false;
  }

  if (password.length < 6) {
    toast.error("Password must be at least 6 characters");
    return false;
  }
  return true;
}