import { SignJWT, jwtVerify } from "jose";

const secret = new TextEncoder().encode(process.env.PORTAL_JWT_SECRET!);

export interface SessionPayload {
  clientId: string;
  email: string;
}

export async function signSession(payload: SessionPayload): Promise<string> {
  return new SignJWT({ clientId: payload.clientId, email: payload.email })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("30d")
    .sign(secret);
}

export async function verifySession(token: string): Promise<SessionPayload | null> {
  try {
    const { payload } = await jwtVerify(token, secret, { algorithms: ["HS256"] });
    return {
      clientId: payload.clientId as string,
      email: payload.email as string,
    };
  } catch {
    return null;
  }
}
