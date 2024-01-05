'use client'
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"

export default function ClientPage({ url }: { url: string }) {
  const supabase = createClientComponentClient()
  console.log(url)
  const handleSingInGithub = async () => {
    await supabase.auth.signInWithOAuth({
      provider: 'github',
      options: {
        redirectTo: `${url}/auth/callback`
      }
    })
  }

  const handleSingInGoogle = async () => {
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${url}/auth/callback`
      }
    })
  }

  return (
    <article className="absolute w-screen h-screen inset-0 flex flex-col items-center justify-center md:px-12 py-40">
      <div className="mb-20 px-6 py-12 flex justify-between items-center flex-col gap-12">
        <header className="p-2 flex flex-col items-center justify-center gap-2">
          <h1 className="text-3xl font-extrabold">¡Bienvenido de nuevo!</h1>
          <h3 className="text-sm text-gray-500">Inicia sesión para continuar</h3>
        </header>
        <div className="flex flex-col justify-center items-center w-full gap-4 [&>*]:flex-grow">
          <GoogleButton handleClick={handleSingInGoogle} />
          <GithubButton handleClick={handleSingInGithub} />
        </div>
      </div>
    </article>
  )
}


const GithubButton = ({ handleClick }: { handleClick: () => void }) => {
  return (
    <button
      onClick={handleClick}
      type="button" className="w-full text-white bg-[#24292F] hover:bg-[#24292F]/90 focus:ring-4 focus:outline-none focus:ring-[#24292F]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center justify-center">
      <svg className="w-4 h-4 me-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M10 .333A9.911 9.911 0 0 0 6.866 19.65c.5.092.678-.215.678-.477 0-.237-.01-1.017-.014-1.845-2.757.6-3.338-1.169-3.338-1.169a2.627 2.627 0 0 0-1.1-1.451c-.9-.615.07-.6.07-.6a2.084 2.084 0 0 1 1.518 1.021 2.11 2.11 0 0 0 2.884.823c.044-.503.268-.973.63-1.325-2.2-.25-4.516-1.1-4.516-4.9A3.832 3.832 0 0 1 4.7 7.068a3.56 3.56 0 0 1 .095-2.623s.832-.266 2.726 1.016a9.409 9.409 0 0 1 4.962 0c1.89-1.282 2.717-1.016 2.717-1.016.366.83.402 1.768.1 2.623a3.827 3.827 0 0 1 1.02 2.659c0 3.807-2.319 4.644-4.525 4.889a2.366 2.366 0 0 1 .673 1.834c0 1.326-.012 2.394-.012 2.72 0 .263.18.572.681.475A9.911 9.911 0 0 0 10 .333Z" clipRule="evenodd" />
      </svg>
      Iniciar sesión con Github
    </button>
  )
}

const GoogleButton = ({ handleClick }: { handleClick: () => void }) => {
  return (
    <button
      onClick={handleClick}
      type="button" className="w-full text-white bg-[#4285F4] hover:bg-[#4285F4]/90 focus:ring-4 focus:outline-none focus:ring-[#4285F4]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center justify-center">
      <svg className="w-4 h-4 me-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 19">
        <path fillRule="evenodd" d="M8.842 18.083a8.8 8.8 0 0 1-8.65-8.948 8.841 8.841 0 0 1 8.8-8.652h.153a8.464 8.464 0 0 1 5.7 2.257l-2.193 2.038A5.27 5.27 0 0 0 9.09 3.4a5.882 5.882 0 0 0-.2 11.76h.124a5.091 5.091 0 0 0 5.248-4.057L14.3 11H9V8h8.34c.066.543.095 1.09.088 1.636-.086 5.053-3.463 8.449-8.4 8.449l-.186-.002Z" clipRule="evenodd" />
      </svg>
      Iniciar sesión con Google
    </button>
  )
}
