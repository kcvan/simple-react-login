import { History } from 'history';
import * as React from 'react';
import { withRouter } from 'react-router-dom';

interface RouterProps {
  history: History;
  location: {
    hash: string;
    key: string;
    pathname: string;
    search: string;
    state: string | undefined;
  };
  match: {
    isExact: boolean;
    params: {
      id: string;
    };
    path: string;
    url: string;
  };
}

const LoginForm = (props: RouterProps) => {
  const [name, setName] = React.useState<string>('kevin');
  const [username, setUsername] = React.useState<string>('kcvan');
  const [email, setEmail] = React.useState<string>('text@gmail.com');
  const [password, setPassword] = React.useState<string>('Test1234!');

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="name">Name</label>
        <input type="text" name="name" id="name" onChange={event => setName(event.target.value)} value={name} />
      </div>
      <div>
        <label htmlFor="username">User Name</label>
        <input type="text" name="username" id="username" onChange={event => setUsername(event.target.value)} value={username} />
      </div>
      <div>
        <label htmlFor="email">Email</label>
        <input type="email" name="email" id="email" onChange={event => setEmail(event.target.value)} value={email} />
      </div>
      <div>
        <label htmlFor="password">Password</label>
        <input type="password" name="password" id="password" onChange={event => setPassword(event.target.value)} value={password} />
      </div>
      <button type="submit">Submit</button>
    </form>
  );

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    console.log(props.location);
    const formData = {
      email,
      password
    }

    fetch('/users', {
      method: 'post',
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify({...formData, name, username})
    })
    .then(response => {
      console.log('user created');
      return response.json();
    })
    .then(_ => {
      console.log('logging in');
      return fetch('/auth/login', {
        method: 'post',
        headers: {
          "Content-type": "application/json"
        },
        body: JSON.stringify(formData)
      });
    })
    .then(response => {
      console.log('logged in');
      return response.json();
    })
    .then(data => {
      localStorage.setItem('myToken', data.token);
      props.history.push('/');
    })
  }
}

export default withRouter(LoginForm);