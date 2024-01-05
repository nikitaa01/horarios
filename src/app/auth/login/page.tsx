import ClientPage from "./ClientPage"

export default function Page() {
  const url = process.env.LOCAL_URL

  return <ClientPage url={url ?? 'http://localhost:3000'} />
}
