import type {HTMLAttributes} from "react";
import "./Card.css";

type Props = HTMLAttributes<HTMLElement> & {
    imageSrc?: string;
    imageAlt?: string;
};

export default function Card({
                                 className = "",
                                 imageSrc,
                                 imageAlt = "",
                                 children,
                                 ...props
                             }: Props) {
    return (
        <section className={`card ${className}`.trim()} {...props}>
            {imageSrc && (
                <img
                    src={imageSrc}
                    alt={imageAlt}
                    className="card__image"
                />
            )}

            <div className="card__content">
                {children}
            </div>
        </section>
    );
}
