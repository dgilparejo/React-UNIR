import { useNavigate } from "react-router-dom";
import Header from "../../components/layout/Header/Header";
import Footer from "../../components/layout/Footer/Footer";
import Card from "../../components/ui/Card/Card";
import Button from "../../components/ui/Button/Button";
import "./Checkout.css";
import {useCart} from "../../hooks/useCart";

export default function Checkout() {
    const navigate = useNavigate();
    const { items, total, clear } = useCart();

    const handlePay = () => {
        alert("Pedido realizado correctamente.");
        clear();
        navigate("/home", { replace: true });
    };

    return (
        <>
            <Header />

            <main className="checkout">
                <h1 className="checkout__title">Checkout</h1>

                {items.length === 0 ? (
                    <p className="checkout__empty">
                        No hay libros en el carrito. Vuelve a “Libros” para añadir alguno.
                    </p>
                ) : (
                    <Card className="checkout__card">
                        <h2 className="checkout__subtitle">Resumen del pedido</h2>

                        <ul className="checkout__list">
                            {items.map(({ book, qty }) => (
                                <li key={book.id} className="checkout__item">
                                    <img
                                        className="checkout__img"
                                        src={book.image}
                                        alt={`Portada de ${book.title}`}
                                    />

                                    <div className="checkout__info">
                                        <p className="checkout__bookTitle">{book.title}</p>
                                        <p className="checkout__meta">
                                            {qty} × {book.price.toFixed(2)} €
                                        </p>
                                    </div>

                                    <p className="checkout__lineTotal">
                                        {(qty * book.price).toFixed(2)} €
                                    </p>
                                </li>
                            ))}
                        </ul>

                        <div className="checkout__totalRow">
                            <span>Total</span>
                            <strong>{total.toFixed(2)} €</strong>
                        </div>

                        <div className="checkout__actions">
                            <Button variant="secondary" onClick={() => navigate("/home")}>
                                Seguir comprando
                            </Button>

                            <Button variant="primary" onClick={handlePay}>
                                Pagar
                            </Button>
                        </div>
                    </Card>
                )}
            </main>

            <Footer />
        </>
    );
}
