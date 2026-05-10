'use client'
import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase'

export default function Dashboard() {
  const [user, setUser] = useState(null)

  useEffect(() => {
    async function getUser() {
      const supabase = createClient()
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) window.location.href = '/auth/login'
      else setUser(user)
    }
    getUser()
  }, [])

  async function handleLogout() {
    const supabase = createClient()
    await supabase.auth.signOut()
    window.location.href = '/auth/login'
  }

  if (!user) return <p>Loading...</p>

  return (
    <main>
      <h1>🌳 Civic Tree</h1>
      <p>Welcome, {user.email}</p>
      <button onClick={handleLogout}>Log Out</button>
    </main>
  )
}
