import type { ChangeEvent } from "react";
import "./SearchInput.css";

type Props = {
    value: string;
    placeholder?: string;
    onChange: (value: string) => void;
};

export default function SearchInput({
                                        value,
                                        placeholder = "Buscar…",
                                        onChange,
                                    }: Props) {
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        onChange(e.target.value);
    };

    return (
        <div className="search">
            <input
                className="search__input"
                type="text"
                value={value}
                placeholder={placeholder}
                onChange={handleChange}
            />
        </div>
    );
}
