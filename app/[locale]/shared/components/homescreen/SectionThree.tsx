"use client"

import Image from "next/image";
import GiftsImage from "@/public/images/homepage/gifts.png";
import { useTranslations } from "next-intl";

export default function SectionThree() {
    const t = useTranslations("section-three");
    return <div className="flex p-4 m-bottom-8">
        <div className="w-[50%] grid items-center">
            <div className="h-[50%] w-full flex flex-col justify-center items-center p-4">
                <div className="px-4 w-full flex flex-col gap-2">
                    <h1 className="text-3xl font-bold">{t("kids")}</h1>
                    <div>
                        <p className="text-1xl">{t("kids-desc")}</p>
                    </div>
                </div>
            </div>
        </div>
        <div className="w-[50%] shadow-md rounded duration-300 ease-in-out hover:-translate-y-4">
            <Image src={GiftsImage} alt="Welcome image" className="rounded-md" />
        </div>
    </div>
}