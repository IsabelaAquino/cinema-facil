import { act, render, screen } from "@testing-library/react";
import axios from "axios";
import { describe, expect, it, vi } from "vitest";
import { App } from "../App";
import BoxFilmList from "./BoxFilmList";
import { FilmsService } from "../services/FilmsService";
import { SelectionPage } from "./SelectionPage";


describe("Selection Page test", () => {
  const mockSetSelectedFilm = vi.fn();
  
  it("renders correctly", async () => {
    vi.spyOn(axios, "get").mockResolvedValue({ data: [] });

    await act(() => render(<App />));

    const titleElement = screen.getByText("Cinema Fácil")
    expect(titleElement).toBeInTheDocument();
  });

  it("renders with display films", async () => {

    const mockFilms = [
      {
        id: "1",
        name: "Film 1",
        url: "https://foo.com/bar.jpg"
      },
      {
        id: "2",
        name: "Film 2",
        url: "https://foo.com/bar.jpg"
      },
      {
        id: "3",
        name: "Film 3",
        url: "https://foo.com/bar.jpg"
      },
    ];
  

    await act(() => render(<App />));
    await act(() => render(<BoxFilmList films={mockFilms} setSelectedFilm={mockSetSelectedFilm} />));
    const filmsElements = screen.getAllByTestId("film-display");
    expect(filmsElements).toHaveLength(3);

    expect(filmsElements.map(f => f.getElementsByTagName("h6")[0].innerHTML))
      .toEqual([
        "Film 1",
        "Film 2",
        "Film 3"
      ]);
  });

  it("calls setSelectedFilm when a film is clicked", () => {
    const mockSetSelectedFilm = vi.fn();
  
    render(
      <BoxFilmList
        films={[{ id: "1", name: "Film 1", url: "https://..." }]}
        setSelectedFilm={mockSetSelectedFilm}
      />
    );
  
    const filmCard = screen.getByTestId("film-display");
    filmCard.click();
  
    expect(mockSetSelectedFilm).toHaveBeenCalledWith({
      id: "1", name: "Film 1", url: "https://..."
    });
  });
  
  it("shows loading skeletons when films are not loaded", () => {
    render(
      <BoxFilmList films={[]} setSelectedFilm={mockSetSelectedFilm} />
    );
    expect(screen.getByRole("progressbar")).toBeInTheDocument();
    expect(screen.getAllByText((_, node) => node?.tagName === "SPAN").length).toBeGreaterThan(0); // Skeletons
  });
  
  it("shows alert if fetch fails", async () => {
    const mockShowAlert = vi.fn();
  
    vi.spyOn(FilmsService, "listFilms").mockRejectedValue(new Error("API error"));
  
    render(
      <SelectionPage setSelectedFilm={vi.fn()} showAlert={mockShowAlert} />
    );

    await screen.findByText("Qual filme deseja assistir?");
    
    expect(mockShowAlert).toHaveBeenCalledWith(
      "Ocorreu um erro ao carregar os filmes", "error"
    );
  });
  
});