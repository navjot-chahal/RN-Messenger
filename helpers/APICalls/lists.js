export const getLists = async () => {
  const fetchOptions = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
  };
  return await fetch(
    `https://rn-shopping-list.herokuapp.com/list/getAll`,
    fetchOptions
  )
    .then((res) => res.json())
    .catch(() => ({
      error: { message: 'Unable to connect to server. Please try again' },
    }));
};

export const postList = async (listName) => {
  const fetchOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ listName }),
    credentials: 'include',
  };
  return await fetch(
    `https://rn-shopping-list.herokuapp.com/list/add`,
    fetchOptions
  )
    .then((res) => res.json())
    .catch(() => ({
      error: { message: 'Unable to connect to server. Please try again' },
    }));
};

export const deleteList = async (listId) => {
  const fetchOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ listId }),
    credentials: 'include',
  };
  return await fetch(
    `https://rn-shopping-list.herokuapp.com/list/remove`,
    fetchOptions
  )
    .then((res) => res.json())
    .catch(() => ({
      error: { message: 'Unable to connect to server. Please try again' },
    }));
};
