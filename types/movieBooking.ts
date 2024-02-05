export type Seat = {
  isOccupied?: boolean;
  seatNo: number;
  isSelected?: boolean;
};

export type Movies = {
  id: number;
  name: string;
  price: number;
  seats: Seat[] | [];
};
