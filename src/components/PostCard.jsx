import React from 'react'
import appwriteService from '../appwrite/configer'
import { Link } from 'react-router-dom'

const PostCard = ({$id, title, featuredImage}) => {
  return (
    <Link to={`/post/${$id}`}>
      <div className='w-full bg-gray-800 rounded-xl p-4 shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-700 hover:border-gray-600 group'>
        <div className='w-full mb-4 overflow-hidden rounded-lg'>
          <img 
            src={appwriteService.getFilePreview(featuredImage)} 
            alt={title}
            className='w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300'
          />
        </div>
        <h2 className='text-xl font-bold text-white group-hover:text-blue-400 transition-colors duration-200 line-clamp-2'>
          {title}
        </h2>
      </div>
    </Link>
  )
}

export default PostCard