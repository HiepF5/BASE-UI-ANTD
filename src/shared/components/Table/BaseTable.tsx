import React, { useState, useEffect, useMemo } from 'react'
import { Table, Button, Space, Popconfirm, Modal, Form, Card, Steps, Tabs } from 'antd'
import type { StepsProps } from 'antd'
const { Step } = Steps
import {
  PlusOutlined,
  SettingOutlined,
} from '@ant-design/icons'
import BaseButton from '../Button/ButtonBase'
import { Dropdown, Menu, Checkbox } from 'antd'
import { DragDropContext, Droppable, DropResult } from 'react-beautiful-dnd'
import { DraggableHeaderCell, DraggableHeaderCellProps } from './DraggableHeaderCell'
import { useColumnPermissions } from '../../hooks/useColumnPermissions'
import Icon from '@ant-design/icons'
import type { ColumnConfig, ValidationResult, BatchAction, FilterConfig } from '../../../types/table'

// Additional TableConfig interfaces
interface TableConfig {
  columns: ColumnConfig[];
  columnSettings?: {
    draggable?: boolean;  // Cho phép kéo thả để sắp xếp cột
    resizable?: boolean;  // Cho phép resize độ rộng cột
    showSelector?: boolean; // Hiển thị dropdown chọn cột
    defaultVisible?: string[]; // Các cột mặc định hiển thị
    storage?: {
      enabled: boolean; // Lưu cấu hình vào localStorage
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
      expandedRowRender: (record: any) => React.ReactNode;
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
        icon?: React.ReactNode;
        visibleWhen?: (formData: any) => boolean;
      }>;
      validation?: {
        validateOnNext?: boolean;
        validateAll?: boolean;
      };
      actions?: {
        showPrevious?: boolean;
        cancelText?: string;
        previousText?: string;
        nextText?: string;
        finishText?: string;
      };
    };
  };
}

// MultiStepForm with validation and conditional rendering
interface MultiStepFormConfig {
  steps: {
    key: string;
    title: string;
    component: React.ComponentType<{ formData: any; onFormDataChange: (values: any) => void }>;
    dependencies?: string[];
    validation?: (values: any) => Promise<void>;
    visible?: (values: any) => boolean;
  }[];
  onFinish: (values: any) => void;
}

const MultiStepForm: React.FC<MultiStepFormConfig> = ({ steps, onFinish }) => {
  const [current, setCurrent] = useState(0)
  const [formData, setFormData] = useState<Record<string, any>>({})

  const currentStep = steps[current]

  const handleNext = async () => {
    try {
      await currentStep.validation?.(formData)
      setCurrent(current + 1)
    } catch (error) {
      // Optionally display error here
    }
  }

  const handlePrev = () => {
    setCurrent((prev) => Math.max(0, prev - 1))
  }

  const handleSubmit = async () => {
    try {
      await currentStep.validation?.(formData)
      onFinish(formData)
    } catch (error) {
      // Optionally display error here
    }
  }

  return (
    <>
      <Steps current={current}>
        {steps.map((step) => {
          const isVisible = step.visible ? step.visible(formData) : true
          if (!isVisible) return null
          return <Step key={step.key} title={step.title} />
        })}
      </Steps>

      <div style={{ marginTop: 24 }}>
        {currentStep &&
          React.createElement(currentStep.component, {
            formData:{formData},
            onFormDataChange: (values: any) =>
              setFormData((prev) => ({ ...prev, ...values }))
          })}
      </div>

      <Space style={{ marginTop: 24 }}>
        {current > 0 && <Button onClick={handlePrev}>Quay lại</Button>}
        {current < steps.length - 1 ? (
          <Button type='primary' onClick={handleNext}>
            Tiếp theo
          </Button>
        ) : (
          <Button type='primary' onClick={handleSubmit}>
            Hoàn thành
          </Button>
        )}
      </Space>
    </>
  )
}

const ColumnSelector: React.FC<{
  columns: ColumnConfig[];
  visibleColumns: string[];
  onChange: (columns: string[]) => void;
}> = ({ columns, visibleColumns, onChange }) => {
  return (
    <Dropdown
      trigger={['click']}
      overlay={
        <Menu>
          <Menu.ItemGroup title="Hiển thị cột">
            {columns.map(col => (
              <Menu.Item key={col.key}>
                <Checkbox
                  checked={visibleColumns.includes(col.key)}
                  onChange={e => {
                    const newColumns = e.target.checked
                      ? [...visibleColumns, col.key]
                      : visibleColumns.filter(key => key !== col.key);
                    onChange(newColumns);
                  }}
                >
                  {col.title}
                </Checkbox>
              </Menu.Item>
            ))}
          </Menu.ItemGroup>
          <Menu.Divider />
          <Menu.Item onClick={() => onChange(columns.map(col => col.key))}>
            Hiển thị tất cả
          </Menu.Item>
          <Menu.Item onClick={() => onChange([])}>
            Ẩn tất cả
          </Menu.Item>
        </Menu>
      }
    >
      <Button icon={<SettingOutlined />}>Tùy chỉnh cột</Button>
    </Dropdown>
  );
};

interface BaseTableProps {
  data: any[];
  config: TableConfig;
  userRole: string;
  onAdd?: (values: any) => void;
  onEdit?: (values: any) => void;
  onDelete?: (record: any) => void;
  formComponent?: React.ReactElement;
  multiFormComponents?: Record<string, React.ReactElement>;
}

const BaseTable: React.FC<BaseTableProps> = ({
  data,
  config,
  userRole,
  onAdd,
  onEdit,
  onDelete,
  formComponent,
  multiFormComponents = {},
  ...props
}) => {
  const [selectedRows, setSelectedRows] = useState<any[]>([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [editRecord, setEditRecord] = useState<any>(null);
  const [viewMode, setViewMode] = useState(false);
  const [form] = Form.useForm();
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<Record<string, any>>({});

  // State for visible columns
  const [visibleColumnKeys, setVisibleColumnKeys] = useState<string[]>(() => {
    if (config.columnSettings?.storage?.enabled) {
      const stored = localStorage.getItem(config.columnSettings.storage.key);
      if (stored) return JSON.parse(stored);
    }
    return config.columnSettings?.defaultVisible || 
           config.columns.filter(col => col.defaultVisible !== false).map(col => col.key);
  });

  // State for column order
  const [columnOrder, setColumnOrder] = useState<string[]>(() => 
    config.columns.map(col => col.key)
  );

  // Lưu cấu hình columns vào localStorage
  useEffect(() => {
    if (config.columnSettings?.storage?.enabled) {
      localStorage.setItem(
        config.columnSettings.storage.key,
        JSON.stringify(visibleColumnKeys)
      );
    }
  }, [visibleColumnKeys]);

  // Xử lý thay đổi visible columns
  const handleColumnsChange = (newVisibleColumns: string[]) => {
    setVisibleColumnKeys(newVisibleColumns);
  };

  // Xử lý kéo thả columns
  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    const newOrder = Array.from(columnOrder);
    const [removed] = newOrder.splice(result.source.index, 1);
    newOrder.splice(result.destination.index, 0, removed);

    setColumnOrder(newOrder);
  };

  // Render columns theo thứ tự và visibility
  const getVisibleColumns = () => {
    return columnOrder
      .filter(key => visibleColumnKeys.includes(key))
      .map(key => {
        const col = config.columns.find(c => c.key === key)!;
        return {
          ...col,
          onHeaderCell: config.columnSettings?.resizable ? 
            (column: any) => ({
              style: { width: column.width },
            }) : undefined
        };
      });
  };

  // Lấy cấu hình từ config
  const {
    showAddButton = true,
    showEditButton = true,
    showDeleteButton = true,
    showViewButton = true,
    showActions = true,
    showSelection = false,
    columns = [],
    visibleColumns = columns.map((col) => col.dataIndex || col.key),
    actionWidth = 150,
    deleteConfirmTitle = 'Xác nhận xóa',
    deleteConfirmDescription = 'Bạn có chắc chắn muốn xóa mục này?',
    addButtonText = 'Thêm mới',
    editButtonText = 'Sửa',
    deleteButtonText = 'Xóa',
    viewButtonText = 'Xem',
    modalSubmitText = 'Lưu',
    modalCancelText = 'Hủy',
    modalAddTitle = 'Thêm mới',
    modalEditTitle = 'Chỉnh sửa',
    modalViewTitle = 'Xem chi tiết',
    customRowClassName
  } = config
  const formConfig = config.modal?.form || { type: 'single' }
  const forms = formConfig.forms || []

  const allowedColumns = useColumnPermissions(columns, userRole);

  // Xử lý sự kiện cho các action
  const handleAdd = () => {
    setEditRecord(null)
    setViewMode(false)
    setModalTitle(modalAddTitle)
    form.resetFields()
    setModalVisible(true)
  }

  const handleEdit = (record: any) => {
    setEditRecord(record)
    setViewMode(false)
    setModalTitle(modalEditTitle)
    form.setFieldsValue(record)
    setModalVisible(true)
  }

  const handleView = (record: any) => {
    setEditRecord(record)
    setViewMode(true)
    setModalTitle(modalViewTitle)
    form.setFieldsValue(record)
    setModalVisible(true)
  }

  const handleDelete = (record: any) => {
    if (onDelete) {
      onDelete(record)
    }
  }

  const handleOk = async () => {
    if (viewMode) {
      setModalVisible(false)
      return
    }

    try {
      const values = await form.validateFields()

      if (editRecord) {
        if (onEdit) {
          onEdit({ ...editRecord, ...values })
        }
      } else {
        if (onAdd) {
          onAdd(values)
        }
      }

      setModalVisible(false)
      form.resetFields()
    } catch (error) {
      console.error('Form validation failed:', error)
    }
  }

  const handleCancel = () => {
    setModalVisible(false)
    form.resetFields()
  }

  // Xử lý row selection
  const rowSelection = config.showSelection
    ? {
        selectedRowKeys,
        onChange: (keys: React.Key[], rows: any[]) => {
          setSelectedRowKeys(keys)
          setSelectedRows(rows)
        }
      }
    : undefined

  const handlePrevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };
  
  const handleNextStep = async () => {
    try {
      if (formConfig.validation?.validateOnNext) {
        // Validate form hiện tại
        const currentFormValues = await form.validateFields();
        
        // Cập nhật formData
        setFormData({
          ...formData,
          [forms[currentStep].key]: currentFormValues
        });
      }
      
      // Chuyển đến form tiếp theo
      if (currentStep < forms.length - 1) {
        setCurrentStep(currentStep + 1);
      }
    } catch (error) {
      console.error('Form validation failed:', error);
    }
  };
  
  const handleFinish = async () => {
    try {
      if (formConfig.validation?.validateAll) {
        // Validate form hiện tại
        const currentFormValues = await form.validateFields();
        
        // Cập nhật formData và gộp tất cả dữ liệu
        const finalFormData = {
          ...formData,
          [forms[currentStep].key]: currentFormValues
        };
        
        // Gọi callback để xử lý dữ liệu
        if (editRecord) {
          if (onEdit) {
            onEdit({ ...editRecord, ...finalFormData });
          }
        } else {
          if (onAdd) {
            onAdd(finalFormData);
          }
        }
        
        setModalVisible(false);
        form.resetFields();
      }
    } catch (error) {
      console.error('Form validation failed:', error);
    }
  };
  
  // Render form dựa trên loại
  const renderForms = () => {
    if (formConfig.type === 'single') {
      return formComponent && React.cloneElement(formComponent, {
        form,
        initialValues: editRecord,
        disabled: viewMode,
      });
    } else if (formConfig.type === 'steps') {
      return (
        <>
          <Steps current={currentStep}>
            {forms.map((formItem) => {
              const isVisible = formItem.visibleWhen ? 
                formItem.visibleWhen(formData) : true;
              
              if (!isVisible) return null;
              
              return (
                <Steps.Step 
                  key={formItem.key} 
                  title={formItem.title}
                  icon={formItem.icon} 
                />
              );
            })}
          </Steps>
          
          <div style={{ marginTop: 24 }}>
            {forms[currentStep] && multiFormComponents[forms[currentStep].component] && 
              React.cloneElement(multiFormComponents[forms[currentStep].component], {
                form,
                initialValues: editRecord,
                disabled: viewMode,
                formData,
              })
            }
          </div>
        </>
      );
    } else if (formConfig.type === 'tabs') {
      // Render form dạng tabs
      return (
        <Tabs activeKey={forms[currentStep].key} onChange={(key) => {
          const newIndex = forms.findIndex(form => form.key === key);
          if (newIndex !== -1) {
            setCurrentStep(newIndex);
          }
        }}>
          {forms.map((formItem) => {
            const isVisible = formItem.visibleWhen ? 
              formItem.visibleWhen(formData) : true;
            
            if (!isVisible) return null;
            
            return (
              <Tabs.TabPane 
                key={formItem.key} 
                tab={
                  <>
                    {React.isValidElement(formItem.icon) && React.cloneElement(formItem.icon)}
                    <span>{formItem.title}</span>
                  </>
                }
              >
                {multiFormComponents[formItem.component] && 
                  React.cloneElement(multiFormComponents[formItem.component], {
                    form: form,
                    initialValues: editRecord,
                    disabled: viewMode,
                    formData: formData,
                  })
                }
              </Tabs.TabPane>
            );
          })}
        </Tabs>
      );
    }
    return null;
  };
  
  // Render buttons theo loại form
  const renderFormActions = () => {
    if (viewMode) {
      return [
        <Button key="cancel" onClick={handleCancel}>
          {formConfig.actions?.cancelText || 'Đóng'}
        </Button>
      ];
    }
    
    if (formConfig.type === 'single') {
      return [
        <Button key="cancel" onClick={handleCancel}>
          {formConfig.actions?.cancelText || 'Hủy'}
        </Button>,
        <Button key="submit" type="primary" onClick={handleOk}>
          {formConfig.actions?.finishText || 'Lưu'}
        </Button>
      ];
    } else {
      return [
        <Button key="cancel" onClick={handleCancel}>
          {formConfig.actions?.cancelText || 'Hủy'}
        </Button>,
        currentStep > 0 && formConfig.actions?.showPrevious !== false && (
          <Button key="prev" onClick={handlePrevStep}>
            {formConfig.actions?.previousText || 'Quay lại'}
          </Button>
        ),
        currentStep < forms.length - 1 ? (
          <Button key="next" type="primary" onClick={handleNextStep}>
            {formConfig.actions?.nextText || 'Tiếp theo'}
          </Button>
        ) : (
          <Button key="finish" type="primary" onClick={handleFinish}>
            {formConfig.actions?.finishText || 'Hoàn thành'}
          </Button>
        )
      ];
    }
  }

  const handleResize = (columnKey: string) => (e: React.SyntheticEvent, { size }: { size: { width: number } }) => {
    const newColumns = config.columns.map(col => {
      if (col.key === columnKey) {
        return { ...col, width: size.width };
      }
      return col;
    });
    // You might want to add logic here to save the new column widths
  };

  return (
    <Card>
      <div
        style={{
          marginBottom: 16,
          display: 'flex',
          justifyContent: 'space-between'
        }}
      >
        <Space>
          {showAddButton && (
            <BaseButton
              type='primary'
              icon={<PlusOutlined />}
              onClick={handleAdd}
            >
              {addButtonText}
            </BaseButton>
          )}
        </Space>
      </div>

      <div style={{ marginBottom: 16 }}>
        <Space>
          {config.columnSettings?.showSelector && (
            <ColumnSelector
              columns={config.columns}
              visibleColumns={visibleColumnKeys}
              onChange={handleColumnsChange}
            />
          )}
        </Space>
      </div>

      {config.columnSettings?.draggable ? (
        <DragDropContext onDragEnd={handleDragEnd}>
          <Droppable droppableId="columns" direction="horizontal">
            {(provided) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                >
                <Table
                  columns={getVisibleColumns()}
                  dataSource={data}
                  components={{
                  header: {
                    cell: (props: DraggableHeaderCellProps) => (
                    <DraggableHeaderCell {...props} />
                    ),
                  },
                  }}
                  {...props}
                />
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      ) : (
        <Table
          columns={getVisibleColumns()}
          dataSource={data}
          {...props}
        />
      )}

      <Modal
        title={modalTitle}
        open={modalVisible}
        width={config.modal?.width || 800}
        centered={config.modal?.centered}
        onCancel={handleCancel}
        footer={renderFormActions()}
      >
        {renderForms()}
      </Modal>
    </Card>
  )
}

export default BaseTable
