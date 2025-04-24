import { CssBaseline, ThemeProvider } from "@mui/material";
import { useState } from "react";
import { ShowAlert } from "./alert/ShowAlert";
import { CheckoutPage } from "./page/CheckoutPage";
import { SelectionPage } from "./page/SelectionPage";
import { darkTheme } from "./theme/dark";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PrivateRoute from './page/Private/PrivateRoute';
import { Unauthorized } from './page/Unauthorized';
import Admin from './page/Private/Admin';

export function App() {
  const [selectedFilm, setSelectedFilm] = useState();
  const [showAlert, setshowAlert] = useState();

  const isAuthenticated = true; // acessar rota privada

  return (
    <ThemeProvider theme={darkTheme}>
      {showAlert && <ShowAlert message={showAlert.message} severity={showAlert.severity} onClose={() => setshowAlert()} />}
      <CssBaseline />
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              selectedFilm ? (
                <CheckoutPage
                  selectedFilm={selectedFilm}
                  showAlert={(message, severity) =>
                    setshowAlert({ message, severity })
                  }
                  done={() => setSelectedFilm(undefined)}
                />
              ) : (
                <SelectionPage
                  setSelectedFilm={setSelectedFilm}
                  showAlert={(message, severity) =>
                    setshowAlert({ message, severity })
                  }
                />
              )
            }
          />
          <Route path="/unauthorized" element={<Unauthorized />} />
          <Route
            path="/admin"
            element={
              <PrivateRoute isAuthenticated={isAuthenticated}>
                <Admin />
              </PrivateRoute>
            }
          />
        </Routes>
      </Router>
    </ThemeProvider>
  )
}
