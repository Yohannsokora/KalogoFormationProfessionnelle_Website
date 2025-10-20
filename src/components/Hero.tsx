interface HeroProps {
  title: string;
  subtitle?: string;
  backgroundImage?: string;
  showCTA?: boolean;
  onCTAClick?: () => void;
  ctaText?: string;
}

export function Hero({ 
  title, 
  subtitle, 
  backgroundImage, 
  showCTA = false, 
  onCTAClick,
  ctaText = "Apply Now"
}: HeroProps) {
  return (
    <div className="relative bg-blue-900 text-white overflow-hidden">
      {backgroundImage && (
        <div className="absolute inset-0">
          <img
            src={backgroundImage}
            alt="Hero background"
            className="w-full h-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-blue-800 bg-opacity-70"></div>
        </div>
      )}
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
        <div className="text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            {title}
          </h1>
          {subtitle && (
            <p className="text-xl md:text-2xl text-blue-100 mb-8 max-w-3xl mx-auto">
              {subtitle}
            </p>
          )}
          {showCTA && (
            <button
              onClick={onCTAClick}
              className="inline-flex items-center px-8 py-4 border border-transparent text-lg font-medium rounded-md text-blue-600 bg-white hover:bg-gray-50 transition-colors shadow-lg"
            >
              {ctaText}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}