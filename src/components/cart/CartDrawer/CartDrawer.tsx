import Button from "../../ui/Button/Button";
import Card from "../../ui/Card/Card";
import { useNavigate } from "react-router-dom";
import "./CartDrawer.css";
import {useCart} from "../../../hooks/useCart";

export default function CartDrawer() {
    const { isOpen, close, items, total, remove, clear } = useCart();
    const navigate = useNavigate();
    return (
        <>
            <div
                className={`cartDrawer__backdrop ${isOpen ? "cartDrawer__backdrop--open" : ""}`}
                onClick={close}
                aria-hidden={!isOpen}
            />

            <aside className={`cartDrawer ${isOpen ? "cartDrawer--open" : ""}`} aria-label="Carrito">
                <header className="cartDrawer__header">
                    <h2 className="cartDrawer__title">Carrito</h2>
                    <button className="cartDrawer__close" onClick={close} aria-label="Cerrar carrito">
                        ✕
                    </button>
                </header>

                <div className="cartDrawer__content">
                    {items.length === 0 ? (
                        <p className="cartDrawer__empty">Tu carrito está vacío.</p>
                    ) : (
                        <div className="cartDrawer__list">
                            {items.map(({ book, qty }) => (
                                <Card key={book.id} className="cartDrawer__item">
                                    <div className="cartDrawer__itemRow">
                                        <img className="cartDrawer__itemImg" src={book.image} alt={book.title} />
                                        <div className="cartDrawer__itemInfo">
                                            <p className="cartDrawer__itemTitle">{book.title}</p>
                                            <p className="cartDrawer__itemMeta">
                                                {qty} × {book.price.toFixed(2)} €
                                            </p>
                                        </div>

                                        <button
                                            className="cartDrawer__remove"
                                            onClick={() => remove(book.id)}
                                            aria-label={`Eliminar ${book.title}`}
                                        >
                                            Eliminar
                                        </button>
                                    </div>
                                </Card>
                            ))}
                        </div>
                    )}
                </div>

                <footer className="cartDrawer__footer">
                    <div className="cartDrawer__totalRow">
                        <span>Total</span>
                        <strong>{total.toFixed(2)} €</strong>
                    </div>

                    <div className="cartDrawer__actions">
                        <Button variant="secondary" onClick={clear} disabled={items.length === 0}>
                            Vaciar
                        </Button>
                        <Button
                            variant="primary"
                            onClick={() => navigate("/checkout")}
                            disabled={items.length === 0}
                        >
                            Checkout
                        </Button>
                    </div>
                </footer>
            </aside>
        </>
    );
}
