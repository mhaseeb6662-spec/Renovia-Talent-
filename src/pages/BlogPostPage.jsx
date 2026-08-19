import React, { useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Clock, Calendar, User, Share2 } from 'lucide-react';
import Container from '../components/common/Container';
import Button from '../components/common/Button';
import { blogData } from '../data/blogData';

export const BlogPostPage = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  
  const post = blogData.find(p => p.slug === slug);
  const relatedPosts = blogData
    .filter(p => p.slug !== slug && (p.category === post?.category))
    .slice(0, 2); // get up to 2 related posts

  useEffect(() => {
    if (post) {
      document.title = `${post.title} | Renovia Talent Blog`;
    }
  }, [post]);

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
              <User className="w-4 h-4 text-slate-500" />
              {post.author}
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-slate-500" />
              {post.date}
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-slate-500" />
              {post.readTime}
            </div>
          </div>
        </header>

        {/* Cover Image */}
        <div className="w-full h-[400px] sm:h-[500px] rounded-3xl overflow-hidden mb-12 border border-slate-800/80">
          <img 
            src={post.image} 
            alt={post.title} 
            className="w-full h-full object-cover"
          />
        </div>

        {/* Article Content */}
        <article 
          className="prose prose-invert prose-blue max-w-none mb-16 text-slate-300 leading-relaxed text-lg"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        {/* Share Section */}
        <div className="flex items-center justify-between py-6 border-t border-slate-800/80 mb-16">
          <span className="font-semibold text-white">Share this article:</span>
          <div className="flex items-center gap-4">
            <button className="p-2 rounded-full bg-slate-800 hover:bg-blue-600 transition-colors text-white">
              <Share2 className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <section className="pt-12 border-t border-slate-800/80">
            <h3 className="text-2xl font-bold text-white mb-8">Related Articles</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              {relatedPosts.map((relatedPost) => (
                <div 
                  key={relatedPost.id}
                  onClick={() => navigate(`/blog/${relatedPost.slug}`)}
                  className="group cursor-pointer"
                >
                  <div className="relative h-48 rounded-xl overflow-hidden mb-4 border border-slate-800">
                    <img 
                      src={relatedPost.image} 
                      alt={relatedPost.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <h4 className="text-lg font-bold text-white group-hover:text-blue-400 transition-colors mb-2">
                    {relatedPost.title}
                  </h4>
                  <p className="text-sm text-slate-400 line-clamp-2">
                    {relatedPost.excerpt}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}
      </Container>
    </main>
  );
};

export default BlogPostPage;
