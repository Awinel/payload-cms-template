import { logoutAction } from '@/actions/auth'

export default function SignOut({ className }: { className?: string }) {
  return (
    <form action={logoutAction}>
      <button className={className} type="submit">
        Log out
      </button>
    </form>
  )
}
