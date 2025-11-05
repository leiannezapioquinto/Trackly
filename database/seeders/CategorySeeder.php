<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Category;

class CategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $categories = [
            ['name' => 'Food & Drinks', 'color' => '#FF6B6B'],
            ['name' => 'Transportation', 'color' => '#4ECDC4'],
            ['name' => 'Shopping', 'color' => '#FFD93D'],
            ['name' => 'Bills & Utilities', 'color' => '#1A535C'],
            ['name' => 'Entertainment', 'color' => '#FF9F1C'],
        ];

        foreach ($categories as $cat) {
            Category::create($cat);
        }
    }
}
