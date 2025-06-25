import { SuccessResponse } from "./response.type";

export type ConversationType = "private" | "group";

export interface TypeConversationInfo {
  id: string;
  name: string;
  isGroup: boolean;
  createdAt: string;
}

export interface SuccessResGetMessage extends SuccessResponse {
  conversationInfo: TypeConversationInfo;
}