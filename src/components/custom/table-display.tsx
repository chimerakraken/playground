'use client';

import { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Edit, Trash2, Plus } from 'lucide-react';
import TableEntryForm from './table-form';

interface TableEntry {
  id: string;
  name: string;
  email: string;
  role: string;
  department: string;
  status: string;
  notes: string;
  active: boolean;
}

export default function TableDisplay() {
  const [showForm, setShowForm] = useState(false);
  const [editingEntry, setEditingEntry] = useState<TableEntry | null>(null);
  const [tableData, setTableData] = useState<TableEntry[]>([
    {
      id: '1',
      name: 'John Doe',
      email: 'john.doe@example.com',
      role: 'Developer',
      department: 'Engineering',
      status: 'active',
      notes: 'Senior developer with 5 years experience',
      active: true,
    },
    {
      id: '2',
      name: 'Jane Smith',
      email: 'jane.smith@example.com',
      role: 'Designer',
      department: 'Product',
      status: 'active',
      notes: 'UI/UX specialist',
      active: true,
    },
    {
      id: '3',
      name: 'Mike Johnson',
      email: 'mike.j@example.com',
      role: 'Manager',
      department: 'Operations',
      status: 'pending',
      notes: 'Recently promoted',
      active: false,
    },
  ]);

  const handleAddEntry = (data: any) => {
    const newEntry = {
      id: Date.now().toString(),
      ...data,
    };
    setTableData([...tableData, newEntry]);
    setShowForm(false);
  };

  const handleUpdateEntry = (data: any) => {
    if (!editingEntry) return;

    setTableData(
      tableData.map(entry => (entry.id === editingEntry.id ? { ...entry, ...data } : entry))
    );
    setEditingEntry(null);
  };

  const handleDeleteEntry = (id: string) => {
    setTableData(tableData.filter(entry => entry.id !== id));
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge className="bg-green-500">Active</Badge>;
      case 'pending':
        return <Badge className="bg-yellow-500">Pending</Badge>;
      case 'blocked':
        return <Badge className="bg-red-500">Blocked</Badge>;
      case 'inactive':
        return <Badge className="bg-gray-500">Inactive</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Team Members</h2>
        <Button
          onClick={() => {
            setEditingEntry(null);
            setShowForm(!showForm);
          }}
        >
          <Plus className="mr-2 h-4 w-4" />
          Add New Entry
        </Button>
      </div>

      {(showForm || editingEntry) && (
        <div className="mb-6">
          <TableEntryForm
            onSubmit={editingEntry ? handleUpdateEntry : handleAddEntry}
            initialData={editingEntry || undefined}
          />
        </div>
      )}

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Department</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Active</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {tableData.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-6 text-muted-foreground">
                  No entries found. Add a new entry to get started.
                </TableCell>
              </TableRow>
            ) : (
              tableData.map(entry => (
                <TableRow key={entry.id}>
                  <TableCell className="font-medium">{entry.name}</TableCell>
                  <TableCell>{entry.email}</TableCell>
                  <TableCell>{entry.role}</TableCell>
                  <TableCell>{entry.department}</TableCell>
                  <TableCell>{getStatusBadge(entry.status)}</TableCell>
                  <TableCell>{entry.active ? 'Yes' : 'No'}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => {
                          setShowForm(true);
                          setEditingEntry(entry);
                        }}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="icon"
                        className="text-red-500"
                        onClick={() => handleDeleteEntry(entry.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
