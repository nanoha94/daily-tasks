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

module.exports = router;
