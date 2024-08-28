import { useState, useEffect } from "react";
import tipsArray from "../Data/TipsData.js";
import { FaLongArrowAltRight } from "react-icons/fa";

const savingsUrl =
  "https://static.vecteezy.com/system/resources/previews/007/978/851/original/hand-putting-coin-into-piggy-bank-saving-money-concept-art-vector.jpg";

const SavingTips = () => {
  const [tip, setTip] = useState("");

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * tipsArray.length);
    setTip(tipsArray[randomIndex]);
  }, []);

  return (
    <>
       <article className="rounded-s bg-white p-4 ring ring-indigo-50 sm:p-6 lg:p-8 w-30 max-w-screen-xl mx-auto">
        <div className="flex items-start sm:gap-8">
          <div
            className="hidden sm:grid sm:w-32 sm:h-32 sm:shrink-0 sm:place-content-center sm:rounded-full sm:border-2 sm:border-green-500"
            aria-hidden="true"
          >
            <div className="flex items-center gap-1">
              <img
                src={savingsUrl}
                alt="piggy_bank"
                className="w-full h-full object-cover rounded-full"
              />
            </div>
          </div>

          <div>
            <strong className="rounded border border-green-300 bg-green-300 px-3 py-1.5 text-[12px] font-medium text-grey-500">
              Tip number # {tip.length}
            </strong>

            <h3 className="mt-4 text-lg font-medium sm:text-xl">
              <p> Saving Tip Of The Day</p>
            </h3>

            <p className="mt-1 text-sm text-gray-700 w-74">{tip}</p>

            <div className="mt-4 sm:flex sm:items-center sm:gap-2">
              <div className="flex items-center gap-1 text-gray-500">
                <FaLongArrowAltRight />

                <a href="https://www.nerdwallet.com/article/finance/how-to-save-money"target="blank" className="text-xs font-medium underline hover:text-gray-700">
                  Find out more here
                </a>
               
              </div>
            </div>
          </div>
        </div>
      </article>
    </>
  );
};

export default SavingTips;
