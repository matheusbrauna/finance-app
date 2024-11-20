import { SignUpForm } from '@/components/sign-up-form'

export default function SignUp() {
  return (
    <div className="mx-auto grid w-full max-w-prose gap-4">
      <div>
        <h1 className="text-xl font-bold tracking-tight">Criar nova conta</h1>
        <p className="text-sm text-muted-foreground">
          Insira seus dados abaixo para começar a gerenciar suas finanças com
          facilidade.
        </p>
      </div>
      <SignUpForm />
    </div>
  )
}
