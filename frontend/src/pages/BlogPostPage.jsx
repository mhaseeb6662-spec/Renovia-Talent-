import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Clock, Calendar, User, Share2, Tag } from 'lucide-react';
import Container from '../components/common/Container';
import Button from '../components/common/Button';
import { getBlogBySlug } from '../services/api';

export const BlogPostPage = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [relatedPosts, setRelatedPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      setLoading(true);
      try {
        const { blog, relatedPosts } = await getBlogBySlug(slug);
        setPost(blog);
        setRelatedPosts(relatedPosts || []);
      } catch (err) {
        console.error('Error fetching blog post:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchPost();
  }, [slug]);

  useEffect(() => {
    if (post) {
      document.title = `${post.title} | Renovia Talent Blog`;
    }
  }, [post]);

  if (loading) {
    return (
      <main className="min-h-screen pt-32 pb-20 bg-[#05070D] flex items-center justify-center">
        <div className="text-center space-y-3">
          <div className="w-10 h-10 border-2 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-slate-400 text-sm">Loading article...</p>
        </div>
      </main>
    );
  }

  if (!post) {
    return (
      <main className="min-h-screen pt-32 pb-20 bg-[#05070D] flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-white mb-4">Article Not Found</h1>
          <p className="text-slate-400 mb-8">The article you're looking for doesn't exist or has been removed.</p>
          <Button onClick={() => navigate('/blog')} variant="primary" icon={ArrowLeft}>
            Back to Blog
          </Button>
        </div>
      </main>
    );
  }

  const authorName = typeof post.author === 'object' ? post.author.name : post.author || 'Renovia Talent';

  return (
    <main className="min-h-screen pt-28 sm:pt-32 pb-20 bg-[#05070D]">
      <Container className="max-w-4xl mx-auto">
        {/* Back Link */}
        <Link 
          to="/blog" 
          className="inline-flex items-center gap-2 text-sm font-medium text-slate-400 hover:text-blue-400 transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to all articles
        </Link>

        {/* Article Header */}
        <header className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <span className="px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 text-xs font-bold uppercase tracking-wider">
              {post.category}
            </span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-bold text-white leading-tight mb-6">
            {post.title}
          </h1>
          
          <div className="flex flex-wrap items-center gap-6 text-sm text-slate-400 border-y border-slate-800/80 py-4">
            <div className="flex items-center gap-2">
              <User className="w-4 h-4 text-blue-400" />
              <span className="text-white font-medium">{authorName}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-blue-400" />
              <span>{post.date}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-blue-400" />
              <span>{post.readTime || '5 min read'}</span>
            </div>
          </div>
        </header>

        {/* Featured Image */}
        <div className="rounded-3xl overflow-hidden mb-12 border border-slate-800/80 shadow-2xl">
          <img 
            src={post.image} 
            alt={post.title}
            className="w-full h-auto max-h-[500px] object-cover"
          />
        </div>

        {/* Article Content */}
        <article className="prose prose-invert prose-lg max-w-none mb-16 text-slate-300">
          <div dangerouslySetInnerHTML={{ __html: post.content }} />
        </article>

        {/* Tags */}
        {post.tags && post.tags.length > 0 && (
          <div className="flex flex-wrap items-center gap-2 mb-16 pt-6 border-t border-slate-800/80">
            <Tag className="w-4 h-4 text-slate-500 mr-2" />
            {post.tags.map((tag, idx) => (
              <span key={idx} className="px-3 py-1 rounded-lg bg-[#080B14] border border-slate-800 text-xs text-slate-400 font-medium">
                #{tag}
              </span>
            ))}
          </div>
        )}

        {/* Related Posts Section */}
        {relatedPosts.length > 0 && (
          <div className="border-t border-slate-800/80 pt-16">
            <h3 className="text-2xl font-bold text-white mb-8">Related Articles</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {relatedPosts.map(rel => (
                <div 
                  key={rel._id || rel.id || rel.slug}
                  onClick={() => navigate(`/blog/${rel.slug}`)}
                  className="p-6 rounded-2xl bg-[#080B14] border border-slate-800/80 hover:border-blue-500/30 cursor-pointer transition-all duration-300"
                >
                  <span className="text-xs font-semibold text-blue-400 uppercase tracking-wider mb-2 block">
                    {rel.category}
                  </span>
                  <h4 className="text-lg font-bold text-white mb-2 line-clamp-2 hover:text-blue-300">
                    {rel.title}
                  </h4>
                  <p className="text-slate-400 text-sm line-clamp-2">
                    {rel.excerpt}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </Container>
    </main>
  );
};

export default BlogPostPage;
