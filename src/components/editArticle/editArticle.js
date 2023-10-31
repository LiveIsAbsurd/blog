import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { createArticle } from '../../function/api';

import styles from './editArticle.module.sass';

const EditArticle = ({ slug = null }) => {
  const [click, setClick] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();
  const token = useSelector((state) => state.token);
  const article = useSelector((state) => state.article);
  const articleTags = article
    ? article.tagList.map((el) => {
        return { text: el };
      })
    : [];
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const [tags, setTags] = useState([...articleTags]);

  useEffect(() => {
    setTimeout(() => setClick(() => false), 5000);
  }, [click]);

  const deleteTag = (i) => {
    const newTags = [...tags];
    newTags.splice(i, 1);
    setTags(newTags);
  };

  const addTag = () => {
    if (!tags.length) {
      const newTags = [...tags];
      newTags.push({ text: ' ' });
      setTags(newTags);
    } else if (!tags[tags.length - 1].text.trim()) {
      return;
    } else {
      const newTags = [...tags];
      newTags.push({ text: ' ' });
      setTags(newTags);
    }
  };

  const change = (i, e) => {
    const newTags = [...tags];
    newTags[i].text = e.target.value;
    setTags(newTags);
  };

  const but = (
    <button className={styles.add} type="button" onClick={() => addTag()}>
      Add tag
    </button>
  );

  const tagList = tags.map((el, i) => {
    let text = el.text.trim();
    if (!el.text) {
      deleteTag(i);
    }
    const addBut = i == tags.length - 1 || tags.length == 0 ? but : null;
    return (
      <div key={i} className={styles.input}>
        <input placeholder="tag" type="text" value={text} onChange={(e) => change(i, e)}></input>
        <button
          className={styles.delete}
          type="button"
          onClick={() => {
            deleteTag(i);
          }}
        >
          Delete
        </button>
        {addBut}
      </div>
    );
  });

  const onSubmit = (data) => {
    if (click) return;
    setClick(() => true);
    const tagList = tags.map((el) => el.text);
    const article = {
      article: {
        title: data.title,
        description: data.desc,
        body: data.text,
        tagList: [...tagList],
      },
    };
    if (!tagList.length) {
      delete article.article.tags;
    }
    dispatch(createArticle(article, token, history, slug));
  };

  return (
    <div className={styles.window}>
      <form onSubmit={handleSubmit((data) => onSubmit(data))}>
        <span className={styles.header}>{slug ? 'Edit article' : 'Create new article'}</span>

        <div className={styles.container}>
          <span className={styles.inputHead}>Title</span>
          <input
            {...register('title', {
              required: 'Обязательное поле',
            })}
            placeholder="Title"
            type="text"
            style={errors.title ? { borderColor: 'red' } : null}
            defaultValue={article ? article.title : null}
          ></input>
          {errors.title && <span className={styles.errorMessage}>{errors.title.message}</span>}
        </div>

        <div className={styles.container}>
          <span className={styles.inputHead}>Short description</span>
          <input
            {...register('desc', {
              required: 'Обязательное поле',
            })}
            defaultValue={article ? article.description : null}
            placeholder="Title"
            type="text"
            style={errors.desc ? { borderColor: 'red' } : null}
          ></input>
          {errors.desc && <span className={styles.errorMessage}>{errors.desc.message}</span>}
        </div>

        <div className={styles.container}>
          <span className={styles.inputHead}>Text</span>
          <textarea
            {...register('text', {
              required: 'Обязательное поле',
            })}
            defaultValue={article ? article.body : null}
            placeholder="Text"
            type="text"
            style={errors.text ? { borderColor: 'red' } : null}
            className={styles.text}
          ></textarea>
          {errors.text && <span className={styles.errorMessage}>{errors.text.message}</span>}
        </div>

        <span className={styles.inputHead}>Tags</span>
        {tagList.length == 0 ? <div>{but}</div> : tagList}
        <button
          style={Object.keys(errors).length !== 0 || click ? { opacity: '0.4', cursor: 'unset' } : null}
          className={styles.send}
        >
          Send
        </button>
      </form>
    </div>
  );
};

export default EditArticle;
