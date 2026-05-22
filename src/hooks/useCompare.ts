import { useState } from "react";

export function useCompare(initialIds: string[] = []) {
  const [selectedIds, setSelectedIds] = useState<string[]>(initialIds);

  return { selectedIds, setSelectedIds };
}