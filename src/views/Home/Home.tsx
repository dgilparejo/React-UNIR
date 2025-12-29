import { useNavigate } from "react-router-dom";
import Card from "../../components/ui/Card/Card";
import "./Home.css";
import Header from "../../components/layout/Header/Header";
import Footer from "../../components/layout/Footer/Footer";
import type { Book } from "../../models/Book";
import SearchInput from "../../components/ui/SearchInput/SearchInput";

import cien from "../../assets/books/cien-anios-de-soledad.jpg";
import quijote from "../../assets/books/don-quijote-de-la-mancha.jpg";
import rosa from "../../assets/books/el-nombre-de-la-rosa.jpg";
import sombra from "../../assets/books/la-sombra-del-viento.jpg";
import patria from "../../assets/books/patria.jpg";
import rayuela from "../../assets/books/rayuela.png";
import george from "../../assets/books/1984.jpg";
import rebelion from "../../assets/books/rebelion-en-la-granja.jpg";
import cronica from "../../assets/books/cronica-de-una-muerte-anunciada.jpg";
import colera from "../../assets/books/el-amor-en-los-tiempos-del-colera.jpg";
import {useSearch} from "../../hooks/useSearch";

export default function Home() {
    const navigate = useNavigate();

    const books: Book[] = [
        { id: "1", title: "Cien años de soledad", author: "Gabriel García Márquez", price: 19.9, image: cien },
        { id: "2", title: "La sombra del viento", author: "Carlos Ruiz Zafón", price: 17.5, image: sombra },
        { id: "3", title: "Don Quijote de la Mancha", author: "Miguel de Cervantes", price: 21.0, image: quijote },
        { id: "4", title: "Rayuela", author: "Julio Cortázar", price: 16.0, image: rayuela },
        { id: "5", title: "El nombre de la rosa", author: "Umberto Eco", price: 18.25, image: rosa },
        { id: "6", title: "Patria", author: "Fernando Aramburu", price: 20.0, image: patria },
        { id: "7", title: "1984", author: "George Orwell", price: 14.9, image: george },
        { id: "8", title: "Rebelión en la granja", author: "George Orwell", price: 12.5, image: rebelion },
        { id: "9", title: "Crónica de una muerte anunciada", author: "Gabriel García Márquez", price: 13.75, image: cronica },
        { id: "10", title: "El amor en los tiempos del cólera", author: "Gabriel García Márquez", price: 18.0, image: colera },
    ];

    const { query, setQuery, filteredItems: filteredBooks } = useSearch(
        books,
        (book, q) => book.title.toLowerCase().includes(q)
    );

    const handleOpenBook = (book: Book) => {
        navigate(`/book/${book.id}`, { state: { book } });
    };

    return (
        <>
            <Header />
            <main className="home">
                <header className="home__topbar">
                    <h1 className="home__title">Libros</h1>

                    <SearchInput value={query} placeholder="Buscar por título…" onChange={setQuery} />
                </header>

                <section className="home__grid" aria-label="Listado de libros">
                    {filteredBooks.map((book) => (
                        <Card
                            key={book.id}
                            className="home__bookCard"
                            imageSrc={book.image}
                            imageAlt={`Portada de ${book.title}`}
                            onClick={() => handleOpenBook(book)}
                            role="button"
                            tabIndex={0}
                            onKeyDown={(e) => {
                                if (e.key === "Enter") handleOpenBook(book);
                            }}
                        >
                            <h3 className="home__bookTitle">{book.title}</h3>
                            <p className="home__bookAuthor">{book.author}</p>

                            <div className="home__bookBottom">
                                <p className="home__bookPrice">{book.price.toFixed(2)} €</p>

                            </div>
                        </Card>
                    ))}

                    {filteredBooks.length === 0 && (
                        <p className="home__empty">No hay resultados para “{query}”.</p>
                    )}
                </section>
            </main>
            <Footer />
        </>
    );
}
