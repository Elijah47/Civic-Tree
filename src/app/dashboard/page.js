'use client'
import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase'

export default function Dashboard() {
  const [user, setUser] = useState(null)
  const [profile, setProfile] = useState(null)
  const [zip, setZip] = useState('')
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState('')

  useEffect(() => {
    async function load() {
      const supabase = createClient()
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) { window.location.href = '/auth/login'; return }
      setUser(user)

      // Get or create profile
      let { data: profile } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single()

      if (!profile) {
        const { data: newProfile } = await supabase
          .from('profiles')
          .insert({ id: user.id })
          .select()
          .single()
        profile = newProfile
      }

      setProfile(profile)
      setZip(profile?.zip_code || '')
    }
    load()
  }, [])

  async function saveZip() {
    setSaving(true)
    const supabase = createClient()
    const { error } = await supabase
      .from('profiles')
      .update({ zip_code: zip })
      .eq('id', user.id)
    if (error) setMessage('Error saving zip')
    else setMessage('Zip code saved!')
    setSaving(false)
  }

  async function handleLogout() {
    const supabase = createClient()
    await supabase.auth.signOut()
    window.location.href = '/auth/login'
  }

  if (!user) return <p>Loading...</p>

  return (
    <main style={{padding: 40, maxWidth: 500, margin: '0 auto', fontFamily: 'monospace'}}>
      <h1>🌳 Civic Tree</h1>
      <p>Welcome, {user.email}</p>
      <p>Points: {profile?.points || 0}</p>

      <h2>Your Location</h2>
      <p>Enter your zip code so we can find your local officials.</p>
      <input
        id="zip"
        type="text"
        placeholder="e.g. 33317"
        value={zip}
        onChange={e => setZip(e.target.value)}
        style={{padding: 10, fontSize: 16, borderRadius: 6, border: '1px solid #ccc', marginRight: 10}}
      />
      <button onClick={saveZip} disabled={saving}
        style={{padding: 10, background: '#2D6A2D', color: 'white', border: 'none', borderRadius: 6, cursor: 'pointer'}}>
        {saving ? 'Saving...' : 'Save'}
      </button>
      {message && <p>{message}</p>}

      <br/><br/>
      <button onClick={handleLogout}
        style={{padding: 10, background: '#888', color: 'white', border: 'none', borderRadius: 6, cursor: 'pointer'}}>
        Log Out
      </button>
    </main>
  )
}
