<?php

namespace App\Filament\Widgets;

use Filament\Widgets\StatsOverviewWidget;
use Filament\Widgets\StatsOverviewWidget\Stat;
use App\Models\User;
use App\Models\Orders;

class StatOverview extends StatsOverviewWidget
{
    protected function getStats(): array
    {
        return [
            Stat::make('Total Pengguna', User::count())
                ->description('User terdaftar')
                ->descriptionIcon('heroicon-m-user-group')
                ->color('success'),

            Stat::make('Total Pesanan', Orders::where('status', 'processing')->count())
                ->description('Pesanan dibuat')
                ->descriptionIcon('heroicon-m-shopping-cart')
                ->color('primary'),

            Stat::make('Total Pendapatan (Proses)', Orders::where('status', 'processing')->sum('total_price'))
                ->description('Pendapatan dari pesanan yang sedang diproses')
                ->descriptionIcon('heroicon-m-banknotes')
                ->chart([7, 3, 4, 5, 6, 3, 5, 8])
                ->color('success')
                ->formatStateUsing(fn($state) => 'Rp ' . number_format($state, 0, ',', '.')),
        ];
    }
}
