'use server'

import { db } from "~/server/db"


import { z } from 'zod'

const schema = z.object({
    contractName: z.string({
        invalid_type_error: 'Invalid contractName',
    }),
    contractAddress: z.string({
        invalid_type_error: 'Invalid contractAddress',
    }), entryPointName: z.string({
        invalid_type_error: 'Invalid entryPointName',
    }), description: z.string({
        invalid_type_error: 'Invalid description',
    }), arguments: z.string({
        invalid_type_error: 'Invalid arguments',
    }),
})

export async function documentEntryPoint(formData: FormData) {


    const validatedFields = schema.safeParse({
        contractName: formData.get("contractName"),
        contractAddress: formData.get("contractAddress"),
        entryPointName: formData.get("entryPoint"),
        description: formData.get("description"),
        arguments: formData.get("arguments")

    })

    // Return early if the form data is invalid
    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
        }
    }

    const admin = await db.admin.upsert({
        create: {
            adminAddress: validatedFields.data.contractAddress
        },
        where: {
            adminAddress: validatedFields.data.contractAddress
        },
        update: {}
    })

    const contract = await db.contract.upsert({
        create: {
            contractName: validatedFields.data.contractName,
            contractAddress: validatedFields.data.contractAddress,
            adminId: admin.id,
        },
        where: {
            contractAddress: validatedFields.data.contractAddress
        },
        update: {}
    })

    await db.entryPoint.create({
        data: {
            name: validatedFields.data.entryPointName,
            description: validatedFields.data.description,
            contractId: contract.id,
            arguments: validatedFields.data.arguments
        }
    })
}