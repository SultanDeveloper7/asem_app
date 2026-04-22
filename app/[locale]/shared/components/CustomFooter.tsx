import { Divider } from "@mui/material"

export default function CustomFooter() {
    return <footer className="bg-linear-to-t from-[#FFF0F3] from-75% to-white-500">
        <div className="h-[200px] bg-black-500 flex px-8 gap-16 my-4">
            <div className="w-fit">
                <h3 className="text-3xl font-bold text-[#B78474] my-4">LURAN</h3>
                <p className="max-w-[450px] text-1xl">حيث تتحول الأناقة إلى هوية. نقدم لكِ أرق الهدايا والإكسسوارات المصممة لتعكس جمالك الداخلي وتفردك.</p>
            </div>
            <Divider flexItem variant="middle" orientation="vertical" />
            <div className="flex justify-around grow">
                <div className="w-fit">
                    <h4 className="text-2xl text-[#B78474] my-4">خدمة العملاء</h4>
                    <div className="flex flex-col gap-4">
                        <p>من نحن</p>
                        <p>الأسئلة الشائعة</p>
                        <p>كيفية الطلب</p>
                        <p>سياسة الخصوصية</p>
                    </div>
                </div>
                <div className="w-fit">
                    <h4 className="text-2xl text-[#B78474] my-4">تواصل معنا</h4>
                    <div className="flex flex-col gap-4">
                        <p>واتساب: 0000 000 00 966+</p>
                        <p>care@luran.com</p>
                    </div>
                </div>
            </div>
        </div>
        <Divider variant="middle" />
        <CopyrightsData />
    </footer>
}

function CopyrightsData() {
    return <div className="text-center h-16 grid items-center text-[#888]">
        © 2026 جميع الحقوق محفوظة لمتجر LURAN.
    </div>
}