import { useNavigate } from "react-router-dom";
import "./Header.css";
import { useCart } from "../../../hooks/useCart";
import Button from "../../ui/Button/Button";

export default function Header() {
    const navigate = useNavigate();
    const { toggle, count } = useCart();

    return (
        <header className="header">
            <div className="header__content">
                <h1
                    className="header__brand"
                    onClick={() => navigate("/")}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                        if (e.key === "Enter") navigate("/");
                    }}
                >
                    Relatos de Papel
                </h1>

                <nav className="header__nav">
                    <Button variant="link" onClick={() => navigate("/")}>
                        Acceso
                    </Button>

                    <Button variant="link" onClick={() => navigate("/home")}>
                        Libros
                    </Button>

                    <Button
                        variant="link"
                        className="header__cartBtn"
                        onClick={toggle}
                    >
                        Carrito
                        {count > 0 && <span className="header__badge">{count}</span>}
                    </Button>
                </nav>
            </div>
        </header>
    );
}
