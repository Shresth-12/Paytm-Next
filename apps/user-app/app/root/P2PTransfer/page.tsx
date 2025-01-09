import TP2P from "../../../components/SendCard";
import { getServerSession } from "next-auth";
import { authOptions } from "../../lib/auth";
import prisma from "@repo/db/client";
import { BalanceCard } from "../../../components/BalanceCard";
import { PTransactions } from "../../../components/P2PTransactionCard";
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
export default async function P2P()
{
    const balance = await getBalance();
    const transactions = await getP2PTransactions();
    return <div className="w-full mt-10">
       <div className="grid grid-cols-1 gap-4 md:grid-cols-2 p-4">
                  <div>
                  <TP2P/>
                  </div>
                  <div>
                      <BalanceCard amount={balance.amount} locked={balance.locked} />
                      <div className="pt-4">
                          <PTransactions transactions={transactions} />
                      </div>
                  </div>
              </div>
    </div>
}