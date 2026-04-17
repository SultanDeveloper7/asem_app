import { TextField } from "@mui/material";
import { ChangeEventHandler, HTMLInputTypeAttribute } from "react";
type CustomTextFieldProps = {
    label: string,
    name: string,
    value: string,
    type?: HTMLInputTypeAttribute | undefined,
    onChange?: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement, Element> | undefined

}
export default function CustomTextField(props: CustomTextFieldProps) {
    const { label, name, type, value, onChange } = props;
    return <TextField className="w-78" name={name} onChange={onChange} value={value} label={label} type={type} variant="outlined">

    </TextField>
}