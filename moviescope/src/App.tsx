import "./App.css";
import { Route, Routes } from "react-router-dom";
import { Header } from "./layout/Header";
import { HomePage } from "./pages/HomePage";

function App() {
  return (
    <>
      <Header />
      <HomePage />
    </>
  );
}

export default App;
