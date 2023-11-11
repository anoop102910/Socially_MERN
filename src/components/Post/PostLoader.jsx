import React from "react";

export const PostLoader = ({ height, width, className }) => {
  return (
    <>
      <div className="bg-white dark:bg-dark-300 p-4 rounded-md shadow-md  mb-4">
        <div className="flex justify-between">
          <div className="flex items-center">
            <div className="w-12 h-12 loader rounded-full shadow-md dark:bg-dark-600"></div>
            <div className="flex flex-col ml-3 justify-between gap-y-1">
              <div className="w-24 h-4 loader dark:bg-dark-700"></div>
              <div className="w-20 h-2 loader mt-1 dark:bg-dark-700"></div>
            </div>
          </div>
          <div id="postcard-dropdown-menu" className="relative">
            <div className="w-6 h-6 loader text-gray-600 text-center rounded-full dark:bg-dark-600 dark:text-white"></div>
            <div className="gap-x-3 py-1 px-3 loader rounded-md items-start gap-y-2 text-gray-900 flex-col absolute top-5 -left-1 hidden dark:text-white">
              <div className="gap-x-3 flex items-center">
                <div className="w-6 h-6 loader text-gray-600 text-center rounded-full dark:bg-dark-600 dark:text-white">
                  <i className="fas fa-trash"></i>
                </div>
                <div className="w-20 h-6 loader text-gray-900 text-center dark:text-white">Delete</div>
              </div>
              <div className="gap-x-3 flex items-center">
                <div className="w-6 h-6 loader text-gray-600 text-center rounded-full dark:bg-dark-600 dark:text-white">
                  <i className="fas fa-edit"></i>
                </div>
                <div className="w-20 h-6 loader text-gray-900 text-center dark:text-white">Edit</div>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-8 text-gray-700 dark:text-white text-0.89rem">
          <div className="loader"></div>
          <div className="w-full h-48 loader rounded-lg mt-4 dark:bg-dark-700"></div>
          <div className="mt-4 flex justify-between items-center">
            <div className="flex gap-x-6">
              <div>
                <div className="w-6 h-6 loader text-red-500 text-center rounded-full dark:bg-red-500"></div>
              </div>
              <div>
                <div className="w-6 h-6 loader text-gray-700 text-center rounded-full dark:text-white"></div>
              </div>
            </div>
            <div>
              <div className="w-6 h-6 loader text-gray-700 text-center rounded-full dark:text-white"></div>
              <span className="text-gray-700 ml-2 dark:text-white"></span>
            </div>
          </div>
          <div className="flex gap-x-3 mt-4 items-center">
            <div className="w-12 h-12 loader rounded-full shadow-md dark:bg-dark-600"></div>
            <div className="w-full h-8 loader dark:bg-dark-700 dark:text-white rounded-3xl outline-none"></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PostLoader;
