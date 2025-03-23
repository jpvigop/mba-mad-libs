"use client";

export default function IntensitySlider({ intensity, onChange }) {
  return (
    <div className="mb-6">
      <div className="flex justify-between items-center mb-2">
        <label htmlFor="intensity" className="text-lg font-medium text-[#1a1a1a]">
          Jargon Intensity
        </label>
        <span className="text-lg font-semibold text-[#0066ff]">{intensity}</span>
      </div>
      
      <input
        id="intensity"
        type="range"
        min="1"
        max="10"
        value={intensity}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#0066ff]"
        style={{
          background: `linear-gradient(to right, #0066ff ${(intensity - 1) * 11.1}%, #e5e7eb ${(intensity - 1) * 11.1}%)`,
        }}
      />
      
      <div className="flex justify-between text-sm text-[#999999] px-1 mt-2">
        <span>Basic</span>
        <span>Absurd</span>
      </div>
    </div>
  );
}