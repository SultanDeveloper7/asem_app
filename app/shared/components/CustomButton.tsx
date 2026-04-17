import { Button } from "@mui/material"
import { SubmitEventHandler } from "react";

type CustomButtonProps = {
    label: string,
    type?: "button" | "reset" | "submit" | undefined
}

export default function CustomButton(props: CustomButtonProps) {
    const { label, type } = props;
    return <Button type={type} variant="contained">{label}</Button>

}