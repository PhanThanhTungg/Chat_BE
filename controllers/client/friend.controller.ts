import { Op } from "sequelize";
import User from "../../models/user.model";
import { ErrorResponse, SuccessResponse } from "../../types/client/response.type";

export const getListUser = async (req: any, res: any): Promise<any> => {
  const input: string = req.params.input;
  try {
    const users = await User.findAll({
      where: {
        [Op.or]: [
          {
            username: {
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

    const response:SuccessResponse = {
      message: "Get list user successfully",
      data: users
    }
    res.status(200).json(response);
  } catch (error) {
    const response:ErrorResponse = {
      message: "Get list user failed",
      error: error
    }
    res.status(500).json(response);
  }
}