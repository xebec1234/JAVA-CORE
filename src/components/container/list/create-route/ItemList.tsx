"use client";

import React from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button"; // Import the Button component

interface Component {
  id: string | number;
  name: string;
}

interface Item {
  id: string | number;
  name: string;
  components?: Component[];
  isEquipmentName?: boolean;
}

interface ItemListProps {
  items: Item[];
  loading: boolean;
  onItemClick: (item: Item) => void;
  selectedItems: (string | number)[];
}

const ItemList: React.FC<ItemListProps> = ({
  items,
  loading,
  onItemClick,
  selectedItems,
}) => {
  return (
    <ul className="w-full">
      {loading ? (
        <div className="w-full h-full overflow-hidden">
          {[...Array(5)].map((_, index) => (
            <Skeleton
              key={index}
              className="w-full h-[53px] border-t animate-pulse"
              style={{ animationDelay: `${index * 0.2}s` }}
            />
          ))}
        </div>
      ) : items.length === 0 ? (
        <div className="flex flex-col items-center my-20">
          <p className="text-gray-300 text-3xl font-bold">
            No items available.
          </p>
        </div>
      ) : (
        items.map((item) => (
          <li
            key={item.id}
            className={`p-2 border-t hover:bg-slate-100 cursor-pointer justify-between flex items-center ${
              selectedItems.includes(item.id) ? "bg-slate-100" : ""
            }`}
            onClick={() => {
              if (!item.isEquipmentName) {
                onItemClick(item);
              }
            }}
          >
            <div className="flex justify-between w-full">
              <div>
                <div className="font-semibold">{item.name}</div>
                {item.components && item.components.length > 0 && (
                  <ul className="ml-4">
                    {item.components.map((comp) => (
                      <li key={comp.id} className="text-gray-600">
                        {comp.name}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
              {item.isEquipmentName && (
                <Button
                  variant="outline"
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                >
                  Add
                </Button>
              )}
            </div>
          </li>
        ))
      )}
    </ul>
  );
};

export default ItemList;
