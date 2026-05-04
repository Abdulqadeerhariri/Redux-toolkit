import React, { useEffect, useState } from 'react'
import appwriteService from "../appwrite/configer"
import { Container, PostCard } from '../components'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const Home = () => {
    const [posts, setPosts] = useState([])
    const authStatus = useSelector(state => state.auth.status)

    useEffect(() => {
        if (authStatus) {
            appwriteService.getPosts().then((posts) => {
                if (posts) {
                    setPosts(posts.documents)
                }
            })
        }
    }, [authStatus])

    if (posts.length === 0) {
        return (
            <div className="w-full py-16 mt-8 text-center">
                <Container>
                    <div className="flex flex-wrap justify-center">
                        <div className="p-8 w-full max-w-md">
                            <div className="bg-gray-800 rounded-2xl p-8 shadow-2xl border border-gray-700">
                                <div className="mb-6">
                                    <svg className="w-16 h-16 mx-auto text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                                    </svg>
                                </div>
                                <h1 className="text-2xl font-bold text-white mb-4">
                                    Welcome to MegaBlog
                                </h1>
                                <p className="text-gray-400 mb-6">
                                    Login to read and create amazing posts
                                </p>
                                <Link 
                                    to="/login" 
                                    className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200"
                                >
                                    Get Started
                                </Link>
                            </div>
                        </div>
                    </div>
                </Container>
            </div>
        )
    }

    return (
        <div className='w-full py-8'>
            <Container>
                <div className='mb-8'>
                    <h1 className="text-3xl font-bold text-white mb-2">Latest Posts</h1>
                    <p className="text-gray-400">Discover amazing stories and insights</p>
                </div>
                <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'>
                    {posts.map((post) => (
                        <div key={post.$id} className='w-full'>
                            <PostCard {...post} />
                        </div>
                    ))}
                </div>
            </Container>
        </div>
    )
}

export default Home