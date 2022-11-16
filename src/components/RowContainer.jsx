import React from 'react'
import { MdShoppingBasket } from 'react-icons/md';
import { motion } from 'framer-motion';

const RowContainer = ({flag}) => {
  return (
    <div 
        className={`w-full my-12 ${
            flag ? "overflow-x-scroll" : "overflow-x-hidden"
        }`}
    >
        <div className="w-300 md:w-340 h-auto bg-cardOverlay rounded-lg p-2 my-12 backdrop-blur-lg hover:drop-shadow-lg">
            <div className="w-full flex items-center justify-between">
                <motion.img 
                    whileTap={{ scale : 1.2 }}
                    src="https://firebasestorage.googleapis.com/v0/b/resturantapp-2780e.appspot.com/o/images%2F1668518978134-f3.png?alt=media&token=6dbf05c2-6e2e-454c-b070-05a0b672dd0a" 
                    alt="" 
                    className="w-40 -mt-8 drop-shadow-2xl"
                />
                <motion.div 
                    whileTap={{ scale : 0.75 }} 
                    className="w-8 h-8 rounded-full bg-red-600 flex items-center justify-center cursor-pointer hover:shadow-md"
                >
                    <MdShoppingBasket className="text-white"/>
                </motion.div>
            </div>
            <div className="w-full flex flex-col gap-4 items-end justify-end">
                <p className="text-textColor font-semibold text-base md:text-lg">
                    김치찌게
                </p>
                <p className="mt-1 text-sm text-gray-500">60.76 칼로리</p>
                <div className="flex items-center gap-8">
                    <p className="text-lg text-heaingColor font-semibold">
                        8500
                        <span className="text-sm text-red-500">원</span>
                    </p>
                </div>
            </div>
        </div>
    </div>
  );
};

export default RowContainer
