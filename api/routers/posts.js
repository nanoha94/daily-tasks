const router = require("express").Router();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

router.post("/", async (req, res) => {
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
    const newPost = await prisma.posts.create({
      data,
      include: { tasks: true, author: true },
    });
    res.status(201).json({ message: "投稿が作成されました", post: newPost });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "サーバーエラーです" });
  }
});

router.get("/", async (req, res) => {
  try {
    const allPosts = await prisma.posts.findMany({
      include: {
        tasks: true,
        author: {
          include: {
            profile: true,
          },
        },
      },
      orderBy: { createdAt: "desc" },
    });
    res.status(200).json(allPosts);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "サーバーエラーです" });
  }
});

router.get("/:postId", async (req, res) => {
  const { postId } = req.params;
  try {
    const post = await prisma.posts.findUnique({
      where: { id: postId },
      include: { tasks: true },
    });
    res.status(200).json(post);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "サーバーエラーです" });
  }
});

router.put("/:postId", async (req, res) => {
  const { postId } = req.params;
  const { comment, tasks, category, numOfGood, authorId } = req.body;

  const update_tasks = tasks.map((task) => ({
    create: { content: task.content, completed: task.completed },
    update: { id: task.id, content: task.content, completed: task.completed },
    where: { id: task.id || "" },
  }));

  const data = {
    comment,
    tasks: {
      upsert: update_tasks,
    },
    category,
    numOfGood,
    authorId,
  };

  try {
    const updatedPost = await prisma.posts.update({
      data,
      where: { id: postId },
      include: { tasks: true, author: true },
    });
    res
      .status(200)
      .json({ message: "投稿が更新されました", post: updatedPost });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "サーバーエラーです" });
  }
});

router.delete("/:postId", async (req, res) => {
  const { postId } = req.params;
  try {
    await prisma.posts.delete({
      where: { id: postId },
    });
    res.status(200).json({ message: "投稿が削除されました" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "サーバーエラーです" });
  }
});

module.exports = router;
