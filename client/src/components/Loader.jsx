import React from "react";

const Loader = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center">
      <div className="grid gap-3 place-items-center">
        <div className="flex items-center justify-center">
          <svg
            className="animate-spin border-indigo-600"
            xmlns="http://www.w3.org/2000/svg"
            width="34"
            height="34"
            viewBox="0 0 34 34"
            fill="none"
          >
            <g id="Component 2">
              <circle
                id="Ellipse 717"
                cx="17.0007"
                cy="17.0001"
                r="14.2013"
                stroke="#D1D5DB"
                stroke-width="4"
                stroke-dasharray="2 3"
              />
              <path
                id="Ellipse 715"
                d="M21.3573 30.5163C24.6694 29.4486 27.4741 27.2019 29.2391 24.2028C31.0041 21.2038 31.6065 17.661 30.9319 14.2471C30.2573 10.8332 28.3528 7.78584 25.5798 5.68345C22.8067 3.58105 19.3583 2.57 15.8891 2.84222"
                stroke="#4F46E5"
                stroke-width="4"
              />
            </g>
          </svg>
        </div>
      </div>
    </div>
  );
};

export default Loader;
