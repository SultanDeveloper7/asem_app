"use client"

import CustomTextField from "@/app/shared/components/CustomTextField"
import FormBody from "../components/FormBody"
import CustomButton from "@/app/shared/components/CustomButton"
import { ChangeEvent, useState } from "react"
import { Divider, Typography } from "@mui/material"
import Link from "next/link"
import { HttpFetch } from "@/app/shared/functions/httpFetch"
import { HttpApis } from "@/app/shared/apis"
import { useRouter } from 'next/navigation'

export default function LoginScreen() {
    const router = useRouter();
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [error, setError] = useState<string | undefined>();

    function setFormValue(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement, Element>) {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }))
    }
    const sendCredentials = async () => {
        setError(undefined);
        if (!formData.email || !formData.password) {
            setError("Email or Password can't be empty");
            return;
        }
        const httpFetch = new HttpFetch();
        const response = await httpFetch.postRequest(HttpApis.loginApi, formData, {
            "content-type": "application/json"
        })
        if (response.status) {
            router.push('/');
            return;
        }
        if (response.data && typeof response.data !== "string") {
            setError(response.data.message);
        } else {
            setError(response.data)
        }

    }

    return <FormBody onSubmit={async (e) => {
        e.preventDefault();
        await sendCredentials();
    }} >
        <h4 className="text-3xl text-center font-bold">تسجيل الدخول</h4>
        <h4 className="text-4xl text-center font-bold text-[#B78474]">Laurn</h4>
        <Divider variant="middle" />
        <CustomTextField name="email" label="الايميل" type="email" value={formData.email} onChange={setFormValue} />
        <CustomTextField name="password" label="كلمة المرور" type="password" value={formData.password} onChange={setFormValue} />
        <Typography variant="body2"><Link href={"#"} className="text-blue-500">نسيت كلمة المرور؟</Link></Typography>
        <CustomButton type="submit" label="تسجيل الدخول" />
        {error && <Typography textAlign={"center"} color="red" variant="subtitle2">{error}</Typography>}
        <Typography variant="body2" textAlign={"center"}>ليس لديك حساب؟ <Link href={"/register"} className="text-blue-500">انشاء حساب الان</Link></Typography>
    </FormBody>
}
