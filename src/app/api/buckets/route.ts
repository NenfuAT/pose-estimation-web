import { NextResponse } from "next/server";

export async function GET(): Promise<NextResponse> {
        // 他のAPIを叩くためのリクエストを作成
        const apiUrl = `${process.env.DOMAIN_NAME}/api/bucket/list`;
        const response = await fetch(apiUrl, {
            cache: 'no-store',
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Basic ${encodeToBase64(
                    `${process.env.USER_NAME}:${process.env.PASSWORD}`
                )}`,
            },
        });
    
        // レスポンスのステータスコードを確認
        if (!response.ok) {
            // エラーレスポンスを返す場合
            return new NextResponse("Failed to fetch data from external API", { status: response.status });
        }
    
        // JSON形式のレスポンスを取得
        const data = await response.json();
        console.log(data.buckets)
        // レスポンスを返す
        return new NextResponse(JSON.stringify(data), { status: response.status });
    
}

function encodeToBase64(input:string) {
    return Buffer.from(input).toString('base64');
}
