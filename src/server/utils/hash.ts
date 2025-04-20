import bcrypt from "bcryptjs";

const salt = bcrypt.genSaltSync(10);

export const hash = (passwd: string) => bcrypt.hashSync(passwd, salt);

export const compare = (passwd: string, hash: string) =>
  bcrypt.compareSync(passwd, hash);
