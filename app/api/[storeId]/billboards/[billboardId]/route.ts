import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

import prismadb from "@/lib/prismadb";


export async function PATCH (
    req: Request,
    { params }: { params: {storeId: string,  billboardId: string } }
) {
    try {
        const { userId } = await auth();
        const body = await req.json();

        const { label, imageUrl } = body;

        if(!userId) {
            return new NextResponse("Unauthenticated", { status: 401 });
        }

        if( !label ) {
            return new NextResponse("Label is required", { status: 400 });
        }
        if( !imageUrl ) {
            return new NextResponse("ImageUrl is required", { status: 400 });
        }

        if(!params.billboardId) {
            return new NextResponse("Billboard Id is required",{ status: 400 })
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

        const billboard = await prismadb.billboard.updateMany({
            where: {
                id:params.billboardId,
            },
            data: {
                label,
                imageUrl,
            }
        })
    return NextResponse.json(billboard)
    } catch (error) {
        console.log('[BILLBOARD_PATCH]', error);
        return new NextResponse("Internal error", { status: 401 });
    }
}

export async function DELETE (
    req: Request, //this is unused but it is important to add because in DELETE function the parameters{params} are only available in the second argument.
    { params }: { params: { storeId: string , billboardId: string } }
) {
    try {
        const { userId } = await auth();

        if(!userId) {
            return new NextResponse("Unauthenticated", { status: 401 });
        }

        if(!params.billboardId) {
            return new NextResponse("Billboard Id is required",{ status: 400 })
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

        const billboard = await prismadb.billboard.deleteMany({
            where: {
                id:params.billboardId,
            }
        });
        return NextResponse.json(billboard);

    } catch (error) {
        console.log('[BILLBOARD_DELETE]', error);
        return new NextResponse("Internal error", { status: 401 });
    }
}

export async function GET (
    req: Request, //this is unused but it is important to add because in DELETE function the parameters{params} are only available in the second argument.
    { params }: { params: { billboardId: string } }
) {
    try {
        if(!params.billboardId) {
            return new NextResponse("Billboard Id is required",{ status: 400 })
        }

        const billboard = await prismadb.billboard.findUnique({
            where: {
                id:params.billboardId,
            }
        });
        return NextResponse.json(billboard);

    } catch (error) {
        console.log('[BILLBOARD_GET]', error);
        return new NextResponse("Internal error", { status: 500 });
    }
}