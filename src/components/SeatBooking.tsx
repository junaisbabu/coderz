import { useAuth } from "../contexts/AuthContext";

function SeatBooking() {
  const { authState, logout } = useAuth();

  return (
    <>
      <header className="bg-black/10">
        <div className="w-10/12 h-16 flex justify-end gap-4 items-center mx-auto">
          {authState.username}
          <button
            className="bg-black hover:bg-red-500 text-white py-1 px-2 rounded-md"
            onClick={logout}
          >
            Logout
          </button>
        </div>
      </header>
    </>
  );
}

export default SeatBooking;
