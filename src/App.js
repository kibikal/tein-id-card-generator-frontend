import React from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import DataTablePage from "./components/DataTablePage";
import CardForm from "./components/CardForm";
import Header from "./components/Header";
import Footer from "./components/Footer";

function App() {
  return (
    <div className="app-main">
      <Header />
      <Routes>
        <Route path="/" element={<CardForm />} />
        <Route path="/registered" element={<DataTablePage />} />
        <Route path="*" element=<h1>Page not found</h1> />
      </Routes>

      <div className="footer">
        <Footer />
      </div>
    </div>
  );
}

export default App;
