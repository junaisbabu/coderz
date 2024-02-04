import { Route, Routes } from "react-router-dom";
import "./App.css";
import SeatBooking from "./components/SeatBooking";
import UserLogin from "./components/UserLogin";

function App() {
  return (
    <main>
      <Routes>
        <Route path="/login" element={<UserLogin />} />
        <Route path="/" element={<SeatBooking />} />
      </Routes>
    </main>
  );
}

export default App;
