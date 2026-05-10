'use client'
import { useState } from 'react'
import { createClient } from '@/lib/supabase'

export default function SignUp() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSignUp() {
    setLoading(true)
    const supabase = createClient()
    const { error } = await supabase.auth.signUp({ email, password })
    if (error) setMessage('Error: ' + error.message)
    else setMessage('Check your email to confirm your account!')
    setLoading(false)
  }

  return (
    <main style={{padding: 40, maxWidth: 400, margin: '0 auto', fontFamily: 'monospace'}}>
      <h1>Civic Tree</h1>
      <h2>Create Account</h2>
      <div style={{display: 'flex', flexDirection: 'column', gap: 12, marginTop: 24}}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)} style={{padding: 10, fontSize: 16, borderRadius: 6, border: '1px solid #ccc'}}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          style={{padding: 10, fontSize: 16, borderRadius: 6, border: '1px solid #ccc'}}
        />
        <button
          onClick={handleSignUp}
          disabled={loading}
          style={{padding: 12, fontSize: 16, background: '#2D6A2D', color: 'white', border: 'none', borderRadius: 6, cursor: 'pointer'}}
        >
          {loading ? 'Creating account...' : 'Sign Up'}
        </button>
        {message && <p>{message}</p>}
        <a href="/auth/login" style={{color: '#2D6A2D', textAlign: 'center'}}>Already have an account? Log in</a>
      </div>
    </main>
  )
}
