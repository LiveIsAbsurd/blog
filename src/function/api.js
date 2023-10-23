import { getPostAction, loading, getArticleAction, authentication } from './actions';

export const getPosts = (offset) => {
  return async (dispatch) => {
    dispatch(loading());
    const response = await fetch(`https://blog.kata.academy/api/articles?offset=${offset}`);
    const data = await response.json();
    const page = offset / 20;
    dispatch(getPostAction(data, page));
  };
};

export const getArticle = (slug) => {
  return async (dispatch) => {
    dispatch(loading());
    const response = await fetch(`https://blog.kata.academy/api/articles/${slug}`);
    const data = await response.json();
    dispatch(getArticleAction(data.article));
  };
};

export const onRegister = (data, setError, history) => {
  return (dispatch) => {
    const userData = {
      user: {
        username: data.username,
        email: data.email.toLowerCase(),
        password: data.password,
      },
    };
    fetch('https://blog.kata.academy/api/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.errors) {
          console.log(data.errors);
          if (data.errors.username) {
            setError('username', {
              type: 'taken',
              message: 'Уже используется',
            });
          }

          if (data.errors.email) {
            setError('email', {
              type: 'taken',
              message: 'Уже используется',
            });
          }
        } else {
          dispatch(authentication(data.user));
          history.push('/article');
        }
      });
  };
};

export const onAuth = (data, setError, history) => {
  return (dispatch) => {
    const userData = {
      user: {
        email: data.email.toLowerCase(),
        password: data.password,
      },
    };
    fetch('https://blog.kata.academy/api/users/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.errors) {
          console.log(data.errors);

          setError('password', {
            type: 'taken',
            message: 'Не верные данные',
          });
        } else {
          dispatch(authentication(data.user));
          history.push('/articles');
        }
      });
  };
};

export const onUpdateProfile = (data, token, setError, history) => {
  console.log(token);
  return (dispatch) => {
    const userData = {
      user: {
        username: data.username,
        email: data.email.toLowerCase(),
        password: data.password ? data.password : null,
        image: data.image ? data.image : null,
      },
    };
    if (!data.password) {
      delete userData.user.password;
    }
    if (!data.image) {
      delete userData.user.image;
    }
    fetch('https://blog.kata.academy/api/user', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Token ${token}`,
      },
      body: JSON.stringify(userData),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.errors) {
          console.log(data.errors);

          if (data.errors.username) {
            setError('username', {
              type: 'taken',
              message: 'Уже используется',
            });
          }

          if (data.errors.email) {
            setError('email', {
              type: 'taken',
              message: 'Уже используется',
            });
          }
        } else {
          dispatch(authentication(data.user));
          history.push('/articles');
        }
      });
  };
};

export const findUser = (token) => {
  return (dispatch) => {
    fetch('https://blog.kata.academy/api/user', {
      method: 'GET',
      headers: {
        Authorization: `Token ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        dispatch(authentication(data.user));
      });
  };
};

export const createArticle = (data, token, history) => {
  return (dispatch) => {
    console.log(data, token);
    fetch('https://blog.kata.academy/api/articles', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Token ${token}`,
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then(() => {
        history.push('/articles');
        dispatch(getPosts(0));
      });
  };
};
