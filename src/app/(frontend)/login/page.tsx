import config from '@payload-config'
import { headers as getHeaders } from 'next/headers.js'
import { redirect } from 'next/navigation'
import { getPayload } from 'payload'

import BlackHole from '@/components/BlackHole'
import SignIn from '@/components/SignIn'
import { safeRedirectPath } from '@/utilities/safeRedirectPath'

export const metadata = {
  title: 'Log in',
}

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ redirect?: string }>
}) {
  const redirectTo = safeRedirectPath((await searchParams).redirect)

  const payload = await getPayload({ config })
  const { user } = await payload.auth({ headers: await getHeaders() })

  if (user) redirect(redirectTo)

  return (
    <BlackHole>
      <div className="flex h-screen flex-col items-center justify-center gap-6 text-white">
        <h1 className="text-2xl font-semibold">Log in</h1>
        <SignIn redirectTo={redirectTo} />
      </div>
    </BlackHole>
  )
}
