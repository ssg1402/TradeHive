import { NextResponse, NextRequest } from "next/server";
import { currentUser, getAuth } from "@clerk/nextjs/server";

import prismadb from "@/lib/prismadb";

export async function POST(
    req:NextRequest,
) {
    try {
        const auth = getAuth(req);
        console.log("Auth Data:------------", auth);

        const body =  await req.json();

        const { name } = body;
        const { userId } = auth;
        if(!userId){
            return new NextResponse("Unauthorized", {status : 401});
        }
        if(!name){
            return new NextResponse("name is required", {status : 400});
        }

        const store = await prismadb.store.create({
            data: {
                name,
                userId
            }
        });
        
        return NextResponse.json(store);

    } catch (error) {
        console.log('[STORES_POST]',error);
        return new NextResponse("Internal Error", {status : 500});
    }
}