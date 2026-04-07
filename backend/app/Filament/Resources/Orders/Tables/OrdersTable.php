<?php

namespace App\Filament\Resources\Orders\Tables;

use Filament\Actions\BulkActionGroup;
use Filament\Actions\DeleteBulkAction;
use Filament\Actions\ViewAction;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Table;

class OrdersTable
{
    public static function configure(Table $table): Table
    {
        return $table
            ->columns([
                TextColumn::make('external_id')->label('Order ID'),
                TextColumn::make('user.name')->label('User'),
                TextColumn::make('status')->label('Status'),
                TextColumn::make('total_price')->label('Total Price'),
                TextColumn::make('address.street')->label('Address'),
            ]) 
            ->filters([
                //
            ])
            ->recordActions([
            ViewAction::make(),
            ])
            ->toolbarActions([
                BulkActionGroup::make([
                    DeleteBulkAction::make(),
                ]),
            ]);
    }
}
