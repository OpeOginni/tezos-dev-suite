import { NextResponse } from "next/server";
import { db } from "~/server/db";

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url)
    const contractAddress = searchParams.get('contractAddress')
    const entryPoint = searchParams.get('entryPoint')


    try {

        if (!contractAddress) return NextResponse.json({ error: 'Contract Address is required' }, { status: 400 })

        if (!entryPoint) return NextResponse.json({ error: 'Entry Point is required' }, { status: 400 })

        const contract = await db.contract.findUnique({
            where: {
                contractAddress: contractAddress
            }
        })


        if (!contract) return NextResponse.json({ error: 'Contract is Not Verified' }, { status: 400 })

        console.log(contract)

        const fetchedEntryPoint = await db.entryPoint.findUnique({
            where: {
                name_contractId: {
                    name: entryPoint,
                    contractId: contract.id
                }
            }
        })

        return NextResponse.json({ success: true, fetchedEntryPoint }, { status: 200 })

    } catch (e) {
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
    }
}

