"use client"

import React from 'react';
import RoboticArmCarousel from './robotic-arm-carousel';

interface ModelComparisonProps {
  renderedImages: string[];
  actualImages: string[];
  title?: string;
  description?: string;
  leftLabel?: string;
  rightLabel?: string;
}

export const ModelComparison: React.FC<ModelComparisonProps> = ({
  renderedImages,
  actualImages,
  title,
  description,
  leftLabel = "Rendered Model",
  rightLabel = "ANSYS"
}) => {
  return (
    <div className="space-y-6">
      {title && (
        <div className="text-center">
          <h3 className="text-xl font-bold text-gray-800 mb-2">{title}</h3>
          {description && (
            <p className="text-sm text-gray-600 mb-4">{description}</p>
          )}
        </div>
      )}
      
      {/* Side-by-side comparison layout */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 lg:gap-8">
        {/* Left Section */}
        <div className="space-y-3">
          <div className="text-center">
            <h4 className="text-lg font-semibold text-gray-800 mb-3">
              {leftLabel}
            </h4>
          </div>
          <div className="rounded-lg bg-white shadow-lg overflow-hidden border border-gray-200">
            <div className="w-full h-[320px] bg-gray-50 flex items-center justify-center p-2">
              <RoboticArmCarousel images={renderedImages} height="300px" />
            </div>
          </div>
        </div>
        
        {/* Right Section */}
        <div className="space-y-3">
          <div className="text-center">
            <h4 className="text-lg font-semibold text-gray-800 mb-3">
              {rightLabel}
            </h4>
          </div>
          <div className="rounded-lg bg-white shadow-lg overflow-hidden border border-gray-200">
            <div className="w-full h-[320px] bg-gray-50 flex items-center justify-center p-2">
              <RoboticArmCarousel images={actualImages} height="300px" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModelComparison;
