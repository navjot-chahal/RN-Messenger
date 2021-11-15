const loginWithCookies = async () => {
  const fetchOptions = {
    method: 'GET',
    credentials: 'include',
  };
  return await fetch(`http://localhost:3001/auth/user`, fetchOptions)
    .then((res) => res.json())
    .catch(() => ({
      error: { message: 'Unable to connect to server. Please try again' },
    }));
};

export default loginWithCookies;
