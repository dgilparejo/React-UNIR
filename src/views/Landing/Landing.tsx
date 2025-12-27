import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../components/ui/Button/Button";
import Card from "../../components/ui/Card/Card";
import "./Landing.css";

export default function Landing() {
    const navigate = useNavigate();
    const [secondsLeft, setSecondsLeft] = useState(5);

    useEffect(() => {
        const intervalId = window.setInterval(() => setSecondsLeft((s) => s - 1), 1000);
        const timeoutId = window.setTimeout(() => navigate("/home", { replace: true }), 5000);

        return () => {
            clearInterval(intervalId);
            clearTimeout(timeoutId);
        };
    }, [navigate]);

    return (
        <main className="landing">
            <section className="landing__panel">
                <header className="landing__hero">
                    <h1 className="landing__title">Relatos de Papel</h1>
                    <p className="landing__subtitle">
                        Tu librería digital y física. Descubre, guarda y gestiona tus lecturas favoritas.
                    </p>
                </header>

                <div className="landing__features">
                    <Card className="landing__featureCard">
                        <h3 className="landing__featureTitle">Catálogo actualizado</h3>
                        <p className="landing__featureText">
                            Novedades y clásicos siempre a mano.
                        </p>
                    </Card>

                    <Card className="landing__featureCard">
                        <h3 className="landing__featureTitle">Búsqueda rápida</h3>
                        <p className="landing__featureText">
                            Encuentra libros por título o autor en segundos.
                        </p>
                    </Card>

                    <Card className="landing__featureCard">
                        <h3 className="landing__featureTitle">Carrito integrado</h3>
                        <p className="landing__featureText">
                            Añade libros y revisa tu compra de forma sencilla.
                        </p>
                    </Card>

                    <Card className="landing__featureCard">
                        <h3 className="landing__featureTitle">Favoritos</h3>
                        <p className="landing__featureText">
                            Guarda los libros que te interesan para más adelante.
                        </p>
                    </Card>
                </div>

                <div className="landing__actions">
                    <Button variant="primary" onClick={() => navigate("/home", { replace: true })}>
                        Entrar ahora
                    </Button>

                    <span className="landing__hint">
            Entrando automáticamente en {Math.max(secondsLeft, 0)}s…
          </span>
                </div>

                <footer className="landing__footer">
                    <span>© 2025 Relatos de Papel</span>
                    <span>Frontend con React</span>
                </footer>
            </section>
        </main>
    );
}
