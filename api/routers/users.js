const router = require("express").Router();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

router.get("/:userId", async (req, res) => {
  const { userId } = req.params;
  try {
    const user = await prisma.users.findUnique({
      where: { id: userId },
      include: { posts: true, profile: true },
    });
    res.status(201).json(user);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "サーバーエラーです" });
  }
});

router.put("/:userId", async (req, res) => {
  const { userId } = req.params;
  const { name, profile } = req.body;

  try {
    const updatedUser = await prisma.users.update({
      data: {
        name,
        profile: {
          upsert: {
            create: { bio: profile.bio, profileSrc: profile.profileSrc },
            update: {
              id: profile.id,
              bio: profile.bio,
              profileSrc: profile.profileSrc,
            },
            where: { id: profile.id || "" },
          },
        },
      },
      where: { id: userId },
      include: { posts: true, profile: true },
    });
    res
      .status(200)
      .json({ message: "ユーザー情報が更新されました", user: updatedUser });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "サーバーエラーです" });
  }
});

module.exports = router;
