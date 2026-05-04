'use client'
import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase'

export default function Home() {
  const [status, setStatus] = useState('Connecting...')

  useEffect(() => {
    async function test() {
      const supabase = createClient()
      const { data, error } = await supabase.from('issues').select('count')
      if (error) setStatus('❌ Connection failed: ' + error.message)
      else setStatus('✅ Supabase connected — database ready')
    }
    test()
  }, [])

  return (
    <main style={{ padding: 40, fontFamily: 'monospace' }}>
      <h1>🌳 Civic Tree</h1>
      <p>{status}</p>
    </main>
  )
}
