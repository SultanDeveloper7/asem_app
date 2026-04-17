"use client"
import AccountCircle from '@mui/icons-material/AccountCircle';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import { Avatar, IconButton } from '@mui/material';
import { useEffect, useState } from 'react';
import { HttpFetch } from '../functions/httpFetch';
import { HttpApis } from '../apis';
import { UserType } from '../types/dbTablesTypes/userType';
import { HttpFetchType } from '../types/httpFetchType';

type CustomAppbarProps = {
    isLoggedIn: boolean
}

export default function CustomAppbar(props: CustomAppbarProps) {
    const [userDetails, setUserDetails] = useState<UserType | undefined>();
    const { isLoggedIn } = props;
    useEffect(() => {
        if (!isLoggedIn) {
            return;
        }
        getUserDetails();
    }, []);

    async function getUserDetails() {
        const httpFetch = new HttpFetch();
        const response: HttpFetchType<UserType> = await httpFetch.getRequest<UserType>(HttpApis.userDetailsApi);
        setUserDetails(response.data?.data)

    }

    return <div className="flex px-4 h-16 w-full bg-[#FFF0F3] justify-between fixed top-0 shadow-md z-1000">
        <div className="flex gap-2 justify-center items-center h-full">
            <ShoppingCartOutlinedIcon />
            <SearchOutlinedIcon />
        </div>
        <div className='flex gap-4 justify-center items-center h-full'>
            <h5>الرئيسية</h5>
            <h5>نسائي</h5>
            <h5>رجالي</h5>
            <h5>اطفال</h5>
            <h5>الهدايا</h5>
        </div>
        <div className='flex gap-2 justify-center items-center h-full'>
            <IconButton href={isLoggedIn ? '/user' : '/login'}>
                {userDetails ?
                    <Avatar alt={userDetails.user_name} src={`/uploads/${userDetails.user_avatar_path}`} />
                    : <AccountCircle fontSize='large' />}
            </IconButton>
        </div>
    </div>
}