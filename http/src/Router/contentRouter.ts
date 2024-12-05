import { Response, Router } from "express";
import { authMiddleware, CustomRequest } from "../middleware";
import { Content, Link, Tag, User } from "../db";
import { contentSchema } from "../schema/validations";
import { random } from "../utils";
import mongoose from "mongoose";

const contentRouter = Router();

contentRouter.post(
  "/content",
  authMiddleware,
  async (req: CustomRequest, res: Response) => {
    try {
      const parsedResult = await contentSchema.safeParse(req.body);
      if (!parsedResult.success) {
        res.status(422).json({
          message: "Invalid Inputs",
          errors: parsedResult.error.errors,
        });
        return;
      }

      const { title, link, type, tags } = parsedResult.data;

      const userId = req.userId;

      if (!userId) {
        res.status(400).json({ message: "User ID is required" });
        return;
      }

      const processedTags: mongoose.Types.ObjectId[] = [];
      if (tags) {
        for (const tagTitle of tags) {
          const normalizedTag = tagTitle.trim().toLowerCase();
          let tag = await Tag.findOne({
            title: normalizedTag,
          });

          if (!tag) {
            await Tag.create({
              title: normalizedTag,
            });
          }

          if (tag) {
            processedTags.push(tag._id);
          }
        }
      }

      await Content.create({
        title,
        link,
        type,
        tags: processedTags,
        userId,
      });

      res.status(201).json({
        message: "Content Created",
      });
    } catch (error) {
      console.error("Error in creating content", error);
      res.status(500).json({
        message: "Internal Server Error",
      });
    }
  }
);

contentRouter.get(
  "/content",
  authMiddleware,
  async (req: CustomRequest, res: Response): Promise<any> => {
    try {
      const userId = req.userId;
      const content = await Content.find({
        userId,
      })
        .populate("userId", "username")
        .populate("tags", "title");

      res.json({
        content,
      });
    } catch (error) {
      console.error("Error while fetching the content", error);
      return res.status(500).json({
        message: "Internal Server Error",
      });
    }
  }
);

contentRouter.delete(
  "/content",
  authMiddleware,
  async (req: CustomRequest, res: Response) => {
    try {
      const contentId = req.body.contentId;

      if (!contentId) {
        res.status(400).json({
          message: "Content ID is required",
        });
        return;
      }

      const result = await Content.deleteOne({
        _id: contentId,
        userId: req.userId,
      });

      if (result.deletedCount === 0) {
        res.status(404).json({
          message: "No content found to delete",
        });
        return;
      }

      res.status(200).json({
        message: "Content deleted successfully",
      });
    } catch (error) {
      console.error("Error while deleting the content", error);
      res.status(500).json({
        message: "Error while deleting the content",
      });
    }
  }
);

contentRouter.post(
  "/brain/share",
  authMiddleware,
  async (req: CustomRequest, res: Response) => {
    try {
      const share = req.body.share;
      if (share) {
        const existingLink = await Link.findOne({
          userId: req.userId,
        });

        if (existingLink) {
          res.json({
            hash: existingLink.hash,
          });
          return;
        }

        const hash = random(10);
        await Link.create({
          userId: req.userId,
          hash,
        });
        res.json({
          hash,
        });
      } else {
        await Link.deleteOne({
          userId: req.userId,
        });
        res.json({
          message: "Deleted sharable link",
        });
      }
    } catch (error) {
      console.error("Error while creating sharable link", error);
      res.status(500).json({
        message: "Error while creating sharable link",
      });
    }
  }
);

contentRouter.get("/brain/:sharelink", async (req, res) => {
  const hash = req.params.sharelink;

  const link = await Link.findOne({
    hash,
  });

  if (!link) {
    res.status(411).json({
      message: "Sorry incorrect inputs",
    });
  }

  const content = await Content.find({
    userId: link?.userId,
  });

  const user = await User.findOne({
    _id: link?.userId,
  });

  if (!user) {
    res.status(411).json({
      message: "user not found, error should ideally not happen",
    });
    return;
  }

  res.json({
    username: user.username,
    content: content,
  });
});

export default contentRouter;
