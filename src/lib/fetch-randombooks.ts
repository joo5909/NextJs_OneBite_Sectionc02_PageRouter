import { BookData } from "@/types";

export default async function fetchRandomBooks(): Promise<BookData[]> {
  //const url = "http://localhost:12345/book/random";
  const url = `https://next-js-one-bite-books-server.vercel.app/book/random`;

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error("서버 상태가 이상합니다.");
    }

    return await response.json();
  } catch (error) {
    console.error(error);
    return [];
  }
}
