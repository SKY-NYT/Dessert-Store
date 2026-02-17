import { memo } from "react";
import { DessertCard } from "./DessertCard";
import { Text } from "./Text";
import type { DessertListProps } from "../types";

export const DessertList = memo(function DessertList({
  data,
}: DessertListProps) {
  return (
    <div className="w-full lg:w-full">
      <Text variant="p1" className="mb-8">
        Desserts
      </Text>
      <div className="grid grid-cols-1 gap-y-6 md:grid-cols-3 md:gap-y-8 gap-x-6">
        {data.map((item) => (
          <DessertCard key={item.name} product={item} />
        ))}
      </div>
    </div>
  );
});
