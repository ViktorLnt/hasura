import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import { ApolloClient, InMemoryCache } from '@apollo/client';
import { useQuery, gql } from '@apollo/client';

const GET_USERS = gql`
  query GetUsers {
    users {
      id
      name
      email
    }
  }
`;

function UsersList() {
  const { loading, error, data } = useQuery(GET_USERS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return data.users.map((user: any) => (
    <div key={user.id}>
      <p>{user.name}</p>
      <p>{user.email}</p>
    </div>
  ));
}

function App() {
  const [count, setCount] = useState(0)

  const client = new ApolloClient({
    uri: 'https://your-hasura-url/v1/graphql',
    cache: new InMemoryCache()
  });
  

  return (
    <div className="App">
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src="/vite.svg" className="logo" alt="Vite logo" />
        </a>
        <a href="https://reactjs.org" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
      </div>
      {UsersList()}
    </div>
  )
}

export default App
