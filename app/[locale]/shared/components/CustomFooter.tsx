"use client"

import { Divider } from "@mui/material"
import { useTranslations } from "next-intl"

export default function CustomFooter() {
    const t = useTranslations("footer");
    return <footer className="bg-linear-to-t from-[#FFF0F3] from-75% to-white-500">
        <div className="h-[200px] bg-black-500 flex px-8 gap-16 my-4">
            <div className="w-fit">
                <h3 className="text-3xl font-bold text-[#B78474] my-4">LURAN</h3>
                <p className="max-w-[450px] text-1xl">{t("text")}</p>
            </div>
            <Divider flexItem variant="middle" orientation="vertical" />
            <div className="flex justify-around grow">
                <div className="w-fit">
                    <h4 className="text-2xl text-[#B78474] my-4">{t("customer-service")}</h4>
                    <div className="flex flex-col gap-4">
                        <p>{t("us")}</p>
                        <p>{t("questions")}</p>
                        <p>{t("request")}</p>
                        <p>{t("policy")}</p>
                    </div>
                </div>
                <div className="w-fit">
                    <h4 className="text-2xl text-[#B78474] my-4">{t("contact-us")}</h4>
                    <div className="flex flex-col gap-4">
                        <p>واتساب: 0000 000 00 966+</p>
                        <p>care@luran.com</p>
                    </div>
                </div>
            </div>
        </div>
        <Divider variant="middle" />
        <div className="text-center h-16 grid items-center text-[#888]">
            {t("copyrights")}
        </div>
    </footer>
}