'use client';

import type React from 'react';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { toast } from 'sonner';

interface FormData {
  name: string;
  email: string;
  role: string;
  department: string;
  status: string;
  notes: string;
  active: boolean;
}

export default function TableEntryForm({
  onSubmit,
  initialData,
}: {
  onSubmit?: (data: FormData) => void;
  initialData?: Partial<FormData>;
}) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    name: initialData?.name || '',
    email: initialData?.email || '',
    role: initialData?.role || '',
    department: initialData?.department || '',
    status: initialData?.status || 'pending',
    notes: initialData?.notes || '',
    active: initialData?.active ?? true,
  });

  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});

  const validateForm = () => {
    const newErrors: Partial<Record<keyof FormData, string>> = {};
    let isValid = true;

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
      isValid = false;
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
      isValid = false;
    }

    if (!formData.role.trim()) {
      newErrors.role = 'Role is required';
      isValid = false;
    }

    if (!formData.department.trim()) {
      newErrors.department = 'Department is required';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleChange = (field: keyof FormData, value: string | boolean) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));

    // Clear error when field is edited
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: undefined,
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      if (onSubmit) {
        onSubmit(formData);
      }

      toast.success('Table entry has been saved successfully.');

      // Reset form if it's a new entry (no initialData)
      if (!initialData) {
        setFormData({
          name: '',
          email: '',
          role: '',
          department: '',
          status: 'pending',
          notes: '',
          active: true,
        });
      }
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (_error) {
      toast.error('Failed to save table entry. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>{initialData ? 'Edit Table Entry' : 'Add New Table Entry'}</CardTitle>
        <CardDescription>
          Fill in the information below to {initialData ? 'update the' : 'create a new'} table
          entry.
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={e => handleChange('name', e.target.value)}
                placeholder="John Doe"
                className={errors.name ? 'border-red-500' : ''}
              />
              {errors.name && <p className="text-sm text-red-500">{errors.name}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={e => handleChange('email', e.target.value)}
                placeholder="john.doe@example.com"
                className={errors.email ? 'border-red-500' : ''}
              />
              {errors.email && <p className="text-sm text-red-500">{errors.email}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="role">Role</Label>
              <Input
                id="role"
                value={formData.role}
                onChange={e => handleChange('role', e.target.value)}
                placeholder="Developer"
                className={errors.role ? 'border-red-500' : ''}
              />
              {errors.role && <p className="text-sm text-red-500">{errors.role}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="department">Department</Label>
              <Input
                id="department"
                value={formData.department}
                onChange={e => handleChange('department', e.target.value)}
                placeholder="Engineering"
                className={errors.department ? 'border-red-500' : ''}
              />
              {errors.department && <p className="text-sm text-red-500">{errors.department}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="status">Status</Label>
              <Select
                value={formData.status}
                onValueChange={value => handleChange('status', value)}
              >
                <SelectTrigger id="status">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="blocked">Blocked</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2 flex items-end">
              <div className="flex items-center space-x-2">
                <Switch
                  id="active"
                  checked={formData.active}
                  onCheckedChange={checked => handleChange('active', checked)}
                />
                <Label htmlFor="active">Active Account</Label>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes">Notes</Label>
            <Textarea
              id="notes"
              value={formData.notes}
              onChange={e => handleChange('notes', e.target.value)}
              placeholder="Additional information..."
              rows={3}
            />
          </div>
        </CardContent>

        <CardFooter className="flex justify-between">
          <Button
            variant="outline"
            type="button"
            onClick={() => {
              // Reset form or handle cancel
              if (!initialData) {
                setFormData({
                  name: '',
                  email: '',
                  role: '',
                  department: '',
                  status: 'pending',
                  notes: '',
                  active: true,
                });
                setErrors({});
              }
            }}
          >
            Cancel
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Saving...' : initialData ? 'Update Entry' : 'Add Entry'}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
