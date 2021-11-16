const register = async (username, email, password) => {
  const fetchOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, email, password }),
  };
  return await fetch(
    `https://rn-shopping-list.herokuapp.com/auth/register`,
    fetchOptions
  )
    .then((res) => res.json())
    .catch(() => ({
      error: { message: 'Unable to connect to server. Please try again' },
    }));
};

export default register;
