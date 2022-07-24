import React, { useEffect, useRef } from "react";
import { MdShoppingBasket } from "react-icons/md";
import { motion } from "framer-motion";
import NotFound from "../img/NotFound.svg";
import { useStateValue } from "../context/StateProvider";
import { actionType } from "../context/reducer";

const RowContainer = ({ horizontalScrollFlag, data, scrollValue }) => {
  const rowContainer = useRef();

  const [{ cartItems }, dispatch] = useStateValue();

  useEffect(() => {
    rowContainer.current.scrollLeft += scrollValue;
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [scrollValue, cartItems]);

  const addToCart = (item) => {
    dispatch({
      type: actionType.SET_CART_ITEMS,
      cartItems: [...cartItems, item],
    });
  };

  return (
    <div
      ref={rowContainer}
      className={`w-full flex items-center gap-3 my-12 scroll-smooth ${
        horizontalScrollFlag
          ? "overflow-x-scroll scrollbar-none"
          : "overflow-x-hidden flex-wrap justify-center"
      }`}
    >
      {data && data.length > 0 ? (
        data.map((item) => (
          <div
            key={item?.id}
            className="w-250 h-[225px] min-w-[250px] md:w-320 md:min-w-[320px] bg-cardOverlay rounded-lg p-2 my-12  backdrop-blur-lg hover:drop-shadow-lg flex flex-col items-center justify-between"
          >
            <div className="w-full flex items-center justify-between">
              <motion.div
                whileHover={{ scale: 1.2 }}
                className="w-40 h-40 -mt-8 drop-shadow-2xl"
              >
                <img
                  src={item?.imageURL}
                  alt={item?.title}
                  className="w-full h-full object-contain"
                />
              </motion.div>

              <motion.div
                whileTap={{ scale: 0.75 }}
                className="w-8 h-8 rounded-full bg-red-600 flex items-center justify-center cursor-pointer hover:shadow-md"
                onClick={() => addToCart(item)}
              >
                <MdShoppingBasket className="text-white" />
              </motion.div>
            </div>
            <div className="w-full flex flex-col items-end justify-end">
              <p className="text-textColor font-semibold text-base md:text-lg">
                {item?.title}
              </p>
              <p className="mt-1 text-sm text-gray-500">
                {item?.calories} calories
              </p>
              <div className="flex items-center gap-8">
                <p className="text-lg text-headingColor font-semibold">
                  <span className="text-sm text-red-500">$</span> {item?.price}
                </p>
              </div>
            </div>
          </div>
        ))
      ) : (
        <div className="w-full flex flex-col items-center justify-center">
          <img src={NotFound} alt="not found" className="h-340" />
          <p className="text-xl text-headingColor font-semibold my-6">
            Items Not Available
          </p>
        </div>
      )}
    </div>
  );
};

export default RowContainer;
