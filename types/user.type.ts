// type auth
export interface SuccessAuthResponse {
  message: string;
  accessToken: string;
  user?: {
    fullName: string;
    email: string;
    phone: string;
    avatar: string;
  }
}

export interface SuccessLogoutResponse {
  message: string;
}

export interface LoginInput {
  email: string;
  password: string;
}

export interface RegisterInput {
  email: string;
  password: string;
  phone: string;
  fullName: string;
}

//type jwtToken
export interface tokenDecoded {
  id: string;
  iat: number;
  exp: number;
  expired?: boolean;
}