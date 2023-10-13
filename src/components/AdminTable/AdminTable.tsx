import React from 'react';
import { Button } from '@mui/material';
import {
  DataGrid,
  GridActionsCellItem,
  GridColDef,
  GridValidRowModel,
} from '@mui/x-data-grid';
import CustomNoRowsOverlay from 'src/components/AdminTable/CustomNoRowsOverlay';
import classes from './AdminTable.module.scss';
import SvgSelector from 'src/components/SvgSelector/SvgSelector';
import { useScreen } from 'src/hooks';
import WithLoading from 'src/components/WithLoading/WithLoading';

type TAdminTableProps = {
  rows: GridValidRowModel[];
  columns: GridColDef<GridValidRowModel, any, any>[];
  loading?: boolean;
  deleting: number[];
  onAdd: () => void;
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
};

const AdminTable: React.FC<TAdminTableProps> = ({
  rows,
  columns,
  loading,
  deleting,
  onAdd,
  onDelete,
  onEdit,
}) => {
  const { width } = useScreen();
  return (
    <DataGrid
      loading={loading}
      className={'table'}
      rows={rows}
      columns={[
        ...columns,
        {
          field: 'actions',
          type: 'actions',
          headerName: 'Действия',
          cellClassName: 'actions',
          getActions: ({ id, row }) => {
            const isDeleting = deleting.includes(row.id);
            return [
              <GridActionsCellItem
                icon={<SvgSelector id="edit" className={'actionIcon'} />}
                label="Edit"
                className="textPrimary"
                disabled={isDeleting}
                onClick={() => onEdit(id as number)}
                color="inherit"
              />,
              <WithLoading fetching={isDeleting} size={30}>
                <GridActionsCellItem
                  disabled={isDeleting}
                  icon={
                    <SvgSelector
                      id="delete"
                      className={'actionIcon'}
                      style={{ opacity: isDeleting ? '0.5' : '1' }}
                    />
                  }
                  label="Delete"
                  onClick={() => onDelete(id as number)}
                  color="inherit"
                />
              </WithLoading>,
            ];
          },
        },
      ]}
      editMode="row"
      slots={{
        noRowsOverlay: CustomNoRowsOverlay,
        noResultsOverlay: CustomNoRowsOverlay,
        toolbar: () => (
          <div>
            <Button className={classes.addButton} onClick={onAdd}>
              <p>+ Добавить</p>
            </Button>
          </div>
        ),
      }}
      hideFooter
      disableRowSelectionOnClick
      autoHeight
      density={width >= 500 ? 'standard' : 'compact'}
      sx={{ '--DataGrid-overlayHeight': '300px' }}
    />
  );
};

export default AdminTable;
