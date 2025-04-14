import { ReactNode } from 'react';

export interface ColumnConfig {
  key: string;
  title: string;
  dataIndex: string;
  width?: number;
  fixed?: 'left' | 'right';
  visible?: boolean;
  defaultVisible?: boolean;
  sortable?: boolean;
  searchable?: boolean;
  filters?: Array<{text: string; value: any}>;
  render?: (value: any, record: any) => ReactNode;
  permissions?: string[];
  requiredFeatures?: string[];
  sorter?: (a: any, b: any) => number;
  onFilter?: (value: any, record: any) => boolean;
}

export interface ValidationResult {
  valid: boolean;
  errors?: Array<{
    row: number;
    column: string;
    message: string;
  }>;
}

export interface BatchAction {
  key: string;
  title: string;
  icon?: ReactNode;
  onClick: (selectedRows: any[]) => void;
  confirm?: {
    title: string;
    content: string;
  };
  disabled?: (selectedRows: any[]) => boolean;
}

export interface FilterConfig {
  key: string;
  type: 'select' | 'date' | 'text' | 'custom';
  title: string;
  options?: { label: string; value: any }[];
  component?: React.ComponentType<any>;
}

export interface TableConfig {
  columns: ColumnConfig[];
  columnSettings?: {
    draggable?: boolean;
    resizable?: boolean;
    showSelector?: boolean;
    defaultVisible?: string[];
    storage?: {
      enabled: boolean;
      key: string;
    };
  };
  features?: {
    export?: {
      enabled: boolean;
      formats: ('excel' | 'csv' | 'pdf')[];
    };
    import?: {
      enabled: boolean;
      template?: string;
      validator?: (data: any[]) => Promise<ValidationResult>;
    };
    batchActions?: BatchAction[];
    filters?: FilterConfig[];
    columnCustomization?: boolean;
    rowExpansion?: {
      expandedRowRender: (record: any) => ReactNode;
      rowExpandable?: (record: any) => boolean;
    };
  };
  showAddButton?: boolean;
  showEditButton?: boolean;
  showDeleteButton?: boolean;
  showViewButton?: boolean;
  showActions?: boolean;
  showSelection?: boolean;
  visibleColumns?: string[];
  actionWidth?: number;
  deleteConfirmTitle?: string;
  deleteConfirmDescription?: string;
  addButtonText?: string;
  editButtonText?: string;
  deleteButtonText?: string;
  viewButtonText?: string;
  modalSubmitText?: string;
  modalCancelText?: string;
  modalAddTitle?: string;
  modalEditTitle?: string;
  modalViewTitle?: string;
  customRowClassName?: (record: any) => string;
  modal?: {
    width?: number;
    centered?: boolean;
    form?: {
      type: 'single' | 'steps' | 'tabs';
      forms?: Array<{
        key: string;
        title: string;
        component: string;
        icon?: ReactNode;
        visibleWhen?: (formData: any) => boolean;
        required?: boolean;
      }>;
      validation?: {
        validateOnNext?: boolean;
        validateAll?: boolean;
      };
      actions?: {
        showPrevious?: boolean;
        showNext?: boolean;
        previousText?: string;
        nextText?: string;
        finishText?: string;
        cancelText?: string;
      };
    };
  };
  responsive?: {
    breakpoints: {
      xs: number;
      sm: number;
      md: number;
      lg: number;
      xl: number;
    };
    columnsPerBreakpoint: {
      xs: string[];
      sm: string[];
      md: string[];
      lg: string[];
      xl: string[];
    };
  };
  rowExpansion?: {
    expandedRowRender: (record: any) => ReactNode;
    rowExpandable?: (record: any) => boolean;
    defaultExpanded?: boolean;
    expandIcon?: ReactNode | null;
    expandedRowClassName?: string;
  };
  columnSettings?: {
    draggable?: boolean;
    resizable?: boolean;
    defaultWidth?: number;
    minWidth?: number;
    maxWidth?: number;
    showSelector?: boolean;
    storage?: {
      enabled: boolean;
      key: string;
    };
  };
} 