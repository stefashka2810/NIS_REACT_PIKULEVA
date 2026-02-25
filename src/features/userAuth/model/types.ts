import type { User } from "../../../entities/user/model/types.ts";

export interface AuthState {
  user: Partial<User> | null;
  isAuth: boolean;
  accessToken: string | null;
  refreshToken: string | null;
}
