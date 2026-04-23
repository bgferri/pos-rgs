import { Head, useForm } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import SettingsLayout from '@/layouts/settings/layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import InputError from '@/components/input-error';

interface StudioProfile {
    name: string;
    address: string | null;
    phone: string | null;
    instagram: string | null;
    footer_message: string | null;
}

export default function StudioSettings({ profile }: { profile: StudioProfile }) {
    const { data, setData, patch, processing, errors } = useForm({
        name: profile.name || '',
        address: profile.address || '',
        phone: profile.phone || '',
        instagram: profile.instagram || '',
        footer_message: profile.footer_message || '',
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        patch(route('settings.studio.update'), {
            preserveScroll: true,
        });
    };

    return (
        <AppLayout breadcrumbs={[{ title: 'Pengaturan', href: '/settings' }, { title: 'Profil Studio', href: route('settings.studio.edit') }]}>
            <Head title="Profil Studio" />

            <SettingsLayout>
                <div className="space-y-6">
                    <div>
                        <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">Profil Studio</h3>
                        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                            Informasi ini akan ditampilkan pada struk belanja (invoice) pelanggan.
                        </p>
                    </div>

                    <form onSubmit={submit} className="space-y-6">
                        <div className="grid gap-2">
                            <Label htmlFor="name">Nama Studio</Label>
                            <Input
                                id="name"
                                value={data.name}
                                onChange={e => setData('name', e.target.value)}
                                required
                            />
                            <InputError message={errors.name} />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="address">Alamat Lengkap</Label>
                            <textarea
                                id="address"
                                className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                value={data.address}
                                onChange={e => setData('address', e.target.value)}
                                rows={3}
                            />
                            <InputError message={errors.address} />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="phone">Nomor Telepon / WA</Label>
                            <Input
                                id="phone"
                                type="text"
                                value={data.phone}
                                onChange={e => setData('phone', e.target.value)}
                            />
                            <InputError message={errors.phone} />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="instagram">Tautan Instagram</Label>
                            <Input
                                id="instagram"
                                type="url"
                                placeholder="https://www.instagram.com/..."
                                value={data.instagram}
                                onChange={e => setData('instagram', e.target.value)}
                            />
                            <InputError message={errors.instagram} />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="footer_message">Pesan Penutup (Struk)</Label>
                            <Input
                                id="footer_message"
                                type="text"
                                placeholder="Terima kasih telah berkunjung"
                                value={data.footer_message}
                                onChange={e => setData('footer_message', e.target.value)}
                            />
                            <InputError message={errors.footer_message} />
                        </div>

                        <div className="flex items-center gap-4">
                            <Button type="submit" disabled={processing}>Simpan Perubahan</Button>
                        </div>
                    </form>
                </div>
            </SettingsLayout>
        </AppLayout>
    );
}
