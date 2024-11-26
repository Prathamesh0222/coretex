import { Response, Router } from "express";
import { authMiddleware, CustomRequest } from "../middleware";
import { Content } from "../db";
import { contentSchema } from "../schema/validations";

const contentRouter = Router();

contentRouter.post("/content", authMiddleware, async (req: CustomRequest, res: Response): Promise<any> => {

    try {
        const parsedResult = await contentSchema.safeParse(req.body);
        if (!parsedResult.success) {
            return res.status(422).json({
                message: "Invalid Inputs",
                errors: parsedResult.error.errors
            })
        }

        const { title, link, type } = parsedResult.data;
        const userId = req.userId;

        if (!userId) {
            return res.status(400).json({ message: "User ID is required" });
        }

        await Content.create({
            title,
            link,
            type,
            tags: [],
            userId
        })

        return res.status(201).json({
            message: "Content Created",
        })
    } catch (error) {
        console.error("Error in creating content", error);
        return res.status(500).json({
            message: "Internal Server Error"
        })
    }
})

contentRouter.get("/content", authMiddleware, async (req: CustomRequest, res: Response): Promise<any> => {
    try {
        const userId = req.userId;
        const content = await Content.findOne({
            userId
        }).populate("userId", "username");

        res.json({
            content,
        })
    } catch (error) {
        console.error("Error while fetching the content", error);
        return res.status(500).json({
            message: "Internal Server Error",
        })
    }

})

contentRouter.delete("/content", authMiddleware, async (req, res) => {

})



export default contentRouter;