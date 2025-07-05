import { type User } from "firebase/auth";

const ULTRA_USERS = [
    'bugrakarsli@gmail.com',
    'bugra@bugrakarsli.com',
];

export const isUltraUser = (user: User | null): boolean => {
    if (!user || !user.email) {
        return false;
    }
    return ULTRA_USERS.includes(user.email);
};
