import { GetServerSideProps, NextPage } from 'next'
import { AllCards } from '../components/CategoryCard/AllCards'
import { Charts } from '../components/Charts/Charts'
import { Header } from '../components/Header/Header'
import { Transactions } from '../components/Transactions/Transactions'
import { VStack } from '@chakra-ui/react'
import { getAuth } from '@clerk/nextjs/server'
import { prisma } from '../server/db'
import { createProxySSGHelpers } from '@trpc/react-query/ssg'
import { appRouter } from '../server/api/root'
import SuperJSON from 'superjson'
import Head from 'next/head'

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const auth = getAuth(req)
  const ssg = createProxySSGHelpers({
    router: appRouter,
    ctx: { prisma, auth },
    transformer: SuperJSON,
  })

  await ssg.categories.getAll.prefetch()
  await ssg.transactions.getAll.prefetch()

  return {
    props: {
      trpcState: ssg.dehydrate(),
    },
  }
}

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Finance App</title>
        <meta
          name="description"
          content="Um aplicativo de controle de finanças fácil e simples de usar."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <VStack p={4} spacing={10} align="stretch">
        <Header />
        <AllCards />
        <Charts />
        <Transactions />
      </VStack>
    </>
  )
}

export default Home
