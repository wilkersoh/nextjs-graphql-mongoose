import Head from "next/head";
import fetch from "isomorphic-unfetch";
import Link from "next/link";

const Index = ({ users }) => {
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <h1>GraphQL and Connection with mongoose</h1>
      <ul>
        {users?.map((user) => (
          <li key={user._id}>
            <Link href='/user/[id]' as={`/user/${user._id}`}>
              <a>{`User ${user.name}`}</a>
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
};

export async function getServerSideProps(context) {
  const response = await fetch("http://localhost:3000/api/users");
  const users = await response.json();

  return { props: { users } };
}

export default Index;
