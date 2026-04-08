<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use App\Models\Collection;
use App\Observers\FilamentFileCleanupObserver as FileCleanupObserver;
use Illuminate\Support\Facades\URL;
class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        if (app()->environment('production')) {
            URL::forceScheme('https');
        }
        Collection::observe(FileCleanupObserver::class);
    }

}
