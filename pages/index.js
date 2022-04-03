export default function Home({ data }) {
  console.log(data)
  const router = useRouter();
  return (
    <div>
  
    {/* added font and the link is to the _document.js */}
    <style jsx>{`
        h2 {
          color: red;
          font-family: 'Roboto', sans-serif;
        }
      `}</style>
      <h1>Home Page</h1>
      <h2>{data.title}</h2>
      <p>{data.body}</p>
    </div>
  )
}
// server side rendering and fetch data at the begining
export async function getStaticProps() {
  // Data Fetching
  const res = await fetch("https://jsonplaceholder.typicode.com/posts/5")
  const data = await res.json()
  return {
    props: {
      data
    }
  }
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

