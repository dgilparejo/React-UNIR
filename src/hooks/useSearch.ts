import { useMemo, useState } from "react";

export function useSearch<T>(
    items: T[],
    predicate: (item: T, query: string) => boolean
) {
    const [query, setQuery] = useState("");

    const filteredItems = useMemo(() => {
        const q = query.trim().toLowerCase();
        if (!q) return items;
        return items.filter((item) => predicate(item, q));
    }, [items, query, predicate]);

    return {
        query,
        setQuery,
        filteredItems,
    };
}
