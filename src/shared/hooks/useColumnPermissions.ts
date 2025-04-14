import { useMemo } from 'react';
import type { ColumnConfig } from '../../types/table';

export const useColumnPermissions = (columns: ColumnConfig[], userRole: string) => {
  return useMemo(() => 
    columns.filter(column => {
      if (!column.permissions) return true;
      return column.permissions.includes(userRole);
    }),
    [columns, userRole]
  );
}; 