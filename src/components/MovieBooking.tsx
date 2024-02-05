import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Movies, Seat } from "../../types/movieBooking";
import { useAuth } from "../contexts/AuthContext";
import { allMovies } from "../data/movies";

function MovieBooking() {
  const { authState, logout } = useAuth();
  const [movies, setMovies] = useState<Movies[]>(allMovies);
  const [movieId, setMovieId] = useState<number>(1);
  const [seats, setSeats] = useState<Seat[] | []>([]);

  const navigate = useNavigate();

  const updateMovies = (updatedSeats: Seat[]) => {
    const selectedMovie = [...movies];
    const movieIndex = selectedMovie.findIndex((movie) => movie.id === movieId);
    selectedMovie[movieIndex] = {
      ...selectedMovie[movieIndex],
      seats: updatedSeats,
    };
    setMovies(selectedMovie);
  };

  const generateSeats = () => {
    const selectMovie = movies.find((movie) => movie.id === movieId);
    if (selectMovie?.seats.length) {
      setSeats(selectMovie.seats);
    } else {
      const seats = Array.from({ length: 48 }, (_, index) => {
        return {
          seatNo: index + 1,
          isOccupied: false,
          isSelected: false,
        };
      });

      setSeats(seats);
    }
  };

  const handleSeatSelecting = (seatNo: number) => {
    const selectedSeats = [...seats];
    const seatIndex = selectedSeats.findIndex((seat) => seat.seatNo === seatNo);
    if (selectedSeats[seatIndex].isOccupied) return;
    else {
      selectedSeats[seatIndex] = {
        ...selectedSeats[seatIndex],
        isSelected: !selectedSeats[seatIndex].isSelected,
      };
    }

    updateMovies(selectedSeats);
    setSeats(selectedSeats);
  };

  const handleSeatOccupying = () => {
    let occupiedSeats = [...seats];
    occupiedSeats = occupiedSeats.map((seat) => {
      if (seat.isSelected) {
        return {
          ...seat,
          isOccupied: true,
        };
      } else return { ...seat };
    });

    updateMovies(occupiedSeats);
    setSeats(occupiedSeats);
  };

  const handleMovieChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const movieId = Number(event.target.value);
    setMovieId(movieId);
  };

  const noOfSelectedSeats = seats?.filter(
    (seat) => seat.isSelected && !seat.isOccupied
  ).length;

  useEffect(() => {
    generateSeats();
  }, [movieId]);

  useEffect(() => {
    if (authState.isAuthenticated || localStorage.getItem("username")?.length) {
      navigate("/");
    } else {
      navigate("/login");
    }
  }, [navigate]);

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
      <main className="min-h-[calc(100dvh-64px)] flex flex-col justify-center items-center space-y-20">
        <div className="flex flex-col items-center gap-y-10">
          <div>
            <label
              className="uppercase text-violet-500 mr-1 font-medium"
              htmlFor="select-movie"
            >
              Select a Movie:
            </label>
            <select
              id="select-movie"
              className="border-2 border-black"
              onChange={handleMovieChange}
            >
              {allMovies.map((movie) => (
                <option key={movie.id} value={movie.id}>
                  {movie.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <div className="flex gap-10 bg-black/10 py-3 px-6 rounded-md">
              <div className="flex gap-2 items-center">
                <div className="w-5 h-5 bg-white" />
                <span>N/A</span>
              </div>
              <div className="flex gap-2 items-center">
                <div className="w-5 h-5 bg-green-500" />
                <span>Selected</span>
              </div>
              <div className="flex gap-2 items-center">
                <div className="w-5 h-5 bg-black" />
                <span>Occupied</span>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-center gap-y-10">
          <div className="grid grid-cols-8 gap-6 bg-black/10 p-2">
            {seats.map((seat, index) => {
              return (
                <div
                  key={seat.seatNo}
                  className={`w-5 h-5 ${
                    seat.isOccupied
                      ? " bg-black "
                      : seat.isSelected
                      ? " bg-green-500 "
                      : " bg-white "
                  }`}
                  onClick={() => handleSeatSelecting(seat.seatNo)}
                />
              );
            })}
          </div>
          <div className="text-center">
            <p className="mb-3">
              You have selected <strong>{noOfSelectedSeats}</strong> seats for a
              price of{" "}
              <strong>
                {(movies[movieId - 1].price || 0) * (noOfSelectedSeats || 0)}
              </strong>
            </p>
            <button
              className="disabled:bg-black/10 bg-black/80 hover:bg-black disabled:text-black text-white py-1 px-6 rounded-md border border-black"
              onClick={handleSeatOccupying}
              disabled={noOfSelectedSeats <= 0 ? true : false}
            >
              Book
            </button>
          </div>
        </div>
      </main>
    </>
  );
}

export default MovieBooking;
