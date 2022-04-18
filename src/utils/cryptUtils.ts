import bcrypt from "bcrypt";

export function encrypt(sensibleData: string): string {
    const encryptedData = bcrypt.hashSync(sensibleData, 10);

    return encryptedData;
}

export function decrypt(sensibleData: string, encryptedData: string): boolean {
    const isEqual = bcrypt.compareSync(sensibleData, encryptedData);

    return isEqual;
}