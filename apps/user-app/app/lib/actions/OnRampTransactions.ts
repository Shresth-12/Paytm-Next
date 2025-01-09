"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "../auth";
import db from "@repo/db/client";
import prisma from "@repo/db/client";

export async function OnRampTransaction(amount: number, provider: string)
{
    const session = await getServerSession(authOptions);
    const userId=session.user.id
    const token=(Math.random() * 1000).toString()
    if(!session.user || !session.user.id)
        return {
        message:"User not logged in"
        }
        await prisma.onRampTransaction.create({
            data:{
                amount:amount,
                provider:provider,
                status:"Processing",
                userId:Number(userId),
                startTime:new Date(),
                token:token
            }
        })
        return {
            message: "Done"
        }
}