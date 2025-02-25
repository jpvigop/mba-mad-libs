"use client";

export default function IntensitySlider({ intensity, onChange }) {
  return (
    <div className="mb-6">
      <div className="flex justify-between items-center mb-2">
        <label htmlFor="intensity" className="text-lg font-semibold text-gray-800">
          Jargon Intensity
        </label>
        <span className="text-lg font-medium text-blue-600">{intensity}</span>
      </div>
      
      <input
        id="intensity"
        type="range"
        min="1"
        max="10"
        value={intensity}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
      />
      
      <div className="flex justify-between text-xs text-gray-600 px-1 mt-2">
        <span>Basic</span>
        <span>Absurd</span>
      </div>
    </div>
  );
} 