import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import appwriteService from "../appwrite/configer";
import { Button, Container } from "../components";
import parse from "html-react-parser";
import { useSelector } from "react-redux";

export default function Post() {
    const [post, setPost] = useState(null);
    const { slug } = useParams();
    const navigate = useNavigate();

    const userData = useSelector((state) => state.auth.userData);

    const isAuthor = post && userData ? post.userId === userData.$id : false;

    useEffect(() => {
        if (slug) {
            appwriteService.getPost(slug).then((post) => {
                if (post) setPost(post);
                else navigate("/");
            });
        } else navigate("/");
    }, [slug, navigate]);

    const deletePost = () => {
        appwriteService.deletePost(post.$id).then((status) => {
            if (status) {
                appwriteService.deleteFile(post.featuredImage);
                navigate("/");
            }
        });
    };

    return post ? (
        <div className="py-8">
            <Container>
                <div className="max-w-4xl mx-auto">
                    <div className="w-full mb-8 relative bg-gray-800 rounded-2xl p-6 shadow-2xl border border-gray-700 overflow-hidden">
                        <img
                            src={appwriteService.getFilePreview(post.featuredImage)}
                            alt={post.title}
                            className="w-full h-64 md:h-96 object-cover rounded-xl"
                        />

                        {isAuthor && (
                            <div className="absolute top-4 right-4 flex space-x-2">
                                <Link to={`/edit-post/${post.$id}`}>
                                    <Button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium">
                                        Edit
                                    </Button>
                                </Link>
                                <Button 
                                    className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-medium"
                                    onClick={deletePost}
                                >
                                    Delete
                                </Button>
                            </div>
                        )}
                    </div>
                    <div className="bg-gray-800 rounded-2xl p-8 shadow-2xl border border-gray-700">
                        <h1 className="text-3xl font-bold text-white mb-6">{post.title}</h1>
                        <div className="prose prose-lg prose-invert max-w-none">
                            {parse(post.content)}
                        </div>
                    </div>
                </div>
            </Container>
        </div>
    ) : null;
}