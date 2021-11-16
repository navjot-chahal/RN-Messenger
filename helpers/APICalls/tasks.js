export const getTasks = async (listId) => {
  const fetchOptions = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
  };
  return await fetch(
    `https://rn-shopping-list.herokuapp.com/task/${listId}`,
    fetchOptions
  )
    .then((res) => res.json())
    .catch(() => ({
      error: { message: 'Unable to connect to server. Please try again' },
    }));
};

export const postTask = async (listId, taskName) => {
  const fetchOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ listId, taskName }),
    credentials: 'include',
  };
  return await fetch(
    `https://rn-shopping-list.herokuapp.com/task/add`,
    fetchOptions
  )
    .then((res) => res.json())
    .catch(() => ({
      error: { message: 'Unable to connect to server. Please try again' },
    }));
};

export const deleteTask = async (taskId) => {
  const fetchOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ taskId }),
    credentials: 'include',
  };
  return await fetch(
    `https://rn-shopping-list.herokuapp.com/task/remove`,
    fetchOptions
  )
    .then((res) => res.json())
    .catch(() => ({
      error: { message: 'Unable to connect to server. Please try again' },
    }));
};

export const toggleTask = async (taskId) => {
  const fetchOptions = {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ taskId }),
    credentials: 'include',
  };
  return await fetch(
    `https://rn-shopping-list.herokuapp.com/task/toggle`,
    fetchOptions
  )
    .then((res) => res.json())
    .catch(() => ({
      error: { message: 'Unable to connect to server. Please try again' },
    }));
};
