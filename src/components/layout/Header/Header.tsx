import {useNavigate} from "react-router-dom";
import "./Header.css";
import {useCart} from "../../../hooks/useCart";

export default function Header() {
    const navigate = useNavigate();
    const {toggle, count} = useCart();

    return (
        <header className="header">
            <div className="header__content">
                <h1 className="header__brand" onClick={() => navigate("/home")}>
                    Relatos de Papel
                </h1>

                <nav className="header__nav">
                    <button className="header__link" onClick={() => navigate("/")} >
                        Acceso
                    </button>

                    <button className="header__link" onClick={() => navigate("/home")}>
                        Libros
                    </button>

                    <button className="header__link header__cartBtn" onClick={toggle}>
                        Carrito
                        {count > 0 && <span className="header__badge">{count}</span>}
                    </button>
                </nav>
            </div>
        </header>
    );
}
