import React, { useMemo, useState } from "react";
import {
  Table as MantineTable,
  Button,
  Container,
  Modal,
  TextInput,
  Pagination,
  Select,
} from "@mantine/core";
import {
  ColumnDef,
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  SortingState,
  PaginationState,
} from "@tanstack/react-table";
import { ToDo } from "types";

export interface ToDoItemsProps {
  todos: ToDo[];
  onDelete: (id: string) => void;
  onEdit: (todo: ToDo) => void;
}

const columnHelper = createColumnHelper<ToDo>();

export const ToDoItems: React.FC<ToDoItemsProps> = ({
  todos,
  onDelete,
  onEdit,
}) => {
  const [editingTodo, setEditingTodo] = useState<ToDo | null>(null);
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 5,
  });
  const [sorting, setSorting] = useState<SortingState>([]);

  const columns: ColumnDef<ToDo, any>[] = useMemo(
    () => [
      columnHelper.accessor("id", {
        header: "ID",
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor("name", {
        header: "Name",
        cell: (info) => info.getValue(),
        enableSorting: true,
      }),
      columnHelper.display({
        id: "actions",
        header: "Actions",
        cell: ({ row }) => (
          <div className="flex justify-center space-x-2">
            <Button
              size="xs"
              color="blue"
              onClick={() => setEditingTodo(row.original)}
            >
              Edit
            </Button>
            <Button
              size="xs"
              color="red"
              onClick={() => onDelete(row.original.id)}
            >
              Delete
            </Button>
          </div>
        ),
      }),
    ],
    [onDelete]
  );

  const table = useReactTable({
    data: useMemo(() => {
      const start = pagination.pageIndex * pagination.pageSize;
      const end = start + pagination.pageSize;
      return todos.slice(start, end);
    }, [todos, pagination.pageIndex, pagination.pageSize]),
    columns,
    state: {
      pagination,
      sorting,
    },
    onPaginationChange: setPagination,
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    manualPagination: true,
    pageCount: Math.ceil(todos.length / pagination.pageSize),
  });

  return (
    <Container className="p-4 bg-gray-100 rounded-lg shadow-md max-w-4xl mx-auto">
      <h2 className="text-lg font-semibold text-gray-800 mb-4 text-center">
        To-Do List
      </h2>

      <MantineTable striped highlightOnHover>
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id} className="text-center py-2 px-4">
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
                  {header.column.getCanSort() && (
                    <Button
                      size="xs"
                      variant="subtle"
                      onClick={() =>
                        header.column.toggleSorting(
                          header.column.getIsSorted() === "asc"
                            ? false
                            : header.column.getIsSorted() === "desc"
                            ? undefined
                            : true
                        )
                      }
                    >
                      {header.column.getIsSorted()
                        ? header.column.getIsSorted() === "asc"
                          ? "🔼"
                          : "🔽"
                        : "⇵"}
                    </Button>
                  )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id} className="text-center">
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id} className="text-center py-2 px-4">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </MantineTable>
      <div className="flex items-center justify-between mt-4">
        <Pagination
          total={Math.ceil(todos.length / pagination.pageSize)}
          value={pagination.pageIndex + 1}
          onChange={(page) =>
            setPagination((prev) => ({ ...prev, pageIndex: page - 1 }))
          }
        />
        <Select
          data={[
            { value: "5", label: "5 per page" },
            { value: "10", label: "10 per page" },
            { value: "20", label: "20 per page" },
          ]}
          value={String(pagination.pageSize)}
          onChange={(value) =>
            setPagination((prev) => ({
              ...prev,
              pageSize: Number(value),
              pageIndex: 0,
            }))
          }
        />
      </div>
      <Modal
        opened={!!editingTodo}
        onClose={() => setEditingTodo(null)}
        title="Edit To-Do"
      >
        {editingTodo && (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              const formData = new FormData(e.currentTarget);
              const updatedTodo: ToDo = {
                id: editingTodo.id,
                name: formData.get("name") as string,
              };
              onEdit(updatedTodo);
              setEditingTodo(null);
            }}
          >
            <TextInput
              name="name"
              label="Name"
              defaultValue={editingTodo.name}
              required
            />
            <Button type="submit" className="mt-4">
              Save
            </Button>
          </form>
        )}
      </Modal>
    </Container>
  );
};
