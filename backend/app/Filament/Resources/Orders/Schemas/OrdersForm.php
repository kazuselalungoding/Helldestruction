<?php

namespace App\Filament\Resources\Orders\Schemas;

use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Select;
use Filament\Schemas\Schema;

class OrdersForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                TextInput::make('user_name')
                    ->label('User Name')
                    ->disabled()
                    ->formatStateUsing(fn($record) => $record?->user?->name),
                TextInput::make('street')
                    ->label('Street')
                    ->disabled()
                    ->formatStateUsing(fn($record) => $record?->address?->street),
                TextInput::make('external_id')
                    ->label('Order ID')
                    ->disabled(),
                Select::make('status')
                    ->label('Status')
                    ->options([
                        'pending' => 'Pending',
                        'processing' => 'Processing',
                        'shipped' => 'Shipped',
                        'delivered' => 'Delivered',
                        'cancelled' => 'Cancelled',
                    ])
                    ->required(),
                TextInput::make('total_price')
                    ->label('Total Price')
                    ->formatStateUsing(fn($state) => number_format($state, 2))
                    ->disabled(),
            ]);
    }
}
