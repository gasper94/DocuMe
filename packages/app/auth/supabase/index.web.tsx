import React, { useCallback } from 'react'
import { SupabaseContext } from './SupabaseContext'
// on Web, we don't use React Navigation, so we avoid the provider altogether
// instead, we just have a no-op here
// for more, see: https://solito.dev/recipes/tree-shaking

// export const SupabaseProvider = ({
//   children,
// }: {
//   children: React.ReactElement
// }) => <>{children}</>

// Supabase
import { EmailOtpType, createClient } from '@supabase/supabase-js'

// Router
// import { useSegments } from 'expo-router'
import { useRouter } from 'solito/router'

// This hook will protect the route access based on user authentication.
function useProtectedRoute(isLoggedIn: boolean) {
  // const segments = useSegments()
  const router = useRouter()

  React.useEffect(() => {
    if (
      // If the user is not logged in and the initial segment is not anything in the auth group.
      !isLoggedIn
    ) {
      // Redirect to the sign-up page.
      router.replace('/login')
    } else if (isLoggedIn) {
      // Redirect away from the sign-up page.
      router.replace('/home')
    }
  }, [isLoggedIn])
}

type SupabaseProviderProps = {
  children: JSX.Element | JSX.Element[]
}

export const SupabaseProvider = (props: SupabaseProviderProps) => {
  const [isTest, setIsTest] = React.useState<string>('This is a test - web')

  const [isLoggedIn, setLoggedIn] = React.useState<boolean>(false)

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL || '',
    process.env.NEXT_PUBLIC_SUPABASE_KEY || '',
    {
      auth: {
        // storage: ExpoSecureStoreAdapter,
        autoRefreshToken: true,
        persistSession: true,
        detectSessionInUrl: false,
      },
    }
  )

  const signUp = async (email: string, password: string) => {
    const { error } = await supabase.auth.signUp({
      email,
      password,
    })
    if (error) throw error
  }

  const verifyOtp = async (
    email: string,
    token: string,
    type: EmailOtpType
  ) => {
    const { error } = await supabase.auth.verifyOtp({
      email,
      token,
      type,
    })
    if (error) throw error
    setLoggedIn(true)
  }

  const signInWithPassword = async (email: string, password: string) => {
    console.log('ready to login')
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })
    if (error) throw error
    setLoggedIn(true)
  }

  const resetPasswordForEmail = async (email: string) => {
    const { error } = await supabase.auth.resetPasswordForEmail(email)
    if (error) throw error
  }

  const signOut = async () => {
    const { error } = await supabase.auth.signOut()
    if (error) throw error
    setLoggedIn(false)
  }

  const LoggedInUser = async () => {
    const { data, error } = await supabase.auth.getUser()
    if (error) throw error
    return data
  }

  const getSession = useCallback(async () => {
    const result = await supabase.auth.getSession()
    console.log('getSession:result', result)
    setLoggedIn(result.data.session !== null)
  }, [supabase])

  React.useEffect(() => {
    getSession()
    console.log('isLoggedIn', isLoggedIn)
  }, [isLoggedIn, getSession])

  useProtectedRoute(isLoggedIn)

  React.useEffect(() => {
    console.log('change')
  })

  return (
    <SupabaseContext.Provider
      value={{
        isTest,
        isLoggedIn,
        signInWithPassword,
        verifyOtp,
        signUp,
        resetPasswordForEmail,
        signOut,
        LoggedInUser,
        supabase,
      }}
    >
      {props.children}
    </SupabaseContext.Provider>
  )
}
