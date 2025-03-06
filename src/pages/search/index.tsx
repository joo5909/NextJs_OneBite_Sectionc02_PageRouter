import SearchableLayout from '@/components/searchable-layout';
import { ReactNode, useEffect, useState } from 'react';
import BookItem from '@/components/book-item';
import fetchBooks from '@/lib/fetch-books';
import { BookData } from '@/types';
import { useRouter } from 'next/router';
import Head from 'next/head';
//SSR
/*
export const getServerSideProps = async (context : GetServerSidePropsContext) => {

    const q = context.query.q as string;

    const searchBooks = await fetchBooks(q);
        
    return {
        props: {
            searchBooks
        }
    }  
};


export default function Page({searchBooks}: InferGetServerSidePropsType<typeof getServerSideProps>) {
    
    return (
        <div>     
            {searchBooks.map((book) => <BookItem key={book.id} {...book} />)}
        </div>
    );
}
*/

//쿼리스트링이 있는 경우는 SSG getStaticProps를 사용할 수 없다.
//빌드할때 해당 쿼리스트링을 알수 없기때문이다. 그래서 다음과 같이 작업한다.
//이렇게 개발하면 Static + CSR 하이브리드 형식이 되고, 검색 데이터를 제외한 나머지가 사전 랜더링된다.

export default function Page() {

    const [searchBooks, setSearchBooks] = useState<BookData[]>([]);

    const router = useRouter();
    const q = router.query.q;

    const fetchSearchBooks = async () => {
        const searchBooks = await fetchBooks(q as string);
        setSearchBooks(searchBooks);
    }

    useEffect(() => {
        if (q) {
            fetchSearchBooks();
        }

    }, [q]);

    return (
        <div>
            <Head>
                <title>한입북스 - 검색결과</title>
                <meta property='og:image' content="/thumbnail.png" />
                <meta property='og:title' content="한입북스" />
                <meta property='og:description' content="한입북스입니다" />
            </Head>
            {searchBooks.map((book) => <BookItem key={book.id} {...book} />)}
        </div>
    );
}

Page.getSearchLayout = (page: ReactNode) => {
    return (
        <SearchableLayout>{page}</SearchableLayout>
    );
}