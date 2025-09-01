import React from "react";
import { Dropdown } from "flowbite-react";
import { HiDotsHorizontal } from "react-icons/hi";

export default function PostOptions() {
  return (
    <Dropdown
      dismissOnClick={true}
      renderTrigger={() => (
        <button
          type="button"
          className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 p-1 rounded"
        >
          <HiDotsHorizontal className="w-5 h-5" />
        </button>
      )}
    >
      <Dropdown.Item>Update Post</Dropdown.Item>
      <Dropdown.Item>Delete Post</Dropdown.Item>
    </Dropdown>
  );
}
