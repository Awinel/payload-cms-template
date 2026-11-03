'use client'

import { useActionState } from 'react'

import { loginAction, type LoginState } from '@/actions/auth'

const inputClassName =
  'w-full rounded-md border border-gray-700 bg-gray-900 px-3 py-2 text-white outline-none focus:border-green-500'

export default function SignIn({ redirectTo = '/' }: { redirectTo?: string }) {
  const [state, formAction, pending] = useActionState<LoginState, FormData>(loginAction, {})

  return (
    <form action={formAction} className="flex w-80 flex-col gap-4">
      <input type="hidden" name="redirect" value={redirectTo} />

      <label className="flex flex-col gap-1 text-sm">
        Email
        <input
          autoComplete="email"
          className={inputClassName}
          defaultValue={state.email}
          name="email"
          required
          type="email"
        />
      </label>

      <label className="flex flex-col gap-1 text-sm">
        Password
        <input
          autoComplete="current-password"
          className={inputClassName}
          name="password"
          required
          type="password"
        />
      </label>

      {state.error && (
        <p className="text-sm text-red-400" role="alert">
          {state.error}
        </p>
      )}

      <button
        className="rounded-md bg-green-500 px-4 py-2 font-medium disabled:opacity-60"
        disabled={pending}
        type="submit"
      >
        {pending ? 'Logging in…' : 'Log in'}
      </button>
    </form>
  )
}
