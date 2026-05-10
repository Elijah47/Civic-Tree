'use client'
import { useState } from 'react'
import { createClient } from '@/lib/supabase'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleLogin() {
    setLoading(true)
    const supabase = createClient()
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) setMessage('Error: ' + error.message)
    else window.location.href = '/dashboard'
    setLoading(false)
  }

  return (
    <main>
      <h1>Civic Tree</h1>
      <h2>Log In</h2>
      <input
        id="email"
        type="email"
        placeholder="Email"
        value={email}
        onChange={e => setEmail(e.target.value)}
      />
      <input
        id="password"
        type="password"
        placeholder="Password"
        value={password}
        onChange={e => setPassword(e.target.value)}
      />
      <button onClick={handleLogin} disabled={loading}>
        {loading ? 'Logging in...' : 'Log In'}
      </button>
      {message && <p>{message}</p>}
      <a href="/auth/signup">Don't have an account? Sign up</a>
    </main>
  )
}
