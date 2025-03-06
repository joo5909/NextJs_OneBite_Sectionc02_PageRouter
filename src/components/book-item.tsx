import Link from "next/link";
import style from "@/components/book-item.module.css";
import { BookData } from "@/types";

export default function BookItem({
    id,
    title,
    subTitle,
    author,
    publisher,
    coverImgUrl
}: BookData) {
    return (
        <Link className={style.container} href={`/book/${id}`} >
            <img className = {style.img}
            src={coverImgUrl
                ? coverImgUrl
                : "/images/no-image.png"} alt={title} />
            <div>
                <div className = {style.title}>{title}</div>
                <div className = {style.subTitle}>{subTitle}</div>
                <br />
                <div className = {style.author}>{author} | {publisher}</div>
            </div>
        </Link>
    );
}
