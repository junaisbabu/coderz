import React from "react";
import { useAuth } from "../contexts/AuthContext";

function UserLogin() {
  const {
    login,
    testCredential,
    authState: { isAuthenticated, error },
  } = useAuth();

  const handleLogin = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const username = formData.get("username") as string;
    const password = formData.get("password") as string;

    login(username, password);
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-full max-w-[400px] max-h-min border p-6 rounded-md">
        <form className="space-y-4" onSubmit={handleLogin}>
          <h1 className="text-2xl font-bold text-center">Login to Book</h1>
          <div className="flex flex-col">
            <label htmlFor="username">Username</label>
            <input
              id="username"
              className="border rounded-md h-10 p-2"
              type="text"
              name="username"
              required
            />
            {!isAuthenticated && error?.username && (
              <p className="text-red-500 font-semibold text-sm">
                {error.username}
              </p>
            )}
          </div>
          <div className="flex flex-col">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              className="border rounded-md h-10 p-2"
              type="password"
              name="password"
              minLength={8}
              required
            />
            {!isAuthenticated && error?.password && (
              <p className="text-red-500 font-semibold text-sm">
                {error.password}
              </p>
            )}
          </div>
          <div className="min-h-5">
            {isAuthenticated && (
              <p className="text-green-500 font-semibold text-sm text-center">
                Successfully logged in
              </p>
            )}
          </div>
          <button
            className="w-full font-semibold bg-black/80 hover:bg-black text-white p-2 rounded-md"
            type="submit"
          >
            Login
          </button>
        </form>
        <span className="block text-center font-semibold my-1">OR</span>
        <button
          className="w-full font-semibold border-2 border-black text-black hover:bg-black hover:text-white p-2 rounded-md"
          type="button"
          onClick={testCredential}
        >
          Use Test Credential
        </button>
      </div>
    </div>
  );
}

export default UserLogin;
