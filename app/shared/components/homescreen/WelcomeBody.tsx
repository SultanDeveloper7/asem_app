import Image from "next/image";
import welcomeImage from "@/public/images/homepage/presentation.png";
import { Button } from "@mui/material";

export default function WelcomeBody() {
    return <div className="flex bg-[#FFF6F8] px-4 py-28 my-8">
        <div className="w-[50%] grid items-center">
            <div className="h-[50%] w-full flex flex-col justify-center items-center">
                <div className="px-4 w-full flex flex-col gap-4">
                    <h1 className="text-5xl font-bold">أهلا بك في عالم</h1>
                    <h1 className="text-5xl font-bold text-[#B78474]">LURAN</h1>
                    <div>
                        <p className="text-2xl">اكتشف تشكيلتنا الفاخرة من الهدايا والإكسسوارات المصممة خصيصاً لتعبر عن هويتك وتفردك.</p>
                    </div>
                </div>
                <div className="w-full p-8">
                    <Button variant="contained" href="/browse">تسوق الان</Button>
                </div>
            </div>
        </div>
        <div className="w-[60%] shadow-md rounded duration-300 ease-in-out hover:-translate-y-4">
            <Image src={welcomeImage} alt="Welcome image" className="rounded-md" />
        </div>
    </div>
}