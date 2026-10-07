import User from "@/models/User";
import { connectToDatabase } from "@/lib/mongodb";
import { IUser, UserDTO } from "@/types/user";

export class UserService {
  /**
   * Finds a user by email
   */
  static async findByEmail(email: string): Promise<IUser | null> {
    await connectToDatabase();
    return User.findOne({ email: email.toLowerCase().trim() });
  }

  /**
   * Formats a User document into a safe UserDTO (omitting passwords/internal fields)
   */
  static toDTO(user: IUser): UserDTO {
    return {
      id: user._id?.toString() || "",
      name: user.name,
      email: user.email,
      avatar: user.avatar,
      role: user.role,
      createdAt: user.createdAt?.toISOString(),
      updatedAt: user.updatedAt?.toISOString(),
    };
  }
}

export default UserService;
