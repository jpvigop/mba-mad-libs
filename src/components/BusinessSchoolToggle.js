"use client";

export default function BusinessSchoolToggle({ enabled, onChange }) {
  return (
    <div className="flex items-center justify-between w-full mb-6">
      <label htmlFor="business-school-toggle" className="text-lg font-semibold text-gray-800">
        Business School Mode
      </label>
      
      <div className="relative inline-block w-12 h-6 mr-2">
        <input
          id="business-school-toggle"
          type="checkbox"
          className="hidden"
          checked={enabled}
          onChange={() => onChange(!enabled)}
        />
        <label
          htmlFor="business-school-toggle"
          className={`block overflow-hidden h-6 rounded-full ${
            enabled ? 'bg-blue-600' : 'bg-gray-300'
          } cursor-pointer transition-colors duration-200 ease-in-out`}
        >
          <span
            className={`block h-6 w-6 rounded-full bg-white shadow transform transition-transform duration-200 ease-in-out ${
              enabled ? 'translate-x-6' : 'translate-x-0'
            }`}
          />
        </label>
      </div>
      
      {enabled && (
        <div className="absolute right-0 mt-12 bg-blue-100 text-blue-800 text-xs font-medium py-1 px-2 rounded-lg">
          Using HBS case studies & frameworks
        </div>
      )}
    </div>
  );
} 