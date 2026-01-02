import {useLocation, useNavigate, useParams} from "react-router-dom";
import type { Book } from "../../models/Book";
import Header from "../../components/layout/Header/Header";
import Footer from "../../components/layout/Footer/Footer";
import Card from "../../components/ui/Card/Card";
import Button from "../../components/ui/Button/Button";
import "./BookDetail.css";
import {useCart} from "../../hooks/useCart";

type LocationState = {
    book?: Book;
};

export default function BookDetail() {
    const { id } = useParams<{ id: string }>();
    const location = useLocation();
    const state = location.state as LocationState | null;
    const navigate = useNavigate();

    const book = state?.book;
    const { add } = useCart();

    return (
        <>
            <Header />

            <main className="book">
                {!book ? (
                    <p className="book__empty">
                        No hay datos del libro seleccionado.
                    </p>
                ) : (
                    <Card className="book__card">
                        <div className="book__top">
                            <Button
                                variant="link"
                                className="button--back"
                                onClick={() => navigate(-1)}
                            >
                                <span className="button--backIcon">←</span>
                                <span>Volver</span>
                            </Button>
                        </div>
                        <img
                            src={book.image}
                            alt={`Portada de ${book.title}`}
                            className="book__image"
                        />

                        <div className="book__info">
                            <h1 className="book__title">{book.title}</h1>
                            <p className="book__author">{book.author}</p>
                            <p className="book__price">{book.price.toFixed(2)} €</p>
                            <p className="book__id">Código: {id}</p>

                            <div className="book__actions">
                                <Button variant="primary" onClick={() => add(book)}>
                                    Añadir al carrito
                                </Button>
                            </div>
                        </div>
                    </Card>
                )}
            </main>

            <Footer />
        </>
    );
}
