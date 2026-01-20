<?php

namespace App\Traits;

trait HasFilamentFileCleanup
{
    public function FilamentFileCleanupFields(): array
    {
        return ['image_url'];
    }

    public function FilamentFileCleanupDisk(): string
    {
        return 'public';
    }
}