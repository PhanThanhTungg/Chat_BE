import { Request, Response } from "express";
import { ConversationType, SuccessResGetMessage } from "../../types/client/conversation.type";
import Conversation from "../../models/conversation.model";
import ConversationMember from "../../models/conversation_member.model";
import sequelize from "../../config/connect";
import { ErrorResponse } from "../../types/client/response.type";
import { isReturnStatement } from "typescript";

export const getMessage = async (req: Request, res: Response): Promise<any> => {
  try {
    const typeConversation: ConversationType = req.params.typeConversation as ConversationType;
    const id: string = req.params.id;

    // private conversation
    if (typeConversation === "private") {

      // find conversation with just two members: userId1 and userId2
      const results: Object[] = await sequelize.query(`
        SELECT c.*
        FROM conversation_members cm
        join conversations c on cm.conversationId = c.id
        GROUP BY cm.conversationId
        HAVING 
          COUNT(*) = 2
          AND SUM(cm.userId = :userId1) = 1
          AND SUM(cm.userId = :userId2) = 1
      `, {
        replacements: { userId1: res.locals.user.id, userId2: +id },
        type: sequelize["QueryTypes"].SELECT
      });

      // if conversation already exists
      if (results && results.length == 1) {
        const response: SuccessResGetMessage = {
          message: "Get message successfully, conversation already exists",
          conversationInfo: {
            id: results[0]["id"],
            name: results[0]["name"],
            isGroup: results[0]["isGroup"],
            createdAt: results[0]["createdAt"]
          }
        }
        return res.status(200).json(response);
      }

      // if conversation does not exist, create a new one
      const newConversation = await Conversation.create({
        isGroup: false
      });

      const idConversation: string = newConversation["id"];

      await ConversationMember.create({
        conversationId: idConversation,
        userId: id,
        joinedAt: new Date()
      });

      await ConversationMember.create({
        conversationId: idConversation,
        userId: res.locals.user.id,
        joinedAt: new Date()
      });

      // response
      const response: SuccessResGetMessage = {
        message: "Get message successfully and created new conversation",
        conversationInfo: {
          id: idConversation,
          name: newConversation["name"],
          isGroup: newConversation["isGroup"],
          createdAt: newConversation["createdAt"]
        }
      };
      return res.status(200).json(response);

    } else if (typeConversation === "group") {
      // Handle group conversation messages
    }
  } catch (error) {
    console.error("Error in getMessage:", error);
    const response: ErrorResponse = {
      message: "An error occurred while fetching messages",
      error: error instanceof Error ? error.message : "Unknown error"
    };
    return res.status(500).json(response);
  }
}