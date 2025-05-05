import { NextResponse, NextRequest } from "next/server";
import { getAuth } from "@clerk/nextjs/server";

import prismadb from "@/lib/prismadb";

export async function GET(
    req: Request,
    { params }: {params: {storeId: string}}
) {
    try {
        if(!params.storeId){
            return new NextResponse("StoreId is required", {status : 400});
        }

        const billboards = await prismadb.billboard.findMany({
            where: {
                storeId: params.storeId,
            },
        });
        return NextResponse.json(billboards);

    } catch (error) {
        console.log('[BILLBOARDS_POST]',error);
        return new NextResponse("Internal Error", {status : 500});
    }
}

export async function POST(
    req:NextRequest,
    { params }: {params: {storeId: string}}
) {
    try {
        const auth = getAuth(req);
        console.log("Auth Data:->", auth);

        const body =  await req.json();

        const { label, imageUrl } = body;
        const { userId } = auth;
        if(!userId){
            return new NextResponse("Unauthienticated", {status : 401});
        }
        if(!label){
            return new NextResponse("Label is required", {status : 400});
        }
        if(!imageUrl){
            return new NextResponse("imageUrl is required", {status : 400});
        }
        if(!params.storeId){
            return new NextResponse("StoreId is required", {status : 400});
        }

        const storeByUserId = await prismadb.store.findFirst({
            where: {
                id: params.storeId,
                userId: userId
            }
        })
        
        if(!storeByUserId){
            return new NextResponse("Unauthorized", {status : 403});
        }

        const billboards = await prismadb.billboard.create({
            data: {
                label,
                imageUrl,
                storeId: params.storeId
            }
        });

        return NextResponse.json(billboards);

    } catch (error) {
        console.log('[BILLBOARDS_POST]',error);
        return new NextResponse("Internal Error", {status : 500});
    }
}