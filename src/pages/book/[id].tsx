import style from '@/pages/book/[id].module.css';
import fetchOneBook from '@/lib/fetch-one-books';
import { GetStaticPropsContext, InferGetStaticPropsType } from 'next';
import { useRouter } from 'next/router';
import Head from 'next/head';

/*
//SSR
export const getServerSideProps = async (context : GetServerSidePropsContext) => {

    const id = context.params!.id;

    const oneBook = await fetchOneBook(Number(id));
        
    return {
        props: {
            oneBook
        }
    }  
};

export default function Page({oneBook}: InferGetServerSidePropsType<typeof getServerSideProps>) {
    if (!oneBook) {
        return <div>책 정보가 없습니다.</div>;
    }

    const {
        title,
        subTitle,
        description,
        author,
        publisher,
        coverImgUrl,
    } = oneBook;

    return (
        <div className={style.container}>
            <div
                className={style.cover_img_container}
                style={{ backgroundImage: `url('${coverImgUrl}')` }}>
                <img src={coverImgUrl
                    ? coverImgUrl
                    : "/images/no-image.png"} alt={title} />
            </div>
            <div className = {style.title}>{title}</div>
            <div className = {style.subTitle}>{subTitle}</div>        
            <div className = {style.author}>{author} | {publisher}</div>
            <div className = {style.description}>{description}</div>

        </div>
    );
}
*/

//SSG
//동적 라우팅에서 SSG를 사용할때 파라미터 값에 대한 사전 명시가 필요함 (빌드시 필요)
export const getStaticPaths = async () => {
    return {
        paths: [
            { params: { id: '1' } },
            { params: { id: '2' } },
            { params: { id: '3' } },
        ],
        fallback: true //false시 위의 값이 아닌 경우 404 에러 발생
        // false  : 404 
        // blocking : 서버사이드 렌더링
        // true : SSR + 데이터가 없는 풀백 상태 페이지
    };
};

export const getStaticProps = async (context: GetStaticPropsContext) => {

    const id = context.params!.id;

    const oneBook = await fetchOneBook(Number(id));

    return {
        props: {
            oneBook
        }
    }
};

export default function Page({ oneBook }: InferGetStaticPropsType<typeof getStaticProps>) {

    const router = useRouter();

    //fallback 이면 빌드시 빈값으로 랜더링 되기 때문에 초기값 잡아줘야 SEO 처리됨
    if (router.isFallback) {
        return (
            <>
                <Head>
                    <title>한입북스</title>
                    <meta property='og:image' content="/thumbnail.png" />
                    <meta property='og:title' content="한입북스" />
                    <meta property='og:description' content="한입북스입니다" />
                </Head>
                <div>로딩중입니다</div>
            </>

        );
    }
    if (!oneBook) {
        return <div>책 정보가 없습니다.</div>;
    }

    const {
        title,
        subTitle,
        description,
        author,
        publisher,
        coverImgUrl,
    } = oneBook;

    return (
        <>
            <Head>
                <title>{`한입북스 - ${title}`}</title>
                <meta property='og:image' content={coverImgUrl} />
                <meta property='og:title' content={title} />
                <meta property='og:description' content={description} />
            </Head>
            <div className={style.container}>
                <div
                    className={style.cover_img_container}
                    style={{ backgroundImage: `url('${coverImgUrl}')` }}>
                    <img src={coverImgUrl
                        ? coverImgUrl
                        : "/images/no-image.png"} alt={title} />
                </div>
                <div className={style.title}>{title}</div>
                <div className={style.subTitle}>{subTitle}</div>
                <div className={style.author}>{author} | {publisher}</div>
                <div className={style.description}>{description}</div>

            </div>
        </>

    );
}