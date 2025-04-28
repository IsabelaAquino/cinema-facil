import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { CheckoutPage } from "./CheckoutPage";
import { IFilms } from "./interface/IFilms.interface";
import { FilmsService } from "../services/FilmsService";

describe("CheckoutPage tests", () => {
  const mockShowAlert = vi.fn();
  const doneMock = vi.fn();

  const mockFilm: IFilms = {
    id: "1",
    name: "Film 1",
    sinopse: "Sinopse do filme",
    url: "https://example.com/film.jpg",
    sessions: [
      { session: "10:00", value: 50 },
      { session: "14:00", value: 60 },
    ],
  };

  it("should validate name before submitting reservation", async () => {
    render(
      <CheckoutPage
        selectedFilm={mockFilm}
        showAlert={mockShowAlert}
        done={doneMock}
      />
    );

    const sessionChip = screen.getByText("10:00");
    fireEvent.click(sessionChip);

    const assento = screen.getByTitle("A1");
    fireEvent.click(assento);

    const form = screen.getByTestId("form-booking");
    fireEvent.submit(form);

    expect(mockShowAlert).toHaveBeenCalledWith("Informar o nome da reserva", "error");

  });

  it("should submit reservation with valid name", async () => {
    render(
      <CheckoutPage
        selectedFilm={mockFilm}
        showAlert={mockShowAlert}
        done={doneMock}
      />
    );

    const sessionChip = screen.getByText("10:00");
    fireEvent.click(sessionChip);

    const assento = screen.getByTitle("A1");
    fireEvent.click(assento);

    const nameInput = screen.getByLabelText(/nome/i);
    fireEvent.change(nameInput, { target: { value: "John Doe" } });

    const confirmButton = screen.getByRole("button", { name: /confirmar/i });
    fireEvent.click(confirmButton);

    await waitFor(() => {
      expect(mockShowAlert).toHaveBeenCalledWith("Reserva efetuada com sucesso!", "success");
    });

    expect(doneMock).toHaveBeenCalled();
  });

  it("should handle error during reservation", async () => {
    vi.spyOn(FilmsService, 'toBooking').mockRejectedValue(new Error("Error booking"));
  
    render(
      <CheckoutPage
        selectedFilm={mockFilm}
        showAlert={mockShowAlert}
        done={doneMock}
      />
    );

    const sessionChip = screen.getByText("10:00");
    fireEvent.click(sessionChip);
    const assento = screen.getByTitle("A1");
    fireEvent.click(assento);

    const nameInput = screen.getByLabelText(/nome/i);
    fireEvent.change(nameInput, { target: { value: "John Doe" } });

    const confirmButton = screen.getByRole("button", { name: /confirmar/i });
    fireEvent.click(confirmButton);
  
    await waitFor(() => {
      expect(mockShowAlert).toHaveBeenCalledWith("Ocorreu um erro ao reservar assento", "error");
    });

  });
  
});
