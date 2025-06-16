import { Op } from "sequelize";
import User from "../../models/user.model";
import { ErrorResponse, ResponseUserSearch, SuccessResponse } from "../../types/client/response.type";

export const getListUser = async (req: any, res: any): Promise<any> => {
  const input: string = req.query.input;
  if(!input || input.trim() === ""){
    const response:ResponseUserSearch = {
      message: "Get list user successfully",
      users: []
    }
    return res.status(200).json(response);
  }
  try {
    const users = await User.findAll({
      where: {
        [Op.not]:{
          id: res.locals.user.id
        },
        [Op.or]: [
          {
            fullName: {
              [Op.like]: `%${input}%`
            }
          },
          {
            phone: input
          }
        ]
      },
      attributes: ["id", "fullName", "avatar"]
    })

    const response:ResponseUserSearch = {
      message: "Get list user successfully",
      users: users.map(user => ({
        id: user["id"],
        fullName: user["fullName"],
        avatar: user["avatar"] || undefined
      }))
    }
    console.log(response);
    return res.status(200).json(response);
  } catch (error) {
    console.log("Get list user failed", error);
    const response:ErrorResponse = {
      message: "Get list user failed",
      error: error
    }
    return res.status(500).json(response);
  }
}