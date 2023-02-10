import { Route, Routes } from "react-router-dom";
import { Input } from "../main/input/input";
import { Cards } from "../main/cards/cards";

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Input />}></Route>
      <Route path="/cards/:nameResearch" element={<Cards />}></Route>
    </Routes>
  );
};