<?php

namespace App\Filament\Resources\Collections\Schemas;

use Filament\Forms\Components\TextInput;
use Filament\Schemas\Schema;
use Filament\Forms\Components\FileUpload;
use Filament\Schemas\Components\Section;
use Illuminate\Support\Facades\Storage;
use Livewire\Features\SupportFileUploads\TemporaryUploadedFile;

class CollectionForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                Section::make()
                ->columnSpanFull()
                    ->schema([
                        TextInput::make('name')->label('Collection Name')->required(),
                        FileUpload::make('image_url')->label('Image Collection')
                            ->image()
                            ->disk('public')
                            ->directory('collection')
                            ->required()
                            ->preserveFilenames()
                            ->deleteUploadedFileUsing(function($record, $file){
                                if(!$file instanceof TemporaryUploadedFile){
                                    return;
                                }

                                if($record?->image && basename($record->image_url) !== $file->getClientOriginalName()){
                                    Storage::disk('public')->delete($record->image_url);
                                }
                            })

                    ])
            ]);
    }
}
