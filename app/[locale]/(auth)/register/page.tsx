"use client"

import { ChangeEvent, useState } from "react"
import FormBody from "../components/FormBody";
import Divider from "@mui/material/Divider";
import CustomTextField from "@/app/[locale]/shared/components/CustomTextField";
import Typography from "@mui/material/Typography";
import Link from "next/link";
import CustomButton from "@/app/[locale]/shared/components/CustomButton";

export default function RegisterScreen() {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [error, setError] = useState<string | undefined>();
    function setFormValue(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement, Element>) {
        const { name, value } = e.target;
        console.log(e.target)
        setFormData(prev => ({ ...prev, [name]: value }))
    }

    function validatePassword(password: string) {
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/;
        return passwordRegex.test(password);
    }
    const passwordChecks = {
        length: formData.password.length >= 8,
        hasLower: /[a-z]/.test(formData.password),
        hasUpper: /[A-Z]/.test(formData.password),
        hasNumber: /\d/.test(formData.password),
    };

    return <FormBody onSubmit={async (e) => {
        e.preventDefault();
        // await sendCredentials();
    }} >
        <h4 className="text-3xl text-center font-bold">انشاء حساب في</h4>
        <h4 className="text-4xl text-center font-bold text-[#B78474]">Laurn</h4>
        <Divider variant="middle" />
        <CustomTextField name="username" label="اسم المستخدم" type="text" value={formData.username} onChange={setFormValue} />
        <CustomTextField name="email" label="الايميل" type="email" value={formData.email} onChange={setFormValue} />
        <CustomTextField name="password" label="كلمة المرور" type="password" value={formData.password} onChange={setFormValue} />
        <p className="text-sm font-bold">المتطلبات التاليه لكلمة المرور:</p>

        <p className={`text-xs ${passwordChecks.length ? "text-green-500" : "text-red-500"}`}>
            - يجب ان تحتوي على 8 احرف او اكثر
        </p>

        <p className={`text-xs ${(passwordChecks.hasUpper && passwordChecks.hasLower) ? "text-green-500" : "text-red-500"}`}>
            - يجب ان تحتوي على الاقل لحرف كبير وحرف صغير
        </p>

        <p className={`text-xs ${passwordChecks.hasNumber ? "text-green-500" : "text-red-500"}`}>
            - يجب ان يحتوي على رقم واحد او اكثر
        </p>
        <CustomTextField name="confirmPassword" label="تاكيد كلمة المرور" type="password" value={formData.confirmPassword} onChange={setFormValue} />
        {/* <Typography variant="body2"><Link href={"#"} className="text-blue-500">نسيت كلمة المرور؟</Link></Typography> */}
        <CustomButton type="submit" label="انشاء حساب" />
        {error && <Typography textAlign={"center"} color="red" variant="subtitle2">{error}</Typography>}
        <Typography variant="body2" textAlign={"center"}>لديك حساب بالفعل؟ <Link href={"/login"} className="text-blue-500">تسجيل الدخول الان</Link></Typography>
    </FormBody>
}