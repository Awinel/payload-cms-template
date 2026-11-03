'use server'

import config from '@payload-config'
import { login, logout } from '@payloadcms/next/auth'
import { redirect } from 'next/navigation'

import { safeRedirectPath } from '@/utilities/safeRedirectPath'

export type LoginState = {
  email?: string
  error?: string
}

export async function loginAction(_prevState: LoginState, formData: FormData): Promise<LoginState> {
  const email = String(formData.get('email') ?? '').trim()
  const password = String(formData.get('password') ?? '')

  if (!email || !password) {
    return { email, error: 'Email and password are required.' }
  }

  try {
    await login({ collection: 'users', config, email, password })
  } catch {
    return { email, error: 'The email or password is incorrect.' }
  }

  redirect(safeRedirectPath(formData.get('redirect')))
}

export async function logoutAction(): Promise<void> {
  await logout({ config })
  redirect('/')
}
