import { Card } from "@repo/ui/card"
import { useSession } from "next-auth/react";
import { authOptions } from "../app/lib/auth";
import { getServerSession } from "next-auth";
export const PTransactions = async ({
    transactions
}: {
    transactions: {
        time: Date,
        amount: number,
        fromUserId: number,
        toUserId:number
    }[]
}) => {
     const session = await getServerSession(authOptions);
     const userId=Number(session.user.id)
    if (!transactions.length) {
        return <Card title="Recent Transactions">
            <div className="text-center pb-8 pt-8">
                No Recent transactions
            </div>
        </Card>
    }
    return <Card title="Recent Transactions">
        <div className="pt-2">
            {transactions.map(t => <div className="flex justify-between">
                <div>
                    {userId===t.toUserId?
                    (<div className="text-sm">
                        Received INR
                    </div>
                    ):
                    (<div className="text-sm">
                        Transferred INR
                    </div>
                    )
                    }
                    <div className="text-slate-600 text-xs">
                        {t.time.toDateString()}
                    </div>
                </div>
                <div>
                <div className="flex flex-col justify-center">
                    + Rs {t.amount / 100}
                </div>
                </div>
            </div>)}
        </div>
    </Card>
}