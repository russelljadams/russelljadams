import { SignJWT, jwtVerify } from "jose";
import { compare } from "bcryptjs";
import { cookies } from "next/headers";

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET);
const COOKIE_NAME = "auth_token";

export type Role = "admin" | "viewer";

export interface UserPayload {
  username: string;
  role: Role;
}

const USERS: Record<string, { hash: string; role: Role }> = {
  russell: {
    hash: process.env.AUTH_USER_RUSSELL_HASH ?? "",
    role: "admin",
  },
  amanda: {
    hash: process.env.AUTH_USER_AMANDA_HASH ?? "",
    role: "viewer",
  },
};

export async function verifyPassword(
  username: string,
  password: string
): Promise<UserPayload | null> {
  const user = USERS[username.toLowerCase()];
  if (!user || !user.hash) return null;
  const valid = await compare(password, user.hash);
  if (!valid) return null;
  return { username: username.toLowerCase(), role: user.role };
}

export async function createToken(payload: UserPayload): Promise<string> {
  return new SignJWT({ ...payload })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("24h")
    .sign(JWT_SECRET);
}

export async function verifyToken(token: string): Promise<UserPayload | null> {
  try {
    const { payload } = await jwtVerify(token, JWT_SECRET);
    return {
      username: payload.username as string,
      role: payload.role as Role,
    };
  } catch {
    return null;
  }
}

export async function getUser(): Promise<UserPayload | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get(COOKIE_NAME)?.value;
  if (!token) return null;
  return verifyToken(token);
}

export { COOKIE_NAME };
