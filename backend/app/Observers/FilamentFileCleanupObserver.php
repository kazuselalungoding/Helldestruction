<?php

namespace App\Observers;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;

class FilamentFileCleanupObserver
{
    public function updated(Model $model){
        
        if(! method_exists($model, 'FilamentFileCleanupFields')){
            return;
        }

        foreach($model->FilamentFileCleanupFields() as $field){
            if($model->wasChanged($field)){
                Storage::disk($model->FilamentFileCleanupDisk())->delete($model->getOriginal($field));
            }
        }
    }
    public function deleted(Model $model){
        
        if(! method_exists($model, 'FilamentFileCleanupFields')){
            return;
        }

        foreach($model->FilamentFileCleanupFields() as $field){
            Storage::disk($model->FilamentFileCleanupDisk())->delete($model->{$field});
        }
    }
}
