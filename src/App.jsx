import Home from "./pages/Home";
import Result from "./pages/Result";
import BuyCredit from "./pages/BuyCredit";
import { Route, Routes } from "react-router-dom";
import NavBar from "./components/NavBar";
import Login from "./components/Login";
import Footer from "./components/Footer";
import { useContext } from "react";
import { AppContext } from "./context/AppContext";
import toast, { Toaster } from 'react-hot-toast';

const App = () => {
  const { showLogin } = useContext(AppContext);

  return (
    <div className="px-4 sm:px-10 md:px-14 lg:px-28 min-h-screen bg-gradient-to-b from-teal-50 to-orange-50">
      <Toaster position="top-right" reverseOrder={false} />
      <NavBar />
      {showLogin && <Login />}
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/result' element={<Result />} />
        <Route path='/buy-credit' element={<BuyCredit />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
