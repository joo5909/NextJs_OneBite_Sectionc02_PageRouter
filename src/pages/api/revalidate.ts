import type { NextApiRequest, NextApiResponse } from "next";

// revalidate할 경로들을 배열로 관리
const REVALIDATE_PATHS = [
    '/',
    '/api/time',
];

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    try {
        // 모든 경로에 대해 Promise.all로 병렬 처리
        await Promise.all(
            REVALIDATE_PATHS.map(path => res.revalidate(path))
        );
        
        return res.json({ revalidate: true, paths: REVALIDATE_PATHS });
    }
    catch (error) {
        console.error('Revalidation error:', error);
        return res.status(500).json({ 
            error: "Error revalidating", 
            message: error instanceof Error ? error.message : "Unknown error" 
        });
    }
}
