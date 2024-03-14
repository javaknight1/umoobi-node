import bcrypt from "bcryptjs";

const SECRET = 'RAVERY90-REST-API';

export const saltPassword = (password: string): string => {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
}

export const comparePassword = (password: string, hash: string): boolean => bcrypt.compareSync(password, hash);

export const errResponse = (res: any, code: number, status: string, message: string) => res.status(code).json({ status, message }).end();