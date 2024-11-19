'use client'

import Link from 'next/link'

import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { authClient } from '@/lib/auth-client'
import { signInSchema } from '@/lib/validations/auth'
import { zodResolver } from '@hookform/resolvers/zod'
import { Loader2 } from 'lucide-react'
import { useTransition } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import type { z } from 'zod'

export function SignInForm() {
  const [isPending, startTransition] = useTransition()
  const form = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  async function onSubmit(values: z.infer<typeof signInSchema>) {
    const { email, password } = values

    startTransition(async () => {
      const { error } = await authClient.signIn.email({
        email,
        password,
        callbackURL: '/',
      })

      if (error) {
        toast.error('Falha ao realizar login', {
          description: error.message,
        })
      }
    })
  }

  return (
    <Card className="mx-auto max-w-sm">
      <CardHeader>
        <CardTitle className="text-2xl">Entrar</CardTitle>
        <CardDescription>
          Acesse sua conta usando seu email e senha.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="grid gap-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>E-mail</FormLabel>
                    <FormControl>
                      <Input
                        disabled={isPending}
                        placeholder="m@example.com"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex items-center">
                      <FormLabel>Senha</FormLabel>
                      <Link
                        href="#"
                        className="ml-auto inline-block text-sm underline"
                      >
                        Esqueceu sua senha?
                      </Link>
                    </div>
                    <FormControl>
                      <Input
                        type="password"
                        disabled={isPending}
                        placeholder="********"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button disabled={isPending} type="submit" className="w-full">
                {isPending ? (
                  <>
                    Carregando...
                    <Loader2 className="size-4 animate-spin" />
                  </>
                ) : (
                  'Entrar'
                )}
              </Button>
              <div className="mt-4 text-center text-sm">
                Não possui uma conta?{' '}
                <Link href="/sign-up" className="underline">
                  Criar conta
                </Link>
              </div>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}
