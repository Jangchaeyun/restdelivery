import React from 'react'
import Delivery from "../img/delivery.png";

const MainContainer = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
      <div className="py-2 flex-1 flex flex-col items-start justify-start gap-6">
        <div className="flex items-center gap-2 justify-center bg-orange-100 px-4 py-1 rounded-full">
          <p className="text-base text-orange-500 font-semibold">신속한 배달</p>
          <div className="w-8 h-8 bg-white rounded-full overflow-hidden drop-shadow-xl">
            <img 
              src={Delivery} 
              className="w-full h-full object-contain" 
              alt="delivery" 
            />
          </div>
        </div>
        <p className="text-[2.5rem] lg:text-[4.25rem] font-bold tracking-wide text-headingColor">
         신속 정확한 배달로 고객들에게 {" "}<span className="text-orange-600 text-[3rem] lg:text-[5rem]">즐거움</span>을 드리겠습니다
        </p>

        <p className="text-base text-textColor text-center md:text-left md:w-[80%]">
          저희는 고객 여러분에게 오래 기다릴 필요 없이 바로 만든 음식을 드실 수 있게 신속하고 정확한 배달로 즐거움을 드리겠습니다.
        </p>
        <button 
          type="button" 
          className="bg-gradient-to-br from-orange-400 to-orange-500 w-full md:w-auto px-4 py-2 rounded-lg hover:shadow-lg transition-all ease-in-out duration-100"
        >
          지금 주문
        </button>
      </div>
      <div className="py-2 bg-blue-400 flex-1">

      </div>
    </div>
  );
};

export default MainContainer
