import { Navigate, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import About from "./pages/About";
import Bridge from "./pages/Bridge";
import Learn from "./pages/Learn";
import Hinto from "./pages/Hinto";
import Kapwa from "./pages/Kapwa";
import Legal from "./pages/Legal";
import Quiz from "./pages/Quiz";
import Pledge from "./pages/Pledge";
import Resources from "./pages/Resources";
import Admin from "./pages/Admin";

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="bridge" element={<Bridge />} />
        <Route path="learn" element={<Learn />} />
        <Route path="hinto" element={<Hinto />} />
        <Route path="kapwa" element={<Kapwa />} />
        <Route path="legal" element={<Legal />} />
        <Route path="quiz" element={<Quiz />} />
        <Route path="pledge" element={<Pledge />} />
        <Route path="resources" element={<Resources />} />
        <Route path="admin" element={<Admin />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
}
