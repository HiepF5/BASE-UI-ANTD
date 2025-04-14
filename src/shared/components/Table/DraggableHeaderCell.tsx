import React from 'react';
import { Draggable } from 'react-beautiful-dnd';

export interface DraggableHeaderCellProps {
  index: number;
  columnKey: string;
  children: React.ReactNode;
}

export const DraggableHeaderCell: React.FC<DraggableHeaderCellProps> = ({
  index,
  columnKey,
  children
}) => {
  return (
    <Draggable draggableId={columnKey} index={index}>
      {(provided) => (
        <th
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          {children}
        </th>
      )}
    </Draggable>
  );
}; 