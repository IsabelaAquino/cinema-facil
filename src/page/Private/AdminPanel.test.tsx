import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import AdminPanel from "./AdminPanel";
import { IBookings } from "../interface/IBookings.interface";

const mockBookings = [
  {
    name: "Usuário 1",
    session: "10:00",
    seats: ["A1", "A2"],
    value: 40,
  },
  {
    name: "Usuário 2",
    session: "10:00",
    seats: ["B1"],
    value: 20,
  },
  {
    name: "Usuário 3",
    session: "12:00",
    seats: ["C1", "C2", "C3"],
    value: 60,
  },
];

describe("AdminPanel", () => {
  it("should render the film name", () => {
    render(<AdminPanel bookings={mockBookings as IBookings[]} filmName="Filme Teste" urlPoster="/poster.png" />);
    expect(screen.getByText("Filme Teste")).toBeInTheDocument();
  });

  it("should calculate and display the total viewers", () => {
    render(<AdminPanel bookings={mockBookings as IBookings[]} filmName="Filme Teste" urlPoster="/poster.png" />);
    expect(screen.getAllByText("6")[0]).toBeInTheDocument();
  });

  it("should calculate and display the total revenue", () => {
    render(<AdminPanel bookings={mockBookings as IBookings[]} filmName="Filme Teste" urlPoster="/poster.png" />);
    expect(screen.getAllByText("R$ 120,00")[0]).toBeInTheDocument();
  });

  it("should group bookings by session and display correct session titles", () => {
    render(<AdminPanel bookings={mockBookings as IBookings[]} filmName="Filme Teste" urlPoster="/poster.png" />);
    expect(screen.getByText("Sessão 10:00")).toBeInTheDocument();
    expect(screen.getByText("Sessão 12:00")).toBeInTheDocument();
  });

  it("should display bookings details correctly", () => {
    render(<AdminPanel bookings={mockBookings as IBookings[]} filmName="Filme Teste" urlPoster="/poster.png" />);

    expect(screen.getByText("Usuário 1")).toBeInTheDocument();
    expect(screen.getByText("Usuário 2")).toBeInTheDocument();
    expect(screen.getByText("Usuário 3")).toBeInTheDocument();
  
    expect(screen.getByText("A1, A2")).toBeInTheDocument();
    expect(screen.getByText("B1")).toBeInTheDocument();
    expect(screen.getByText("C1, C2, C3")).toBeInTheDocument();

    expect(screen.getByText("R$ 40,00")).toBeInTheDocument();
    expect(screen.getByText("R$ 20,00")).toBeInTheDocument();
    expect(screen.getByText("R$ 60,00")).toBeInTheDocument();
  });
});
