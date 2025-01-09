import { Button } from "./button";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import { usePathname, useRouter } from "next/navigation";
import { getServerSession } from "next-auth";

interface AppbarProps {
    user?: {
        name?: string | null;
    },
    onSignin: any,
    onSignout: any
}

export const Appbar = ({
    user,
    onSignin,
    onSignout
}: AppbarProps) => {
    const handleLogin = () => {
        onSignin("credentials", {
          callbackUrl: "/root/dashboard",
        });
      };
       const router = useRouter();
    return <div className="flex justify-between border-b px-4">
        <div className="text-lg flex flex-col justify-center cursor-pointer" onClick={()=>{
            router.push("/")
        }}>
            PayTM
        </div>
        <div className="flex flex-r justify-center pt-2 gap-4">
        <IconButton onClick={()=>{
            router.push("/root/profile")
        }}>
               <Avatar/>
            </IconButton>
            <Button onClick={user ? onSignout : onSignin}>{user ? "Logout" : "Login"}</Button>
        </div>
    </div>
}