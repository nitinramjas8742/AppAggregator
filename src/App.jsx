import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { NavbarComponent } from "./components/NavbarComponent";
import HomePage from "./pages/Homepage";
import AboutPage from "./pages/AboutPage";
import ContributePage from "./pages/ContributePage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import SearchPage from "./pages/SearchPage";
import LoginNotWorking from "./pages/LoginNotWorking";
import ThankYouPage from "./pages/ThankyouPage";

function App() {
  const [search, setSearch] = React.useState("");

  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contribute" element={<ContributePage />} />
        <Route path="/login" element={<LoginPage />} />
        {/* <Route path="/login" element={<LoginNotWorking/>} /> */}
        {/* <Route path="/LoginNotWorking" element={<LoginNotWorking/>} /> */}
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/success" element={<ThankYouPage  />} />
      </Routes>
    </Router>
  );
}

export default App;
