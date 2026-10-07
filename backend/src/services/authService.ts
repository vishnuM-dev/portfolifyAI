import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User, { IUserDocument } from "../models/User";
import { IUser, UserDTO, JWTPayload } from "../types/auth";

const BCRYPT_SALT_ROUNDS = 12;

export class AuthService {
  /**
   * Hashes password securely using bcryptjs (12 salt rounds)
   */
  static async hashPassword(password: string): Promise<string> {
    if (!password || password.length < 8) {
      throw new Error("Password must be at least 8 characters long");
    }
    return bcrypt.hash(password, BCRYPT_SALT_ROUNDS);
  }

  /**
   * Verifies plaintext password against stored bcrypt hash
   */
  static async verifyPassword(password: string, hash?: string | null): Promise<boolean> {
    if (!password || !hash) {
      return false;
    }
    return bcrypt.compare(password, hash);
  }

  /**
   * Generates a signed JWT authentication token
   */
  static generateToken(user: UserDTO): string {
    const secret = process.env.JWT_SECRET || "fallback_default_secret_key_portfolify";
    const expiresIn = process.env.JWT_EXPIRES_IN || "7d";

    const payload: JWTPayload = {
      id: user.id,
      email: user.email,
      role: user.role,
    };

    return jwt.sign(payload, secret, { expiresIn } as jwt.SignOptions);
  }

  /**
   * Verifies a JWT token and returns payload
   */
  static verifyToken(token: string): JWTPayload {
    const secret = process.env.JWT_SECRET || "fallback_default_secret_key_portfolify";
    return jwt.verify(token, secret) as JWTPayload;
  }

  /**
   * Converts a user document to safe UserDTO (never exposing password hash)
   */
  static toDTO(user: IUserDocument | IUser): UserDTO {
    return {
      id: user._id ? user._id.toString() : "",
      name: user.name,
      email: user.email,
      avatar: user.avatar || "",
      role: user.role || "user",
      createdAt: user.createdAt instanceof Date ? user.createdAt.toISOString() : undefined,
      updatedAt: user.updatedAt instanceof Date ? user.updatedAt.toISOString() : undefined,
    };
  }
}

export default AuthService;
