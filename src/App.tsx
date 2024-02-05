import { Route, Routes } from "react-router-dom";
import MovieBooking from "./components/MovieBooking";
import UserLogin from "./components/UserLogin";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<UserLogin />} />
      <Route path="/" element={<MovieBooking />} />
    </Routes>
  );
}

export default App;
