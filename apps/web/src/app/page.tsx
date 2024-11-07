async function getHello() {
  const res = await fetch('http://localhost:3333/hello')

  return await res.json()
}

export default async function Home() {
  const data = await getHello()

  return <div>{JSON.stringify(data, null, 2)}</div>
}
