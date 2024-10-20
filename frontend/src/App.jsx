//import { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
//import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Ylatunniste from "./components/Ylatunniste";
import Tietoa from "./pages/Tietoa";
import GlobalState from "./context/GlobalState";
import Urheilija from "./components/Urheilija";
import LisaaUrheilija from "./components/LisaaUrheilija";  
import PaivitaUrheilija from "./components/PaivitaUrheilija"; 
//import Urheilijatieto from "./components/Urheilijatieto";  

function App() {
  return (
    <>
      <GlobalState>
        <Router>
          <div className="App">
            <Ylatunniste turvataso="keskisuuri" />
            <div className="container">
              <Routes>
                  <Route
                    path="/"
                    element={<Urheilija />}
                  />
                  <Route
                    path="/create"
                    element={<LisaaUrheilija />}
                  />
                  <Route
                    path="/update/:id"
                    element={<PaivitaUrheilija />}
                  />
                  <Route
                    path="/delete/:id"
                    element={<Urheilija />} 
                  />
                <Route path="/tietoa" 
                element={<Tietoa />} 
                />
              </Routes>
            </div>
          </div>
        </Router>
      </GlobalState>
    </>
  );
}

export default App;
