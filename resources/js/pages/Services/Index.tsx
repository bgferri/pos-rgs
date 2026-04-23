import { Head, useForm } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useState } from 'react';
import InputError from '@/components/input-error';

interface Category {
    id: number;
    name: string;
}

interface Service {
    id: number;
    category_id: number;
    name: string;
    price: number;
    description: string | null;
    category: Category;
    created_at: string;
}

export default function ServicesIndex({ services, categories }: { services: Service[], categories: Category[] }) {
    const [isCreateOpen, setIsCreateOpen] = useState(false);
    const [isEditOpen, setIsEditOpen] = useState(false);
    const [editingService, setEditingService] = useState<Service | null>(null);

    const { data, setData, post, put, delete: destroy, processing, errors, reset, clearErrors } = useForm({
        category_id: '',
        name: '',
        price: '',
        description: '',
    });

    const openCreate = () => {
        reset();
        clearErrors();
        setIsCreateOpen(true);
    };

    const openEdit = (service: Service) => {
        reset();
        clearErrors();
        setEditingService(service);
        setData({
            category_id: service.category_id.toString(),
            name: service.name,
            price: service.price.toString(),
            description: service.description || '',
        });
        setIsEditOpen(true);
    };

    const submitCreate = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('services.store'), {
            onSuccess: () => setIsCreateOpen(false),
        });
    };

    const submitEdit = (e: React.FormEvent) => {
        e.preventDefault();
        if (editingService) {
            put(route('services.update', editingService.id), {
                onSuccess: () => setIsEditOpen(false),
            });
        }
    };

    const handleDelete = (id: number) => {
        if (confirm('Apakah Anda yakin ingin menghapus jasa/layanan ini?')) {
            destroy(route('services.destroy', id));
        }
    };

    return (
        <AppLayout breadcrumbs={[{ title: 'Daftar Jasa & Layanan', href: route('services.index') }]}>
            <Head title="Daftar Jasa" />

            <div className="p-4 sm:p-8 space-y-6">
                <div className="flex justify-between items-center">
                    <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                        Daftar Jasa & Layanan
                    </h2>
                    
                    <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
                        <DialogTrigger asChild>
                            <Button onClick={openCreate}>Tambah Jasa</Button>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Tambah Jasa Baru</DialogTitle>
                            </DialogHeader>
                            <form onSubmit={submitCreate} className="space-y-4">
                                <div>
                                    <Label htmlFor="category_id">Kategori</Label>
                                    <Select value={data.category_id} onValueChange={value => setData('category_id', value)}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Pilih Kategori" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {categories.map(category => (
                                                <SelectItem key={category.id} value={category.id.toString()}>
                                                    {category.name}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    <InputError message={errors.category_id} className="mt-2" />
                                </div>
                                <div>
                                    <Label htmlFor="name">Nama Jasa</Label>
                                    <Input id="name" value={data.name} onChange={e => setData('name', e.target.value)} required />
                                    <InputError message={errors.name} className="mt-2" />
                                </div>
                                <div>
                                    <Label htmlFor="price">Harga (Rp)</Label>
                                    <Input id="price" type="number" min="0" value={data.price} onChange={e => setData('price', e.target.value)} required />
                                    <InputError message={errors.price} className="mt-2" />
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
                                    <th className="px-6 py-3">Nama Jasa</th>
                                    <th className="px-6 py-3">Kategori</th>
                                    <th className="px-6 py-3">Harga</th>
                                    <th className="px-6 py-3 text-right">Aksi</th>
                                </tr>
                            </thead>
                            <tbody>
                                {services.map((service, index) => (
                                    <tr key={service.id} className="border-b dark:border-gray-700 bg-white dark:bg-gray-800">
                                        <td className="px-6 py-4 text-center">
                                            {index + 1}
                                        </td>
                                        <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">
                                            {service.name}
                                            {service.description && (
                                                <div className="text-xs text-gray-500 mt-1">{service.description}</div>
                                            )}
                                        </td>
                                        <td className="px-6 py-4 text-gray-500 dark:text-gray-400">
                                            {service.category?.name}
                                        </td>
                                        <td className="px-6 py-4 font-semibold">
                                            Rp {new Intl.NumberFormat('id-ID').format(service.price)}
                                        </td>
                                        <td className="px-6 py-4 flex gap-2 justify-end">
                                            <Button variant="outline" size="sm" onClick={() => openEdit(service)}>Edit</Button>
                                            <Button variant="destructive" size="sm" onClick={() => handleDelete(service.id)}>Hapus</Button>
                                        </td>
                                    </tr>
                                ))}
                                {services.length === 0 && (
                                    <tr>
                                        <td colSpan={5} className="px-6 py-4 text-center text-gray-500">
                                            Belum ada data jasa/layanan.
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
                            <DialogTitle>Edit Jasa</DialogTitle>
                        </DialogHeader>
                        <form onSubmit={submitEdit} className="space-y-4">
                            <div>
                                <Label htmlFor="edit-category_id">Kategori</Label>
                                <Select value={data.category_id} onValueChange={value => setData('category_id', value)}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Pilih Kategori" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {categories.map(category => (
                                            <SelectItem key={category.id} value={category.id.toString()}>
                                                {category.name}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                <InputError message={errors.category_id} className="mt-2" />
                            </div>
                            <div>
                                <Label htmlFor="edit-name">Nama Jasa</Label>
                                <Input id="edit-name" value={data.name} onChange={e => setData('name', e.target.value)} required />
                                <InputError message={errors.name} className="mt-2" />
                            </div>
                            <div>
                                <Label htmlFor="edit-price">Harga (Rp)</Label>
                                <Input id="edit-price" type="number" min="0" value={data.price} onChange={e => setData('price', e.target.value)} required />
                                <InputError message={errors.price} className="mt-2" />
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
