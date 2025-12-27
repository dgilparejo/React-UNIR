import type { HTMLAttributes } from "react";
import "./Card.css";

type Props = HTMLAttributes<HTMLElement>;

export default function Card({ className = "", ...props }: Props) {
    return <section className={`card ${className}`.trim()} {...props} />;
}
