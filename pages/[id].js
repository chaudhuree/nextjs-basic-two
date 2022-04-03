import { useRouter } from "next/router";
export default function Post({ data }) {
  console.log(data);
  const router = useRouter();
  return (
    <div>
    {/* if any dynamic routed data is not available and fallback is true */}
      if(router.isFallback) {<p>Loading...</p>}
      {/* get data from client side */}
      <p>{router.query.id}</p>
      {/* added font and the link is to the _document.js */}
      <style jsx>{`
        h2 {
          color: red;
          font-family: "Roboto", sans-serif;
        }
      `}</style>
      <h1>Home Page</h1>
      <h2>{data.title}</h2>
      <p>{data.body}</p>
    </div>
  );
}
// server side rendering and fetch data at the begining
export async function getStaticProps({ params }) {
  // get data from server side
  console.log("getStaticProps", params);
  // Data Fetching
  const res = await fetch("https://jsonplaceholder.typicode.com/posts/5");
  const data = await res.json();
  return {
    props: {
      data,
    },
  };
}

// server side rendering and fetch data at every page refresh
// export async function getServerSideProps() {
//   // Data Fetching
//   const res = await fetch("https://jsonplaceholder.typicode.com/posts/7")
//   const data = await res.json()
//   return {
//     props: {
//       data
//     }
//   }
// }

export async function getStaticPaths() {
  const res = await fetch("https://jsonplaceholder.typicode.com/posts");
  const posts = await res.json();
  // create paths for all posts dynamically
  const paths = posts.map((post) => ({
    params: { id: post.id.toString() },
  }));
  return {
    paths,
    fallback: true,
  };
}
