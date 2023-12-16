export const groupByDate = (list) => {
  return list.reduce((acc, item) => {
    const date = formatDate(item.dt);
    if (!acc[date]) {
      acc[date] = item;
    }
    return acc;
  }, {});
};


export const formatDate = (date) => {
    const d = new Date(date * 1000);
    const day = d.toLocaleDateString("en-US", { weekday: "short" });
    const dayOfMonth = d.getDate();

    let suffix = "th";
    if (dayOfMonth === 1 || dayOfMonth === 21 || dayOfMonth === 31) {
      suffix = "st";
    } else if (dayOfMonth === 2 || dayOfMonth === 22) {
      suffix = "nd";
    } else if (dayOfMonth === 3 || dayOfMonth === 23) {
      suffix = "rd";
    }

    return `${day}, ${dayOfMonth}${suffix}`;
  };