import type { ButtonHTMLAttributes } from "react";
import "./Button.css";

type Variant = "primary" | "secondary";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
    variant?: Variant;
};

export default function Button({
                                   variant = "primary",
                                   className = "",
                                   ...props
                               }: Props) {
    return (
        <button
            className={`button button--${variant} ${className}`.trim()}
            {...props}
        />
    );
}
