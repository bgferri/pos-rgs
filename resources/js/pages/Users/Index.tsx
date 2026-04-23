import { Head, useForm, router } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useState } from 'react';
import InputError from '@/components/input-error';

interface User {
    id: number;
    name: string;
    email: string;
    role: string;
    created_at: string;
}

export default function UsersIndex({ users }: { users: User[] }) {
    const [isCreateOpen, setIsCreateOpen] = useState(false);
    const [isEditOpen, setIsEditOpen] = useState(false);
    const [editingUser, setEditingUser] = useState<User | null>(null);

    const { data, setData, post, put, delete: destroy, processing, errors, reset, clearErrors } = useForm({
        name: '',
        email: '',
        password: '',
        role: 'kasir',
    });

    const openCreate = () => {
        reset();
        clearErrors();
        setIsCreateOpen(true);
    };

    const openEdit = (user: User) => {
        reset();
        clearErrors();
        setEditingUser(user);
        setData({
            name: user.name,
            email: user.email,
            password: '',
            role: user.role,
        });
        setIsEditOpen(true);
    };

    const submitCreate = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('users.store'), {
            onSuccess: () => setIsCreateOpen(false),
        });
    };

    const submitEdit = (e: React.FormEvent) => {
        e.preventDefault();
        if (editingUser) {
            put(route('users.update', editingUser.id), {
                onSuccess: () => setIsEditOpen(false),
            });
        }
    };

    const handleDelete = (id: number) => {
        if (confirm('Are you sure you want to delete this user?')) {
            destroy(route('users.destroy', id));
        }
    };

    return (
        <AppLayout breadcrumbs={[{ title: 'Manajemen User', href: route('users.index') }]}>
            <Head title="Manajemen User" />

            <div className="p-4 sm:p-8 space-y-6">
                <div className="flex justify-between items-center">
                    <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                        Manajemen User
                    </h2>
                    
                    <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
                        <DialogTrigger asChild>
                            <Button onClick={openCreate}>Tambah User</Button>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Tambah User Baru</DialogTitle>
                            </DialogHeader>
                            <form onSubmit={submitCreate} className="space-y-4">
                                <div>
                                    <Label htmlFor="name">Nama</Label>
                                    <Input id="name" value={data.name} onChange={e => setData('name', e.target.value)} required />
                                    <InputError message={errors.name} className="mt-2" />
                                </div>
                                <div>
                                    <Label htmlFor="email">Email</Label>
                                    <Input id="email" type="email" value={data.email} onChange={e => setData('email', e.target.value)} required />
                                    <InputError message={errors.email} className="mt-2" />
                                </div>
                                <div>
                                    <Label htmlFor="password">Password</Label>
                                    <Input id="password" type="password" value={data.password} onChange={e => setData('password', e.target.value)} required />
                                    <InputError message={errors.password} className="mt-2" />
                                </div>
                                <div>
                                    <Label htmlFor="role">Role</Label>
                                    <Select value={data.role} onValueChange={value => setData('role', value)}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Pilih role" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="admin">Admin</SelectItem>
                                            <SelectItem value="kasir">Kasir</SelectItem>
                                            <SelectItem value="owner">Owner</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <InputError message={errors.role} className="mt-2" />
                                </div>
                                <div className="flex justify-end gap-2 pt-4">
                                    <Button type="button" variant="outline" onClick={() => setIsCreateOpen(false)}>Batal</Button>
                                    <Button type="submit" disabled={processing}>Simpan</Button>
                                </div>
                            </form>
                        </DialogContent>
                    </Dialog>
                </div>

                <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg border dark:border-gray-700">
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm text-left">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-900 dark:text-gray-300">
                                <tr>
                                    <th className="px-6 py-3 w-16">No.</th>
                                    <th className="px-6 py-3">Nama</th>
                                    <th className="px-6 py-3">Email</th>
                                    <th className="px-6 py-3">Role</th>
                                    <th className="px-6 py-3">Aksi</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.map((user, index) => (
                                    <tr key={user.id} className="border-b dark:border-gray-700 bg-white dark:bg-gray-800">
                                        <td className="px-6 py-4 text-center">
                                            {index + 1}
                                        </td>
                                        <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">
                                            {user.name}
                                        </td>
                                        <td className="px-6 py-4 text-gray-500 dark:text-gray-400">
                                            {user.email}
                                        </td>
                                        <td className="px-6 py-4">
                                            <Badge variant={user.role === 'admin' ? 'destructive' : user.role === 'owner' ? 'default' : 'secondary'}>
                                                {user.role}
                                            </Badge>
                                        </td>
                                        <td className="px-6 py-4 flex gap-2">
                                            <Button variant="outline" size="sm" onClick={() => openEdit(user)}>Edit</Button>
                                            <Button variant="destructive" size="sm" onClick={() => handleDelete(user.id)}>Hapus</Button>
                                        </td>
                                    </tr>
                                ))}
                                {users.length === 0 && (
                                    <tr>
                                        <td colSpan={5} className="px-6 py-4 text-center text-gray-500">
                                            Tidak ada data user.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

                <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Edit User</DialogTitle>
                        </DialogHeader>
                        <form onSubmit={submitEdit} className="space-y-4">
                            <div>
                                <Label htmlFor="edit-name">Nama</Label>
                                <Input id="edit-name" value={data.name} onChange={e => setData('name', e.target.value)} required />
                                <InputError message={errors.name} className="mt-2" />
                            </div>
                            <div>
                                <Label htmlFor="edit-email">Email</Label>
                                <Input id="edit-email" type="email" value={data.email} onChange={e => setData('email', e.target.value)} required />
                                <InputError message={errors.email} className="mt-2" />
                            </div>
                            <div>
                                <Label htmlFor="edit-password">Password (kosongkan jika tidak ingin diubah)</Label>
                                <Input id="edit-password" type="password" value={data.password} onChange={e => setData('password', e.target.value)} />
                                <InputError message={errors.password} className="mt-2" />
                            </div>
                            <div>
                                <Label htmlFor="edit-role">Role</Label>
                                <Select value={data.role} onValueChange={value => setData('role', value)}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Pilih role" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="admin">Admin</SelectItem>
                                        <SelectItem value="kasir">Kasir</SelectItem>
                                        <SelectItem value="owner">Owner</SelectItem>
                                    </SelectContent>
                                </Select>
                                <InputError message={errors.role} className="mt-2" />
                            </div>
                            <div className="flex justify-end gap-2 pt-4">
                                <Button type="button" variant="outline" onClick={() => setIsEditOpen(false)}>Batal</Button>
                                <Button type="submit" disabled={processing}>Simpan Perubahan</Button>
                            </div>
                        </form>
                    </DialogContent>
                </Dialog>

            </div>
        </AppLayout>
    );
}
