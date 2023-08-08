'use client'

import { useState, useEffect } from 'react'

import Profile from '@components/Profile'

const OtherProfile = ({ params }) => {
  const [posts, setPosts] = useState([])
  const [user, setUser] = useState({ username: '' })

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch(`/api/users/${params.id}/posts`)
      const data = await response.json()
      setPosts(data)
    }
    const fetchUser = async () => {
      const response = await fetch(`/api/users/${params.id}`)
      const data = await response.json()
      setUser(data)
    }

    if (params.id) {
      fetchPosts()
      fetchUser()
    }
  }, [])

  return (
    <Profile
      name={user?.username + '的'}
      desc={`欢迎访问${user?.username}的个性化个人词库页面`}
      data={posts}
    />
  )
}

export default OtherProfile
