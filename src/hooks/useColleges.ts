import { useState } from "react";
import type { College } from "../types";

export function useColleges(initialColleges: College[] = []) {
  const [colleges, setColleges] = useState<College[]>(initialColleges);

  return { colleges, setColleges };
}