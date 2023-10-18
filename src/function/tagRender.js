import truncText from './truncText';

const tagRender = (tagList, styles) => {
  const tags = tagList.map((tag, i) => {
    if (tag && tag.trim()) {
      if (i === 5) {
        return '...';
      } else if (i > 5) {
        return;
      } else {
        return (
          <span key={i} className={styles.tag}>
            {truncText(tag, 5)}
          </span>
        );
      }
    }
  });
  return tags;
};

export default tagRender;
