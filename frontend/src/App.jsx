import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";

import Layout from "./components/Layout";
import ListaProductos from "./pages/ListaProductos";
import DetalleProducto from "./pages/DetalleProducto";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<ListaProductos />} />
          <Route
            path="/producto/:id"
            element={<DetalleProducto />}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;