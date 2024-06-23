const useDateFormat = () => {
  const dateFormat = (date: Date) => {
    const postDate = new Date(date);
    const postTimeStr = postDate.toLocaleTimeString("ja-JP", {
      hour: "2-digit",
      minute: "2-digit",
    });
    const currentDate = new Date();
    const previousDate = new Date(currentDate);
    previousDate.setDate(currentDate.getDate() - 1);
    const previousWeekDate = new Date(currentDate);
    previousWeekDate.setDate(currentDate.getDate() - 7);

    if (currentDate.getDate() - postDate.getDate() <= 10) {
      if (postDate.getDate() === currentDate.getDate()) {
        return `今日 ${postTimeStr}`;
      } else if (postDate.getDate() === previousDate.getDate()) {
        return `昨日 ${postTimeStr}`;
      } else {
        return `${
          currentDate.getDate() - postDate.getDate()
        }日前 ${postTimeStr}`;
      }
    } else if (currentDate.getFullYear() - postDate.getFullYear() <= 0) {
      return `${postDate.toLocaleDateString("ja-JP", {
        month: "short",
        day: "numeric",
      })} ${postTimeStr}`;
    } else {
      return `${postDate.toLocaleDateString("ja-JP", {
        year: "numeric",
        month: "short",
        day: "numeric",
      })} ${postTimeStr}`;
    }
  };

  return dateFormat;
};
export default useDateFormat;
