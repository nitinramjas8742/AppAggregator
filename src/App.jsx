import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { NavbarComponent } from "./components/NavbarComponent";
import HomePage from "./pages/Homepage";
import AboutPage from "./pages/AboutPage";
import ContributePage from "./pages/ContributePage";

function App() {
  const [search, setSearch] = React.useState("");

  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contribute" element={<ContributePage />} />
      </Routes>
    </Router>
  );
}

export default App;
