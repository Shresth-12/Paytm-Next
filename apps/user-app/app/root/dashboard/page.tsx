import { getServerSession } from "next-auth";
import { authOptions } from "../../lib/auth";
import prisma from "@repo/db/client";
import { BalanceCard } from "../../../components/BalanceCard";

async function getBalance() {
    const session = await getServerSession(authOptions);
    const balance = await prisma.balance.findFirst({
        where: {
            userId: Number(session?.user?.id)
        }
    });
    return {
        amount: balance?.amount || 0,
        locked: balance?.locked || 0
    }
}

export default async function Dashboard()
{
const session = await getServerSession(authOptions);
const date = new Date();
const showTime = date.getHours()
const balance=await getBalance()
return <div className="w-screen">
<div className="text-4xl text-[#6a51a6] pt-8 mb-8 font-bold">
Good {showTime < 12 ? "Morning" : showTime < 18 ? "Afternoon" : "Evening"}, {session.user.name}
</div>
<div className="w-4/5">
<BalanceCard amount={balance.amount} locked={balance.locked} />
</div>
</div>
}