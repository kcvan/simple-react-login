import * as React from 'react';
import { Link } from 'react-router-dom';

const Home = (): JSX.Element => {
  const [isLoggedIn, setIsLoggedIn] = React.useState<boolean>(false);

  React.useEffect(() => {
    setIsLoggedIn(localStorage.getItem('myToken') ? true : false);
  }, []);

  return (
    <section>
      <h1>Home Page</h1>
      <h2>{isLoggedIn ? 'Logged In' : 'Logged Out'}</h2>
      <Link to="/login">
        <button>Login Page</button>
      </Link>
    </section>
  );
}

export default Home;