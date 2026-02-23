import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Card from "../../components/ui/Card/Card";
import "./Home.css";
import Header from "../../components/layout/Header/Header";
import Footer from "../../components/layout/Footer/Footer";
import SearchInput from "../../components/ui/SearchInput/SearchInput";
import { useBooksSearch } from "../../hooks/useBooksSearch";
import type { Book } from "../../api";

// imágenes
import img1984 from "../../assets/books/1984.jpg";
import imgCien from "../../assets/books/cien-anios-de-soledad.jpg";
import imgCronica from "../../assets/books/cronica-de-una-muerte-anunciada.jpg";
import imgQuijote from "../../assets/books/don-quijote-de-la-mancha.jpg";
import imgColera from "../../assets/books/el-amor-en-los-tiempos-del-colera.jpg";
import imgRosa from "../../assets/books/el-nombre-de-la-rosa.jpg";
import imgSombra from "../../assets/books/la-sombra-del-viento.jpg";
import imgPatria from "../../assets/books/patria.jpg";
import imgRayuela from "../../assets/books/rayuela.png";
import imgRebelion from "../../assets/books/rebelion-en-la-granja.jpg";

const bookImages = [
    imgCien,
    imgSombra,
    imgQuijote,
    imgRayuela,
    imgRosa,
    imgPatria,
    img1984,
    imgRebelion,
    imgCronica,
    imgColera,
];

function pickImage(bookId?: number) {
    if (!bookId) return bookImages[0];
    return bookImages[(bookId - 1) % bookImages.length];
}

export default function Home() {
    const navigate = useNavigate();

    // búsqueda rápida
    const [q, setQ] = useState("");

    // filtros avanzados
    const [category, setCategory] = useState("");
    const [isbn, setIsbn] = useState("");
    const [rating, setRating] = useState<string>(""); // input string -> number
    const [visible, setVisible] = useState(true);
    const [publicationDate, setPublicationDate] = useState("");
    const [price, setPrice] = useState<string>("");
    const [stock, setStock] = useState<string>("");

    const { items: books, loading, error } = useBooksSearch({
        // q lo mandamos a title+author para full-text/autocomplete en backend
        title: q,
        author: q,

        category: category || undefined,
        isbn: isbn || undefined,
        visible,

        rating: rating ? Number(rating) : undefined,
        publicationDate: publicationDate || undefined,
        price: price ? Number(price) : undefined,
        stock: stock ? Number(stock) : undefined,
    });

    const handleOpenBook = (book: Book) => {
        if (!book.id) return;
        navigate(`/book/${book.id}`, { state: { book } });
    };

    return (
        <>
            <Header />
            <main className="home">
                <header className="home__topbar">
                    <h1 className="home__title">Libros</h1>
                    <SearchInput value={q} placeholder="Buscar (título o autor)..." onChange={setQ} />
                </header>

                {/* Filtros (puedes estilarlos luego) */}
                <section className="home__filters" aria-label="Filtros">
                    <input
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        placeholder="Categoría"
                    />
                    <input value={isbn} onChange={(e) => setIsbn(e.target.value)} placeholder="ISBN" />

                    <input
                        value={rating}
                        onChange={(e) => setRating(e.target.value)}
                        placeholder="Rating mínimo (>=)"
                        inputMode="decimal"
                    />

                    <label style={{ display: "flex", gap: 8, alignItems: "center" }}>
                        <input
                            type="checkbox"
                            checked={visible}
                            onChange={(e) => setVisible(e.target.checked)}
                        />
                        Visible
                    </label>

                    <input
                        type="date"
                        value={publicationDate}
                        onChange={(e) => setPublicationDate(e.target.value)}
                    />

                    <input
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        placeholder="Price exact"
                        inputMode="decimal"
                    />

                    <input
                        value={stock}
                        onChange={(e) => setStock(e.target.value)}
                        placeholder="Stock exact"
                        inputMode="numeric"
                    />
                </section>

                {loading && <p className="home__hint">Buscando…</p>}
                {error && <p className="home__error">{error}</p>}

                <section className="home__grid" aria-label="Listado de libros">
                    {books.map((book) => {
                        const idKey = book.id ?? `${book.title}-${book.isbn}`;
                        const title = book.title ?? "Sin título";
                        const author = book.author ?? "Autor desconocido";
                        const priceValue = book.price;

                        return (
                            <Card
                                key={idKey}
                                className="home__bookCard"
                                imageSrc={pickImage(book.id)}
                                imageAlt={`Portada de ${title}`}
                                onClick={() => handleOpenBook(book)}
                                role="button"
                                tabIndex={0}
                                onKeyDown={(e) => {
                                    if (e.key === "Enter") handleOpenBook(book);
                                }}
                            >
                                <h3 className="home__bookTitle">{title}</h3>
                                <p className="home__bookAuthor">{author}</p>

                                <div className="home__bookBottom">
                                    <p className="home__bookPrice">
                                        {typeof priceValue === "number" ? `${priceValue.toFixed(2)} €` : "— €"}
                                    </p>
                                </div>
                            </Card>
                        );
                    })}

                    {!loading && books.length === 0 && (
                        <p className="home__empty">No hay resultados.</p>
                    )}
                </section>
            </main>
            <Footer />
        </>
    );
}