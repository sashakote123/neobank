import { ITableRow } from "@/src/shared/types/types";

export interface ISortConfig {
  direction: boolean;
  column: keyof ITableRow | null;
}
