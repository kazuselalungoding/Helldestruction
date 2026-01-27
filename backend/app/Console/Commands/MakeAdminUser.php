<?php

namespace App\Console\Commands;

use App\Models\User;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Hash;

class MakeAdminUser extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'make:admin-user';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Create Filament admin user';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $name = $this->ask('Name');
        $email = $this->ask('Email');
        $password = $this->secret('Password');
        
        User::create([
            'name' => $name,
            'email' => $email,
            'password' => Hash::make($password),
            'role' => 'admin',
        ]);

        $this->info('Admin user created successfully.');
    }
}
