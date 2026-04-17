export type UserType = {
    user_id: number,
    user_name: string,
    user_password: string,
    user_created: Date,
    user_email: string,
    user_avatar_path?: string | undefined,
    role_id: number
}