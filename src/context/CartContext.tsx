import { createContext, useMemo, useReducer } from "react";
import type { Book } from "../models/Book";

export type CartItem = {
    book: Book;
    qty: number;
};

type State = {
    isOpen: boolean;
    items: CartItem[];
};

type Action =
    | { type: "OPEN" }
    | { type: "CLOSE" }
    | { type: "TOGGLE" }
    | { type: "ADD"; payload: Book }
    | { type: "REMOVE"; payload: { id: string } }
    | { type: "CLEAR" };

const initialState: State = {
    isOpen: false,
    items: [],
};

function reducer(state: State, action: Action): State {
    switch (action.type) {
        case "OPEN":
            return { ...state, isOpen: true };
        case "CLOSE":
            return { ...state, isOpen: false };
        case "TOGGLE":
            return { ...state, isOpen: !state.isOpen };

        case "ADD": {
            const existing = state.items.find((it) => it.book.id === action.payload.id);
            const items = existing
                ? state.items.map((it) =>
                    it.book.id === action.payload.id
                        ? { ...it, qty: it.qty + 1 }
                        : it
                )
                : [...state.items, { book: action.payload, qty: 1 }];

            return { ...state, items, isOpen: true };
        }

        case "REMOVE":
            return {
                ...state,
                items: state.items.filter((it) => it.book.id !== action.payload.id),
            };

        case "CLEAR":
            return { ...state, items: [] };

        default:
            return state;
    }
}

export type CartContextValue = {
    isOpen: boolean;
    items: CartItem[];
    count: number;
    total: number;
    open: () => void;
    close: () => void;
    toggle: () => void;
    add: (book: Book) => void;
    remove: (id: string) => void;
    clear: () => void;
};

export const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
    const [state, dispatch] = useReducer(reducer, initialState);

    const value = useMemo<CartContextValue>(() => {
        const count = state.items.reduce((acc, it) => acc + it.qty, 0);
        const total = state.items.reduce(
            (acc, it) => acc + it.qty * it.book.price,
            0
        );

        return {
            isOpen: state.isOpen,
            items: state.items,
            count,
            total,
            open: () => dispatch({ type: "OPEN" }),
            close: () => dispatch({ type: "CLOSE" }),
            toggle: () => dispatch({ type: "TOGGLE" }),
            add: (book) => dispatch({ type: "ADD", payload: book }),
            remove: (id) => dispatch({ type: "REMOVE", payload: { id } }),
            clear: () => dispatch({ type: "CLEAR" }),
        };
    }, [state]);

    return (
        <CartContext.Provider value={value}>
            {children}
        </CartContext.Provider>
    );
}
