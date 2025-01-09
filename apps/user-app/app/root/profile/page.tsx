import React from "react";
import { getServerSession } from "next-auth";
import { authOptions } from "../../lib/auth";
import prisma from "@repo/db/client"
const ProfileSection = async () => {
  const session = await getServerSession(authOptions);
  const user =await prisma.user.findFirst({
    where:{
        id:Number(session.user.id)
    }
  })
  return (
    <div className="w-full">
    <div className="text-4xl text-[#6a51a6] pt-8 mb-8 font-bold">
    Account
    </div>
    <div className="w-3/5 mx-auto h-2/5 bg-white shadow-lg rounded-lg p-6">
      <div className="flex items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">{session.user.name}</h1>
        </div>
      </div>
      <div className="mt-6">
        <div className="flex items-center justify-between border-b py-2">
          <span className="text-gray-600">Email:</span>
          <span className="font-semibold text-gray-800">{session.user.email}</span>
        </div>
        <div className="flex items-center justify-between border-b py-2">
          <span className="text-gray-600">Number:</span>
          <span className="font-semibold text-gray-800">{user?.number}</span>
        </div>
      </div>
    </div>
    </div>
  );
};

export default ProfileSection;
