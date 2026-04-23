import { Head, useForm } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useState } from 'react';
import InputError from '@/components/input-error';

interface Category {
    id: number;
    name: string;
    description: string | null;
    created_at: string;
}

export default function CategoriesIndex({ categories }: { categories: Category[] }) {
    const [isCreateOpen, setIsCreateOpen] = useState(false);
    const [isEditOpen, setIsEditOpen] = useState(false);
    const [editingCategory, setEditingCategory] = useState<Category | null>(null);

    const { data, setData, post, put, delete: destroy, processing, errors, reset, clearErrors } = useForm({
        name: '',
        description: '',
    });

    const openCreate = () => {
        reset();
        clearErrors();
        setIsCreateOpen(true);
    };

    const openEdit = (category: Category) => {
        reset();
        clearErrors();
        setEditingCategory(category);
        setData({
            name: category.name,
            description: category.description || '',
        });
        setIsEditOpen(true);
    };

    const submitCreate = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('categories.store'), {
            onSuccess: () => setIsCreateOpen(false),
        });
    };

    const submitEdit = (e: React.FormEvent) => {
        e.preventDefault();
        if (editingCategory) {
            put(route('categories.update', editingCategory.id), {
                onSuccess: () => setIsEditOpen(false),
            });
        }
    };

    const handleDelete = (id: number) => {
        if (confirm('Apakah Anda yakin ingin menghapus kategori ini? Semua jasa yang terkait tidak boleh ada sebelum dihapus.')) {
            destroy(route('categories.destroy', id));
        }
    };

    return (
        <AppLayout breadcrumbs={[{ title: 'Kategori Layanan', href: route('categories.index') }]}>
            <Head title="Kategori Layanan" />

            <div className="p-4 sm:p-8 space-y-6">
                <div className="flex justify-between items-center">
                    <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                        Kategori Layanan
                    </h2>
                    
                    <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
                        <DialogTrigger asChild>
                            <Button onClick={openCreate}>Tambah Kategori</Button>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Tambah Kategori Baru</DialogTitle>
                            </DialogHeader>
                            <form onSubmit={submitCreate} className="space-y-4">
                                <div>
                                    <Label htmlFor="name">Nama Kategori</Label>
                                    <Input id="name" value={data.name} onChange={e => setData('name', e.target.value)} required />
                                    <InputError message={errors.name} className="mt-2" />
                                </div>
                                <div>
                                    <Label htmlFor="description">Deskripsi (Opsional)</Label>
                                    <Input id="description" value={data.description} onChange={e => setData('description', e.target.value)} />
                                    <InputError message={errors.description} className="mt-2" />
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
                                    <th className="px-6 py-3">Nama Kategori</th>
                                    <th className="px-6 py-3">Deskripsi</th>
                                    <th className="px-6 py-3 text-right">Aksi</th>
                                </tr>
                            </thead>
                            <tbody>
                                {categories.map((category, index) => (
                                    <tr key={category.id} className="border-b dark:border-gray-700 bg-white dark:bg-gray-800">
                                        <td className="px-6 py-4 text-center">
                                            {index + 1}
                                        </td>
                                        <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">
                                            {category.name}
                                        </td>
                                        <td className="px-6 py-4 text-gray-500 dark:text-gray-400">
                                            {category.description || '-'}
                                        </td>
                                        <td className="px-6 py-4 flex gap-2 justify-end">
                                            <Button variant="outline" size="sm" onClick={() => openEdit(category)}>Edit</Button>
                                            <Button variant="destructive" size="sm" onClick={() => handleDelete(category.id)}>Hapus</Button>
                                        </td>
                                    </tr>
                                ))}
                                {categories.length === 0 && (
                                    <tr>
                                        <td colSpan={4} className="px-6 py-4 text-center text-gray-500">
                                            Belum ada data kategori.
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
                            <DialogTitle>Edit Kategori</DialogTitle>
                        </DialogHeader>
                        <form onSubmit={submitEdit} className="space-y-4">
                            <div>
                                <Label htmlFor="edit-name">Nama Kategori</Label>
                                <Input id="edit-name" value={data.name} onChange={e => setData('name', e.target.value)} required />
                                <InputError message={errors.name} className="mt-2" />
                            </div>
                            <div>
                                <Label htmlFor="edit-description">Deskripsi (Opsional)</Label>
                                <Input id="edit-description" value={data.description} onChange={e => setData('description', e.target.value)} />
                                <InputError message={errors.description} className="mt-2" />
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
