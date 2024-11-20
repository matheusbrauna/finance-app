import { SignInForm } from '@/components/sign-in-form'

export default function SignIn() {
  return (
    <div className="mx-auto grid w-full max-w-prose gap-4">
      <div>
        <h1 className="text-xl font-bold tracking-tight">Acesse sua conta</h1>
        <p className="text-sm text-muted-foreground">
          Insira seus dados abaixo para gerenciar suas finanças com facilidade.
        </p>
      </div>
      <SignInForm />
    </div>
  )
}
