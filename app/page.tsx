'use client'

import { useEffect, useState } from "react";

export default function Home() {

  const [user, setUser] = useState()

  useEffect(() => {

    const fetchUser = async () => {
      const res = await fetch('/api/users', {method: 'GET'})
      const data = await res.json()
      setUser(data[0].firstName)
    }

    fetchUser()

  }, [])

  return (
    <div>
      <h1>Hello, {user}</h1>
    </div>
  );
}
