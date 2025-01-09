import { getServerSession } from "next-auth";
import { OnRampTransactions } from "../../../components/OnRampTransaction";
import { authOptions } from "../../lib/auth";
import prisma from "@repo/db/client";
import { PTransactions } from "../../../components/P2PTransactionCard";
async function getOnRampTransactions() {
   const session = await getServerSession(authOptions);
   const txns = await prisma.onRampTransaction.findMany({
       where: {
           userId: Number(session?.user?.id)
       }
   });
   return txns.map(t => ({
       time: t.startTime,
       amount: t.amount,
       status: t.status,
       provider: t.provider
   }))
}
async function getP2PTransactions()
{
    const session = await getServerSession(authOptions);
    const userId=session.user.id
    const transactions=await prisma.p2pTransfer.findMany({
        where:{
            OR: [
                { fromUserId: Number(userId) },
                { toUserId: Number(userId) },
            ],
        }
    })

    return transactions.map(t => ({
        time: t.timestamp,
        amount: t.amount,
        fromUserId:t.fromUserId,
        toUserId: t.toUserId
    }))
}

export default async function Transaction()
{
   const transactions = await getOnRampTransactions();
   const ptransactions = await getP2PTransactions();
return <div className="w-full flex flex-col items-cente">
<div className="text-4xl text-[#6a51a6] pt-8 mb-8 font-bold">Transactions</div>
<div className="w-full flex flex-wrap justify-between gap-6">
  <div className="w-full lg:w-[48%] bg-white p-6 rounded-lg shadow">
    <h2 className="text-2xl text-gray-800 font-semibold mb-4">OnRamp Transactions</h2>
    <OnRampTransactions transactions={transactions} />
  </div>
  <div className="w-full lg:w-[48%] bg-white p-6 rounded-lg shadow">
    <h2 className="text-2xl text-gray-800 font-semibold mb-4">P2P Transactions</h2>
    <PTransactions transactions={ptransactions} />
  </div>
</div>
</div>
}