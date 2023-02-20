const GetConfig = () => ({
  headers: { Authorization: `Bearer ${JSON.parse(localStorage.getItem('token')).token}` },
});

export default GetConfig;
