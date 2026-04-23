"use client"

import Image from "next/image";
import MenImage from "@/public/images/homepage/men.png";
import { useTranslations } from "next-intl";

export default function SectionTwo() {
    const t = useTranslations("section-two");
    return <div className="flex p-4 my-8 bg-linear-to-t from-[#FFF0F3] from-75% to-white-500">
        <div className="w-[50%] shadow-md rounded duration-300 ease-in-out hover:-translate-y-4">
            <Image src={MenImage} alt="Welcome image" className="rounded-md" />
        </div>
        <div className="w-[50%] grid items-center">
            <div className="h-[50%] w-full flex flex-col justify-center items-center p-4">
                <div className="px-4 w-full flex flex-col gap-2">
                    <h1 className="text-3xl font-bold">{t("men")}</h1>
                    <div>
                        <p className="text-1xl">{t("men-desc")}</p>
                    </div>
                </div>

            </div>
        </div>
    </div>
}