function dateParser(date: string) {
  const postedDate = new Date(date);
  const currentDate = new Date();
  if (postedDate.getFullYear() === currentDate.getFullYear()) {
    const monthDifference = currentDate.getMonth() - postedDate.getMonth();
    if (monthDifference === 0) {
      const dayDifference = currentDate.getDate() - postedDate.getDate();
      if (dayDifference === 0) {
        const timeDifference = currentDate.getHours() - postedDate.getHours();
        if (timeDifference === 0) {
          const minuteDifference = currentDate.getMinutes() - postedDate.getMinutes();
          if (minuteDifference < 1) return 'Now';
          if (timeDifference < 60) {
            return `${minuteDifference} minute${minuteDifference > 1 ? 's' : ''} ago`;
          }
        }
        if (timeDifference < 23) {
          return `${timeDifference} hour${timeDifference > 1 ? 's' : ''} ago`;
        }
      }
      if (dayDifference > 0) {
        return `${dayDifference} day${dayDifference > 1 ? 's' : ''} ago`;
      }
    }
    if (monthDifference > 0 && monthDifference < 12) {
      return `${monthDifference} month${monthDifference > 1 ? 's' : ''} ago`;
    }
    return 'This Year';
  }
  return 'Error';
}

export { dateParser };
