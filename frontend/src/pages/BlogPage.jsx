import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Clock, Calendar, Search, AlertCircle, RefreshCw } from 'lucide-react';
import PageHero from '../components/common/PageHero';
import Container from '../components/common/Container';
import Button from '../components/common/Button';
import VideoBackground from '../components/common/VideoBackground';
import { categories } from '../data/blogData';
import { getBlogs } from '../services/api';

export const BlogPage = () => {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchArticles = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getBlogs(activeCategory, searchTerm);
      setPosts(data);
    } catch (err) {
      console.error('Error fetching blogs from API:', err);
      setError(err.message || 'Unable to connect to articles database. Please ensure backend server is running.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchArticles();
  }, [activeCategory, searchTerm]);

  // Extract the first post as the featured post (only when showing 'All' and no search)
  const featuredPost = activeCategory === 'All' && !searchTerm && posts.length > 0 ? posts[0] : null;
  const gridPosts = featuredPost ? posts.slice(1) : posts;

  return (
    <main className="min-h-screen pb-20 bg-[#05070D]">
      <VideoBackground 
        videoSrc="https://cdn.coverr.co/videos/coverr-data-stream-background-5606/1080p.mp4"
        posterSrc="https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=2000"
      >
        <PageHero
          badge="Insights & News"
          title="Our Latest Thinking"
          subtitle="Explore strategic perspectives on software architecture, artificial intelligence, technical recruiting, and digital transformation."
          breadcrumb="Blog"
          transparent={true}
        />
      </VideoBackground>

      {/* Categories & Search Bar */}
      <section className="py-8 border-b border-slate-800/80 sticky top-16 sm:top-20 z-40 bg-[#05070D]/90 backdrop-blur-md">
        <Container>
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="flex overflow-x-auto pb-2 md:pb-0 scrollbar-hide gap-2 w-full md:w-auto -mx-4 px-4 sm:mx-0 sm:px-0">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`px-4 py-2 rounded-full text-xs sm:text-sm font-semibold whitespace-nowrap transition-all ${
                    activeCategory === category
                      ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/20'
                      : 'bg-[#101621] text-slate-400 hover:text-white hover:bg-slate-800 border border-slate-800'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>

            <div className="relative w-full md:w-64 shrink-0">
              <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search articles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-3.5 py-1.5 rounded-xl bg-[#101621] border border-slate-800 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </Container>
      </section>

      {/* Error Alert State */}
      {error && (
        <section className="py-8">
          <Container>
            <div className="p-5 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-300 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <AlertCircle className="w-5 h-5 shrink-0 text-rose-400" />
                <div>
                  <p className="text-sm font-bold text-white">Database Synchronization Error</p>
                  <p className="text-xs text-rose-300">{error}</p>
                </div>
              </div>
              <button
                onClick={fetchArticles}
                className="px-3.5 py-1.5 rounded-xl bg-rose-500/20 hover:bg-rose-500/30 text-rose-200 text-xs font-semibold flex items-center gap-1.5 transition-colors shrink-0"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                Retry Connection
              </button>
            </div>
          </Container>
        </section>
      )}

      {/* Loading State */}
      {loading && (
        <section className="py-24">
          <Container>
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="w-10 h-10 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
              <p className="text-sm text-slate-400">Loading published insights from MongoDB...</p>
            </div>
          </Container>
        </section>
      )}

      {/* Featured Post (Only visible when viewing 'All' with no active search) */}
      {!loading && !error && featuredPost && (
        <section className="py-16">
          <Container>
            <div 
              onClick={() => navigate(`/blog/${featuredPost.slug}`)}
              className="group relative rounded-3xl overflow-hidden bg-slate-900 border border-slate-800/80 cursor-pointer grid grid-cols-1 lg:grid-cols-2 shadow-2xl shadow-black/50"
            >
              <div className="relative h-64 lg:h-auto overflow-hidden">
                <img 
                  src={featuredPost.image} 
                  alt={featuredPost.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <div className="p-8 sm:p-12 flex flex-col justify-center bg-[#0B101A]">
                <div className="flex items-center gap-3 mb-4">
                  <span className="px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 text-xs font-bold uppercase tracking-wider">
                    {featuredPost.category}
                  </span>
                  <span className="text-slate-500 text-sm flex items-center gap-1.5">
                    <Clock className="w-4 h-4" />
                    {featuredPost.readTime || '5 min read'}
                  </span>
                </div>
                <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4 group-hover:text-blue-300 transition-colors">
                  {featuredPost.title}
                </h2>
                <p className="text-slate-400 text-lg mb-8 line-clamp-3">
                  {featuredPost.excerpt}
                </p>
                <div className="flex items-center justify-between mt-auto pt-6 border-t border-slate-800/80">
                  <div className="flex flex-col">
                    <span className="text-sm font-semibold text-white">
                      {typeof featuredPost.author === 'object' ? featuredPost.author.name : featuredPost.author || 'Renovia Talent'}
                    </span>
                    <span className="text-xs text-slate-500">{featuredPost.date}</span>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center group-hover:bg-blue-600 transition-colors">
                    <ArrowRight className="w-5 h-5 text-white" />
                  </div>
                </div>
              </div>
            </div>
          </Container>
        </section>
      )}

      {/* Blog Grid */}
      {!loading && !error && (
        <section className="py-12">
          <Container>
            {gridPosts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {gridPosts.map((post) => (
                  <div 
                    key={post._id || post.id || post.slug}
                    onClick={() => navigate(`/blog/${post.slug}`)}
                    className="group flex flex-col rounded-2xl bg-[#0B101A] border border-slate-800/80 overflow-hidden cursor-pointer hover:border-blue-500/30 transition-all duration-300 shadow-lg shadow-black/40"
                  >
                    <div className="relative h-48 overflow-hidden">
                      <img 
                        src={post.image} 
                        alt={post.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute top-4 left-4">
                        <span className="px-2.5 py-1 rounded-md bg-black/70 backdrop-blur-md text-white text-xs font-bold uppercase tracking-wider">
                          {post.category}
                        </span>
                      </div>
                    </div>
                    <div className="p-6 flex flex-col flex-1">
                      <h3 className="text-xl font-bold text-white mb-3 group-hover:text-blue-300 transition-colors line-clamp-2">
                        {post.title}
                      </h3>
                      <p className="text-slate-400 text-sm mb-6 line-clamp-3 flex-1">
                        {post.excerpt}
                      </p>
                      <div className="flex items-center justify-between pt-4 border-t border-slate-800/80">
                        <div className="flex items-center gap-1.5 text-xs text-slate-500">
                          <Calendar className="w-3.5 h-3.5" />
                          {post.date}
                        </div>
                        <div className="flex items-center gap-1 text-sm font-semibold text-blue-400 group-hover:text-blue-300">
                          Read <ArrowRight className="w-4 h-4" />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="py-20 text-center">
                <h3 className="text-2xl font-bold text-white mb-2">No published articles found</h3>
                <p className="text-slate-400 text-sm">
                  {searchTerm ? 'No articles matched your search term.' : 'There are currently no articles published in this category.'}
                </p>
                <Button onClick={() => { setActiveCategory('All'); setSearchTerm(''); }} variant="secondary" className="mt-6">
                  Reset Filters
                </Button>
              </div>
            )}
          </Container>
        </section>
      )}
    </main>
  );
};

export default BlogPage;
