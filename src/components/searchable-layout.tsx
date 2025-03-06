
import style from "@/components/searchable-layout.module.css";
import { useRouter } from "next/router";
import { ReactNode, useEffect, useState } from "react";

export default function SearchableLayout({
    children
}: {
    children: ReactNode;
}) {

    const router = useRouter();

    const [search, setSearch] = useState<string>("");

    const q = router.query.q as string;

    const onChangeSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(event.target.value);
    }

    const onSubmit = () => {
        if (search) {
            router.push(`/search?q=${search}`);
        }
        else {
            return;
        }
    }

    const onKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter") {
            onSubmit();
        }
    }

    useEffect(() => {
        setSearch(q || "");
    }, [q]);

    return (
        <div>
            <div className={style.searchbar_container}>
                <input
                    type="text"
                    value={search}
                    onKeyDown={onKeyDown}
                    onChange={onChangeSearch}
                    placeholder="검색어를 입력하세요" />
                <button onClick={onSubmit}>검색</button>
            </div>
            {children}
        </div>
    );
}
