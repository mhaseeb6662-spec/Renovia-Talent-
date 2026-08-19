import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Clock, User, Calendar } from 'lucide-react';
import PageHero from '../components/common/PageHero';
import Container from '../components/common/Container';
import Button from '../components/common/Button';
import { blogData, categories } from '../data/blogData';

export const BlogPage = () => {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState('All');

  // Filter posts based on category
  const filteredPosts = activeCategory === 'All' 
    ? blogData 
    : blogData.filter(post => post.category === activeCategory);

  // Extract the first post as the featured post (only when showing 'All')
  const featuredPost = activeCategory === 'All' && blogData.length > 0 ? blogData[0] : null;
  const gridPosts = activeCategory === 'All' ? filteredPosts.slice(1) : filteredPosts;

  return (
    <main className="min-h-screen pb-20 bg-[#05070D]">
      <PageHero
        badge="Insights & News"
        title="Our Latest Thinking"
        subtitle="Explore our perspectives on software development, artificial intelligence, tech recruitment, and the future of work."
        breadcrumb="Blog"
      />

      {/* Categories Filter */}
      <section className="py-8 border-b border-slate-800/80 sticky top-16 sm:top-20 z-40 bg-[#05070D]/90 backdrop-blur-md">
        <Container>
          <div className="flex overflow-x-auto pb-2 scrollbar-hide gap-2 -mx-4 px-4 sm:mx-0 sm:px-0">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                  activeCategory === category
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/20'
                    : 'bg-[#101621] text-slate-400 hover:text-white hover:bg-slate-800'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </Container>
      </section>

      {/* Featured Post (Only visible when viewing 'All') */}
      {featuredPost && (
        <section className="py-16">
          <Container>
            <div 
              onClick={() => navigate(`/blog/${featuredPost.slug}`)}
              className="group relative rounded-3xl overflow-hidden bg-slate-900 border border-slate-800/80 cursor-pointer grid grid-cols-1 lg:grid-cols-2"
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
                    {featuredPost.readTime}
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
                    <span className="text-sm font-semibold text-white">{featuredPost.author}</span>
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
      <section className="py-12">
        <Container>
          {gridPosts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {gridPosts.map((post) => (
                <div 
                  key={post.id}
                  onClick={() => navigate(`/blog/${post.slug}`)}
                  className="group flex flex-col rounded-2xl bg-[#0B101A] border border-slate-800/80 overflow-hidden cursor-pointer hover:border-blue-500/30 transition-all duration-300"
                >
                  <div className="relative h-48 overflow-hidden">
                    <img 
                      src={post.image} 
                      alt={post.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="px-2.5 py-1 rounded-md bg-black/60 backdrop-blur-md text-white text-xs font-bold uppercase tracking-wider">
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
              <h3 className="text-2xl font-bold text-white mb-2">No articles found</h3>
              <p className="text-slate-400">There are currently no articles in the '{activeCategory}' category.</p>
              <Button onClick={() => setActiveCategory('All')} variant="secondary" className="mt-6">
                View All Articles
              </Button>
            </div>
          )}
        </Container>
      </section>
    </main>
  );
};

export default BlogPage;
