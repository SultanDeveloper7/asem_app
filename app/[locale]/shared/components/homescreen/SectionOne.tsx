import Image from "next/image";
import WomenImage from "@/public/images/homepage/women.png";

export default function SectionOne() {
    return <div className="flex p-4 my-8">
        <div className="w-[50%] grid items-center">
            <div className="h-[50%] w-full flex flex-col justify-center items-center">
                <div className="px-4 w-full flex flex-col gap-2">
                    <h1 className="text-3xl font-bold">تشكيلة النساء: أناقة لا مثيل لها</h1>
                    <div>
                        <p className="text-1xl">اكتشفي الأناقة الحقيقية مع تشكيلتنا الفاخرة المصممة خصيصاً للمرأة العصرية. من الإكسسوارات الرقيقة إلى القطع التي تبرز جمالكِ، لوران هنا لتلهمكِ في كل مناسبة.</p>
                    </div>
                </div>
            </div>
        </div>
        <div className="w-[50%] shadow-md rounded duration-300 ease-in-out hover:-translate-y-4">
            <Image src={WomenImage} alt="Welcome image" className="rounded-md" />
        </div>
    </div>
}