import { ReactNode } from 'react';
import style from './index.module.css';
import SearchableLayout from '@/components/searchable-layout';
import BookItem from '@/components/book-item';
import { InferGetStaticPropsType } from 'next';
import fetchBooks from '@/lib/fetch-books';
import fetchRandomBooks from '@/lib/fetch-randombooks';
import Head from 'next/head';

/*
// SSR 방식 호출
export const getServerSideProps = async () => {


  const [allBooks, randomBooks] = await Promise.all([
    fetchBooks(),
    fetchRandomBooks()
  ]);

  return {
    props: {
      allBooks,
      randomBooks
    }
  }

};

export default function Home({ allBooks, randomBooks }: InferGetServerSidePropsType<typeof getServerSideProps>) {

  return (
    <div className={style.container}>
      <section>
        <h3>지금 추천하는 도서</h3>
        {randomBooks.map((book) => <BookItem key={book.id} {...book} />)}
      </section>
      <section>
        <h3>등록된 모든 도서</h3>
        {allBooks.map((book) => <BookItem key={book.id} {...book} />)}
      </section>
    </div>
  );
}
*/

// SSG 방식 호출
export const getStaticProps = async () => {

  const [allBooks, randomBooks] = await Promise.all([
    fetchBooks(),
    fetchRandomBooks()
  ]);

  return {
    props: {
      allBooks,
      randomBooks
    }
  }

};

export default function Home({ allBooks, randomBooks }: InferGetStaticPropsType<typeof getStaticProps>) {

  return (
    <>
      <Head>
        <title>한입북스</title>
        <meta property='og:image' content="/thumbnail.png" />
        <meta property='og:title' content="한입북스" />
        <meta property='og:description' content="한입북스입니다" />
      </Head>
      <div className={style.container}>
        <section>
          <h3>지금 추천하는 도서</h3>
          {randomBooks.map((book) => <BookItem key={book.id} {...book} />)}
        </section>
        <section>
          <h3>등록된 모든 도서</h3>
          {allBooks.map((book) => <BookItem key={book.id} {...book} />)}
        </section>
      </div>
    </>

  );
}

Home.getSearchLayout = (page: ReactNode) => {
  return (
    <SearchableLayout>{page}</SearchableLayout>
  );
}