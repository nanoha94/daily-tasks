const router = require("express").Router();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

router.post("/post", async (req, res) => {
  const { comment, tasks, category, numOfGood, authorId } = req.body;

  const data_tasks = tasks.map((task) => {
    return { content: task.content, completed: task.completed };
  });

  const data = {
    comment,
    tasks: {
      createMany: {
        data: data_tasks,
      },
    },
    category,
    numOfGood,
    authorId,
  };

  try {
    const newPost = await prisma.post.create({
      data,
    });
    res.status(201).json(newPost);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "サーバーエラーです" });
  }
});
module.exports = router;
