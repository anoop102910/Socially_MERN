import React from "react";

export const PostLoader = ({ height, width, className }) => {
  return (
    <>
      <div class="bg-white p-4 rounded-md shadow-md w-[550px] mb-4 ">
        <div class="flex justify-between">
          <div class="flex items-center">
            <div class="w-12 h-12 loader rounded-full shadow-md"></div>
            <div class="flex flex-col ml-3 justify-between gap-y-1">
              <div class="w-24 h-4 loader"></div>
              <div class="w-20 h-2 loader mt-1"></div>
            </div>
          </div>
          <div id="postcard-dropdown-menu" class="relative">
            <div class="w-6 h-6 loader text-gray-600 text-center rounded-full">
            </div>
            <div class="gap-x-3 py-1 px-3 loader rounded-md items-start gap-y-2 text-gray-900 flex-col absolute top-5 -left-1 hidden">
              <div class="gap-x-3 flex items-center">
                <div class="w-6 h-6 loader text-gray-600 text-center rounded-full">
                  <i class="fas fa-trash"></i>
                </div>
                <div class="w-20 h-6 loader text-gray-900 text-center">Delete</div>
              </div>
              <div class="gap-x-3 flex items-center">
                <div class="w-6 h-6 loader text-gray-600 text-center rounded-full">
                  <i class="fas fa-edit"></i>
                </div>
                <div class="w-20 h-6 loader text-gray-900 text-center">Edit</div>
              </div>
            </div>
          </div>
        </div>
        <div class="mt-8 text-gray-700 text-0.89rem">
          <div class="loader"></div>
          <div class="w-full h-48 loader rounded-lg mt-4"></div>
          <div class="mt-4 flex justify-between items-center">
            <div class="flex gap-x-6">
              <div>
                <div class="w-6 h-6 loader text-red-500 text-center rounded-full">
                </div>
              </div>
              <div>
                <div class="w-6 h-6 loader text-gray-700 text-center rounded-full">
                </div>
              </div>
            </div>
            <div>
              <div class="w-6 h-6 loader text-gray-700 text-center rounded-full">
              </div>
              <span class="text-gray-700 ml-2"></span>
            </div>
          </div>
          <div class="flex gap-x-3 mt-4 items-center">
            <div class="w-12 h-12 loader rounded-full shadow-md"></div>
            <div class="w-full h-8 loader rounded-3xl outline-none"></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PostLoader;
