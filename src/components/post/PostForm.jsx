import React, { useCallback } from 'react'
import { useForm } from 'react-hook-form'
import { Button, Input, Select, RTE } from '../index'
import appwriteService from '../../appwrite/configer'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

const PostForm = ({ post }) => {
    const { register, handleSubmit, watch, setValue, getValues, control } = useForm({
        defaultValues: {
            title: post?.title || "",
            content: post?.content || "",
            status: post?.status || "active",
            slug: post?.slug || "",
        }
    })

    const navigate = useNavigate()
    const userData = useSelector(state => state.user.userData)

    const submit = async (data) => {
        if (post) {
            const file = data.image[0] ? await appwriteService.uploadFile(data.image[0]) : null;

            if (file) {
                appwriteService.deleteFile(post.featuredImage);
            }

            const dbPost = await appwriteService.updatePost(post.$id, {
                ...data,
                featuredImage: file ? file.$id : undefined
            });
            if (dbPost) {
                navigate(`/post/${dbPost.$id}`)
            }
        } else {
            const file = await appwriteService.uploadFile(data.image[0])

            if (file) {
                const field = file.$id
                data.featuredImage = field
                const dbPost = await appwriteService.createPost({
                    ...data,
                    userId: userData.$id
                })
                if (dbPost) {
                    navigate(`/post/${dbPost.$id}`)
                }
            }
        }
    }

    const slugTransform = useCallback((value) => {
        if (value && typeof value === "string") return value
            .trim()
            .toLowerCase()
            .replace(/[^a-zA-Z\d\s]/g, '')
            .replace(/\s+/g, '-')

        return ''
    }, [])

    React.useEffect(() => {
        const subscription = watch((value, { name }) => {
            if (name === 'title') {
                setValue('slug', slugTransform(value.title, { shouldValidate: true }))
            }
        })
        return () => {
            subscription.unsubscribe();
        }
    }, [watch, slugTransform, setValue])

    return (
        <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold text-white mb-8">
                {post ? "Edit Post" : "Create New Post"}
            </h1>
            <form onSubmit={handleSubmit(submit)} className="bg-gray-800 rounded-2xl p-8 shadow-2xl border border-gray-700">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2 space-y-6">
                        <Input
                            label="Title"
                            placeholder="Enter post title"
                            className="bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-blue-500"
                            {...register("title", { required: "Title is required" })}
                        />
                        <Input
                            label="Slug"
                            placeholder="post-slug"
                            className="bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-blue-500"
                            {...register("slug", { required: "Slug is required" })}
                            onInput={(e) => {
                                setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true });
                            }}
                        />
                        <RTE 
                            label="Content" 
                            name="content" 
                            control={control} 
                            defaultValue={getValues("content")} 
                        />
                    </div>
                    <div className="space-y-6">
                        <Input
                            label="Featured Image"
                            type="file"
                            className="bg-gray-700 border-gray-600 text-white file:bg-blue-600 file:text-white file:border-none file:rounded file:px-3 file:py-1 file:mr-3"
                            accept="image/png, image/jpg, image/jpeg, image/gif"
                            {...register("image", { required: !post })}
                        />
                        {post && (
                            <div className="w-full">
                                <img
                                    src={appwriteService.getFilePreview(post.featuredImage)}
                                    alt={post.title}
                                    className="rounded-lg w-full h-48 object-cover"
                                />
                            </div>
                        )}
                        <Select
                            options={["active", "inactive"]}
                            label="Status"
                            className="bg-gray-700 border-gray-600 text-white"
                            {...register("status", { required: "Status is required" })}
                        />
                        <Button 
                            type="submit" 
                            className={`w-full ${post ? "bg-green-600 hover:bg-green-700" : "bg-blue-600 hover:bg-blue-700"} text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-200 shadow-lg`}
                        >
                            {post ? "Update Post" : "Create Post"}
                        </Button>
                    </div>
                </div>
            </form>
        </div>
    )

}
export default PostForm