const useDateFormat = () => {
  const dateFormat = (date: Date) => {
    const postDateTime = new Date(date);
    const postDate = new Date(date);
    postDate.setHours(0, 0, 0, 0);
    const postTimeStr = postDateTime.toLocaleTimeString("ja-JP", {
      hour: "2-digit",
      minute: "2-digit",
    });
    const currentDateTime = new Date();
    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);

    const numOfDiffDate = Math.floor(
      (currentDate.getTime() - postDate.getTime()) / (1000 * 60 * 60 * 24)
    );

    if (numOfDiffDate <= 10) {
      if (numOfDiffDate === 0) {
        return `今日 ${postTimeStr}`;
      } else if (numOfDiffDate === 1) {
        return `昨日 ${postTimeStr}`;
      } else {
        return `${numOfDiffDate}日前 ${postTimeStr}`;
      }
    } else if (
      currentDateTime.getFullYear() - postDateTime.getFullYear() <=
      0
    ) {
      return `${postDateTime.toLocaleDateString("ja-JP", {
        month: "short",
        day: "numeric",
      })} ${postTimeStr}`;
    } else {
      return `${postDateTime.toLocaleDateString("ja-JP", {
        year: "numeric",
        month: "short",
        day: "numeric",
      })} ${postTimeStr}`;
    }
  };

  return dateFormat;
};
export default useDateFormat;
