import React from 'react'

export default function PostSkeleton() {
    return (
        <div className="my-4 w-3/4 bg-white dark:bg-gray-900 rounded-2xl shadow-sm 
                        border border-gray-100 dark:border-gray-800 overflow-hidden mx-auto animate-pulse">
          <div className="flex flex-col sm:flex-row items-start gap-4 p-4">
            
            {/* Avatar Skeleton */}
            <div className="w-12 h-12 rounded-full bg-gray-300 dark:bg-gray-700"></div>
    
            <div className="flex-1 w-full">
              {/* Header Skeleton */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <div className="w-24 h-4 bg-gray-300 dark:bg-gray-700 rounded mb-2"></div>
                  <div className="w-32 h-3 bg-gray-200 dark:bg-gray-600 rounded"></div>
                </div>
                <div className="w-6 h-6 bg-gray-300 dark:bg-gray-700 rounded-full"></div>
              </div>
    
              {/* Post text skeleton */}
              <div className="mt-3 space-y-2">
                <div className="w-full h-3 bg-gray-300 dark:bg-gray-700 rounded"></div>
                <div className="w-2/3 h-3 bg-gray-300 dark:bg-gray-700 rounded"></div>
              </div>
    
              {/* Post image skeleton */}
              <div className="mt-3 w-full h-48 bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
    
              {/* Actions skeleton */}
              <div className="mt-4 flex gap-3">
                <div className="w-16 h-6 bg-gray-300 dark:bg-gray-700 rounded-full"></div>
                <div className="w-32 h-8 bg-gray-300 dark:bg-gray-700 rounded-full"></div>
              </div>
    
              {/* Comment skeleton */}
              <div className="mt-4 border-t border-gray-200 dark:border-gray-700 pt-3">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-gray-300 dark:bg-gray-700"></div>
                  <div className="flex-1 space-y-2">
                    <div className="w-1/3 h-3 bg-gray-300 dark:bg-gray-700 rounded"></div>
                    <div className="w-2/3 h-3 bg-gray-300 dark:bg-gray-700 rounded"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }