import { Link } from "react-router-dom";

function Header() {
  return (
    <header className="encabezado">
      <div>
        <h1>Tech Store</h1>
        <p>Catálogo de productos tecnológicos</p>
      </div>

      <nav>
        <Link to="/">Inicio</Link>
      </nav>
    </header>
  );
}

export default Header;