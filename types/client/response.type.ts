export interface ErrorResponse {
  message: string;
  error: string;
}
export interface SuccessResponse{
  message: string;
}

export interface ResponseUserSearch extends SuccessResponse {
  users: Array<{
    id: string;
    fullName: string;
    avatar?: string;
  }>;
}