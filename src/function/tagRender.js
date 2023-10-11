const tagRender = (tagList, styles) => {
  const tags = tagList.map((tag, i) => {
    if (tag) {
      return (
        <span key={i} className={styles.tag}>
          {tag}
        </span>
      );
    }
  });
  return tags;
};

export default tagRender;
