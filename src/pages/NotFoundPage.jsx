import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Home, Sparkles } from 'lucide-react';
import Container from '../components/common/Container';
import Button from '../components/common/Button';

export const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <main className="min-h-[85vh] pt-36 pb-20 flex items-center justify-center bg-[#05070D]">
      <Container className="text-center space-y-6 max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#101621] border border-blue-500/40 text-blue-300 text-label font-semibold shadow-lg">
          <Sparkles className="w-4 h-4 text-blue-400" />
          <span>Error 404</span>
        </div>

        <h1 className="text-[clamp(60px,8vw,120px)] font-extrabold blue-gradient-text leading-none tracking-tight">
          404
        </h1>

        <div className="space-y-3">
          <h2 className="text-h2 font-bold text-white">Page Not Found</h2>
          <p className="text-body-lg text-slate-300 font-normal leading-relaxed max-w-md mx-auto">
            The page you are looking for does not exist or has been moved.
          </p>
        </div>

        <div className="pt-4 flex justify-center">
          <Button
            variant="primary"
            size="lg"
            onClick={() => navigate('/')}
            icon={Home}
            iconPosition="left"
            className="w-auto"
          >
            Back to Home
          </Button>
        </div>
      </Container>
    </main>
  );
};

export default NotFoundPage;
