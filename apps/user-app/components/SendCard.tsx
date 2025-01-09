"use client"
import { Button } from "@repo/ui/button";
import { Card } from "@repo/ui/card";
import { Center } from "@repo/ui/center";
import { Select } from "@repo/ui/select";
import { TextInput } from "@repo/ui/textinput";
import { useState } from "react";
import P2PTranfer from "../app/lib/actions/P2PTransfer";


export default function TP2P()
{
    const [number,setNumber]=useState("");
    const [amount,setAmount]=useState(0)
return <Center>
    <Card title="P2P Transfer">
    <div className="w-full p-4">
        <TextInput label={"Number"} placeholder={"9132567115"} onChange={(val) => {
         setNumber(val)
        }} />
         <TextInput label={"Amount"} placeholder={"Amount"} onChange={(val) => {
         setAmount(Number(val))
        }} />
        <div className="flex justify-center pt-4">
            <Button onClick={async () => {
               await P2PTranfer(number,amount*100)
               window.location.reload()
            }}>
            Send Money
            </Button>
        </div>
    </div>
</Card>
</Center>
}