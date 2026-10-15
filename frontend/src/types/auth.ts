export interface AuthUser {
  id: string;
  email: string;
  displayName: string;
  learnerId: string;
  createdAt: string;
}

export interface AuthResponse {
  token: string;
  user: AuthUser;
}
