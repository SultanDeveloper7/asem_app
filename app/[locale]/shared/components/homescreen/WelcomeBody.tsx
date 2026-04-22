"use client"

import Image from "next/image";
import welcomeImage from "@/public/images/homepage/presentation.png";
import { Button } from "@mui/material";
import { Link } from '@/i18n/navigation';
import { useTranslations } from "next-intl";

export default function WelcomeBody() {
    const t = useTranslations("homepage");
    return <div className="flex bg-[#FFF6F8] px-4 py-28 my-8">
        <div className="w-[50%] grid items-center">
            <div className="h-[50%] w-full flex flex-col justify-center items-center">
                <div className="px-4 w-full flex flex-col gap-4">
                    <h1 className="text-5xl font-bold">{t("welcome")}</h1>
                    <h1 className="text-5xl font-bold text-[#B78474]">LURAN</h1>
                    <div>
                        <p className="text-2xl">{t("welcome-desc")}</p>
                    </div>
                </div>
                <div className="w-full p-8">
                    <Button component={Link} variant="contained" href="/browse">{t("shopnow")}</Button>
                </div>
            </div>
        </div>
        <div className="w-[60%] shadow-md rounded duration-300 ease-in-out hover:-translate-y-4">
            <Image src={welcomeImage} alt="Welcome image" className="rounded-md" />
        </div>
    </div>
}