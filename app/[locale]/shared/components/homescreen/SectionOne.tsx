import Image from "next/image";
import WomenImage from "@/public/images/homepage/women.png";
import { useTranslations } from "next-intl";

export default function SectionOne() {
    const t = useTranslations("section-one");
    return <div className="flex p-4 my-8">
        <div className="w-[50%] grid items-center">
            <div className="h-[50%] w-full flex flex-col justify-center items-center">
                <div className="px-4 w-full flex flex-col gap-2">
                    <h1 className="text-3xl font-bold">{t("women")}</h1>
                    <div>
                        <p className="text-1xl">{t("women-desc")}</p>
                    </div>
                </div>
            </div>
        </div>
        <div className="w-[50%] shadow-md rounded duration-300 ease-in-out hover:-translate-y-4">
            <Image src={WomenImage} alt="Welcome image" className="rounded-md" />
        </div>
    </div>
}