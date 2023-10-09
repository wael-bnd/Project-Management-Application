import React from "react";
import Image from "next/dist/client/image";
import { ClockIcon } from "@heroicons/react/outline";
import { Draggable } from "react-beautiful-dnd";

function CardItem({ data, index, ...props }) {
  return (
    <Draggable index={index} draggableId={data.id.toString()}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className="bg-white rounded-md p-3 m-3 mt-0 last:mb-0"
        >
          <label
            className={`bg-gradient-to-r
              px-2 py-1 rounded text-white text-sm
              ${
                data.priority === 0
                  ? "from-blue-600 to-blue-400"
                  : data.priority === 1
                  ? "from-green-600 to-green-400"
                  : "from-red-600 to-red-400"
              }
              `}
          >
            {data.priority === 0
              ? "Test"
              : data.priority === 1
              ? "Story"
              : "Bug"}
          </label>
          <h5 className="text-md my-3 text-lg leading-6">{data.title}</h5>
          <div className="flex justify-between">
            <div className="flex space-x-2 items-center">
              <span className="flex space-x-1 items-center">
                <ClockIcon className="w-4 h-4 text-gray-500" />
                <span>{data.attachment}</span>
              </span>
            </div>

            <ul className="flex space-x-3">
              {data.assignees.map((i, index) => {
                return (
                  <li key={index}>
                    <Image
                      src={i.avt}
                      width="36"
                      height="36"
                      style={{ objectFit: "cover" }}
                      className=" rounded-full "
                      alt={""}
                    />
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      )}
    </Draggable>
  );
}

export default CardItem;
