<?php

namespace App\Filament\Resources\Products\Schemas;

use Filament\Schemas\Schema;
use Filament\Forms\Components\Select;
use Illuminate\Support\Facades\Storage;
use Filament\Forms\Components\TextInput;
use Filament\Schemas\Components\Section;
use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\Repeater;
use Filament\Forms\Components\Textarea;
use Livewire\Features\SupportFileUploads\TemporaryUploadedFile;


class ProductsForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                Section::make()
                ->columnSpanFull()
                ->schema([
                    TextInput::make('name')->required(),
                    Select::make('collection_id')
                        ->label('Collection Of Product')
                        ->relationship('collection', 'name')
                        ->required(),
                    Select::make('category_id')
                        ->label('Category Of Product')
                        ->relationship('Categories','name')
                        ->required(),

                    Repeater::make('ProductVariants')
                    ->label('Sizes & Stock')
                    ->relationship()
                    ->schema([
                            Select::make('size')
                            ->options([
                                'XS' => 'XS',
                                'S' => 'S',
                                'M' => 'M',
                                'L' => 'L',
                                'XL' => 'XL',
                                'XXL' => 'XXL',
                            ])
                            ->required(),
                            TextInput::make('quantity')
                            ->numeric()
                            ->minValue(0)
                            ->default(0)
                            ->required(),
                        ])
                        ->defaultItems(3)
                        ->collapsed(),
                    FileUpload::make('image_url')
                        ->label('Product Image')
                        ->image()
                        ->imageEditor()
                        ->imageEditorAspectRatioOptions([
                            '1:1' => '1:1',
                            '4:3' => '4:3',
                            '16:9' => '16:9',
                        ])
                        ->disk('public')
                        ->directory('Products')
                        ->required()
                        ->preserveFilenames()
                        ->deleteUploadedFileUsing(function($record, $file) {
                            if(!$file instanceof TemporaryUploadedFile){
                                return;
                            }

                            if($record?->image && basename($record->image_url) !== $file->getClientOriginalName()){
                                Storage::disk('public')->delete($record->image_url);
                            }
                        }),
                    Textarea::make('description')->required(),
                    TextInput::make('price')
                        ->numeric()
                        ->minValue(0)
                        ->required(),
                ])
            ]);
    }
}
