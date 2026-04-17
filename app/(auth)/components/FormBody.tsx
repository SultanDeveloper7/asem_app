import { Box, Divider, Typography } from "@mui/material";
import React, { JSX } from "react";

type FormBodyProps = {
    children?: React.ReactNode | undefined;
    onSubmit?: React.SubmitEventHandler<HTMLFormElement> | undefined
}

export default function FormBody(props: FormBodyProps) {
    const { children, onSubmit } = props;
    return <Box className="grid place-content-center h-screen bg-[#FFF0F3] ">
        <Box className="flex flex-col gap-4 p-4 border rounded-md border-transparent shadow-xl">
            <form className="grid gap-2" onSubmit={onSubmit}>{children}</form>
        </Box>
    </Box>
}