export default function PersonCard({ person }) {
  return (
    <div className="bg-white rounded-[24px] shadow-sm border border-[#E5E5E4] p-6 hover:shadow-md transition-shadow w-full max-w-[280px] mx-auto sm:w-auto sm:mx-0 h-[267px] sm:h-[267px]">
      <div className="flex flex-col items-center h-full">
        <div className="relative mb-4 w-[133px] h-[133px] sm:w-[133px] sm:h-[133px] bg-[#947550] rounded-full sm:rounded-full">
          <img src={person.avatarImage} alt={person.name} className="rounded-full object-cover w-[133px] h-[133px] sm:w-[133px] sm:h-[133px]" />
          <img src={person.rightIcon} alt="Icon" className="absolute w-[48.36px] h-[48.36px] sm:w-[48.36px] sm:h-[48.36px] top-[82.82px] left-[82.82px] sm:top-[82.82px] sm:left-[82.82px]" />
        </div>
        <h3 className="font-medium text-center text-base sm:text-base" style={{ fontSize: '16px', color: '#3D3936', fontWeight: '500' }}>{person.name}</h3>
        <p className="text-center mt-1 text-sm sm:text-sm" style={{ fontSize: '14px', color: '#947550', fontWeight: '400' }}>{person.title}</p>
        <div className="flex items-center justify-center mt-auto space-x-2">
          {person.dotColors.map((color, index) => (
            <div key={index} className="w-2 h-2 rounded-full sm:w-2 sm:h-2" style={{ backgroundColor: color }}></div>
          ))}
        </div>
      </div>
    </div>
  );
}
