// import React from "react";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import { NavbarComponent } from "./components/NavbarComponent";
// import HomePage from "./pages/Homepage";
// import AboutPage from "./pages/AboutPage";
// import ContributePage from "./pages/ContributePage";
// import LoginPage from "./pages/LoginPage";
// import SignupPage from "./pages/SignupPage";
// import SearchPage from "./pages/SearchPage";
// import PremiumPage from "./pages/PremiumPage.jsx";
// import ThankYouPage from "./pages/ThankyouPage";
// import { AuthProvider } from "./context/AuthContext.jsx";

// function App() {
//   const [search, setSearch] = React.useState("");

//   return (
//     <Router>
//       <Routes>
//         <Route path="/" element={<HomePage />} />
//         <Route path="/about" element={<AboutPage />} />
//         <Route path="/contribute" element={<ContributePage />} />
//         <Route path="/login" element={<LoginPage />} />
//         <Route path="/signup" element={<SignupPage />} />
//         <Route path="/search" element={<SearchPage />} />
//         <Route path="/success" element={<ThankYouPage  />} />
//         <Route path="/premium" element={<PremiumPage />} />
//       </Routes>
//     </Router>
//   );
// }

// export default App;


import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { NavbarComponent } from "./components/NavbarComponent";
import HomePage from "./pages/Homepage";
import AboutPage from "./pages/AboutPage";
import ContributePage from "./pages/ContributePage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import SearchPage from "./pages/SearchPage";
import PremiumPage from "./pages/PremiumPage.jsx";
import ThankYouPage from "./pages/ThankyouPage";
import ProfessionPage from "./pages/ProfessionPage";
import ProtectedRoute from "./components/ProtectedRoute";
import { AuthProvider } from "./context/AuthContext";

function App() {
  const [search, setSearch] = React.useState("");

  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contribute" element={<ContributePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/professions" element={<ProfessionPage />} />
          <Route path="/success" element={<ThankYouPage />} />

          {/* 🔒 Protected route */}
          <Route
            path="/premium"
            element={
              <ProtectedRoute>
                <PremiumPage />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
