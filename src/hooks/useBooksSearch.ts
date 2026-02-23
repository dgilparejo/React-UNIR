// src/hooks/useBooksSearch.ts
import { useEffect, useMemo, useRef, useState } from "react";
import type { Book, BookSearchRequest } from "../api";
import { CloudGatewayService } from "../api";

export type SearchParams = {
    title?: string;
    author?: string;
    category?: string;
    isbn?: string;
    rating?: number;
    visible?: boolean;
    publicationDate?: string; // YYYY-MM-DD (tu API usa string)
    price?: number;
    stock?: number;
};

export function useBooksSearch(params: SearchParams) {
    const [items, setItems] = useState<Book[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const reqId = useRef(0);

    const stable = useMemo(() => {
        // normaliza strings
        const clean = (s?: string) => {
            const v = (s ?? "").trim();
            return v.length ? v : undefined;
        };

        return {
            title: clean(params.title),
            author: clean(params.author),
            category: clean(params.category),
            isbn: clean(params.isbn),
            publicationDate: clean(params.publicationDate),
            rating: params.rating ?? undefined,
            visible: params.visible ?? true,
            price: params.price ?? undefined,
            stock: params.stock ?? undefined,
        };
    }, [
        params.title,
        params.author,
        params.category,
        params.isbn,
        params.publicationDate,
        params.rating,
        params.visible,
        params.price,
        params.stock,
    ]);

    useEffect(() => {
        const current = ++reqId.current;

        const t = setTimeout(async () => {
            setLoading(true);
            setError(null);

            try {
                const body: BookSearchRequest = {
                    title: stable.title,
                    author: stable.author,
                    category: stable.category,
                    isbn: stable.isbn,
                    rating: stable.rating,
                    visible: stable.visible,
                    publicationDate: stable.publicationDate,
                    price: stable.price,
                    stock: stable.stock,
                };

                const res = await CloudGatewayService.searchBooksViaPost(body);
                if (current === reqId.current) setItems(res ?? []);
            } catch (e: any) {
                if (current === reqId.current) {
                    setError(e?.message ?? "Error buscando libros");
                    setItems([]);
                }
            } finally {
                if (current === reqId.current) setLoading(false);
            }
        }, 250);

        return () => clearTimeout(t);
    }, [stable]);

    return { items, loading, error };
}