import bcrypt from "bcryptjs";

export const saltPassword = (password: string): string => {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
}

export const comparePassword = (password: string, hash: string): boolean => bcrypt.compareSync(password, hash);

export const errResponse = (res: any, code: number, status: string, message: string) => res.status(code).json({ status, message }).end();